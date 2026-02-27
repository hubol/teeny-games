import { DisplayObject, Graphics, Rectangle, Resource, Sprite, Texture } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";

function prepareCombineResultForPublic(result: Item.Protected.CombineResult): Item.CombineResult {
    if (!result) {
        return { kind: "impossible" };
    }
    if (typeof result === "string") {
        return { kind: "failed", reason: result };
    }
    return { kind: "combined", ...result };
}

export abstract class Item {
    abstract readonly name: string;
    abstract readonly view: Texture | (() => DisplayObject);

    /** Should be implemented to NOT mutate state */
    protected combine(item1: Item): Item.Protected.CombineResult {
    }

    static combine(item0: Item, item1: Item): Item.CombineResult {
        const result0 = prepareCombineResultForPublic(item0.combine(item1));
        if (result0.kind === "combined") {
            return result0;
        }
        const result1 = prepareCombineResultForPublic(item1.combine(item0));
        if (result1.kind === "combined") {
            return { kind: "combined", description: result1.description, item0: result1.item1, item1: result1.item0 };
        }
        if (result1.kind === "failed") {
            return result1;
        }
        return result0;
    }
}

namespace Item {
    export namespace Protected {
        export type CombineResult =
            | { description: string; item0: Item | null; item1: Item | null }
            | string
            | void;
    }

    export type CombineResult =
        | { kind: "impossible" }
        | { kind: "failed"; reason: string }
        | { kind: "combined"; description: string; item0: Item | null; item1: Item | null };
}

function objDummy(name: string) {
    return () =>
        container(
            new Graphics().beginFill(0x000000).drawCircle(15, 15, 30),
            objText.Medium(name)
                .at(15, 15)
                .anchored(0.5, 0.5),
        );
}

class Potato extends Item {
    private static readonly txs = Tx.Item.Potato.split({ count: 3 });

    constructor(readonly state = { peeled: false, grated: false }) {
        super();
    }

    get name() {
        if (this.state.grated) {
            return "Grated Potato";
        }
        if (this.state.peeled) {
            return "Peeled Potato";
        }
        return "Potato";
    }

    protected combine(item1: Item) {
        if (item1 instanceof Peeler) {
            if (!this.state.peeled) {
                return {
                    description: "Peel potato",
                    item0: new Potato({ ...this.state, peeled: true }),
                    item1,
                };
            }
            return "Already peeled.";
        }
        if (item1 instanceof Grater) {
            if (!this.state.peeled) {
                return "Grate first.";
            }
            if (!this.state.grated) {
                return {
                    description: "Grate potato",
                    item0: new Potato({ ...this.state, grated: true }),
                    item1,
                };
            }
            return "Already grated.";
        }
    }

    get view() {
        if (this.state.grated) {
            return Potato.txs[2];
        }
        if (this.state.peeled) {
            return Potato.txs[1];
        }
        return Potato.txs[0];
    }
}

class Garlic extends Item {
    constructor(readonly state = { smashed: false, grated: false }) {
        super();
    }

    get name() {
        if (this.state.grated) {
            return "Grated Garlic";
        }
        if (this.state.smashed) {
            return "Smashed Garlic";
        }
        return "Garlic";
    }

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Hammer) {
            if (this.state.smashed) {
                return "Already smashed.";
            }
            return {
                description: "Smash garlic",
                item0: new Garlic({ ...this.state, smashed: true }),
                item1,
            };
        }
        if (item1 instanceof Grater) {
            if (!this.state.smashed) {
                return "Smash first.";
            }
            if (this.state.grated) {
                return "Already grated.";
            }
            return {
                description: "Grate garlic",
                item0: new Garlic({ ...this.state, grated: true }),
                item1,
            };
        }
    }

    view = objDummy("garlic");
}

class Onion extends Item {
    constructor(readonly state = { grated: false }) {
        super();
    }

    get name() {
        return this.state.grated ? "Grated Onion" : "Onion";
    }

    view = objDummy("onion");

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Grater) {
            if (this.state.grated) {
                return "Already grated.";
            }

            return {
                description: "Grate onion",
                item0: new Onion({ ...this.state, grated: true }),
                item1,
            };
        }
    }
}

class Carrot extends Item {
    constructor(readonly state = { grated: false }) {
        super();
    }

    get name() {
        return this.state.grated ? "Grated Carrot" : "Carrot";
    }

    view = objDummy("carrot");

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Grater) {
            if (this.state.grated) {
                return "Already grated.";
            }

            return {
                description: "Grate carrot",
                item0: new Carrot({ ...this.state, grated: true }),
                item1,
            };
        }
    }
}

class Salt extends Item {
    name = "Salt Shaker";
    view = objDummy("salt");
}

class Pepper extends Item {
    name = "Pepper Shaker";
    view = objDummy("pepper");
}

class OliveOil extends Item {
    name = "Olive Oil";
    view = objDummy("olive oil");
}

class Hammer extends Item {
    name = "Hammer";
    view = objDummy("hammer");
}

class Peeler extends Item {
    name = "Peeler";
    view = objDummy("peeler");
}

class Grater extends Item {
    name = "Grater";
    view = objDummy("grater");
}

class Skillet extends Item {
    name = "Skillet";
    view = Tx.Item.Skillet;
}

class Cigarette extends Item {
    private static readonly objCigaretteLit = () =>
        Sprite.from(Tx.Item.CigaretteLit)
            .coro(function* (self) {
                while (true) {
                    const smokeObj = Sprite.from(Tx.Item.Smoke)
                        .anchored(0.5, 1)
                        .at(self.getWorldPosition())
                        .add(66, 6)
                        .zIndexed(9999)
                        .coro(function* (self) {
                            yield interpvr(self)
                                .steps(5)
                                .translate(0, -40)
                                .over(Rng.intc(200, 400));

                            self.destroy();
                        })
                        .step(self => self.alpha -= 0.005)
                        .show();

                    yield () => smokeObj.destroyed;
                }
            });

    constructor(readonly state = { lit: false }) {
        super();
    }

    name = "Cigarette";
    get view() {
        return this.state.lit
            ? Cigarette.objCigaretteLit
            : Tx.Item.Cigarette;
    }

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Lighter) {
            if (this.state.lit) {
                return "Already lit.";
            }

            return {
                description: "Light cigarette",
                item0: new Cigarette({ ...this.state, lit: true }),
                item1,
            };
        }
    }
}

class Lighter extends Item {
    name = "Lighter";
    view = Tx.Item.Lighter;
}

class Egg extends Item {
    constructor(readonly state = { broken: false }) {
        super();
    }

    get name() {
        return this.state.broken ? "Broken Egg" : "Egg";
    }

    get view() {
        return this.state.broken ? Tx.Item.EggBroken : Tx.Item.Egg;
    }

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Hammer) {
            if (this.state.broken) {
                return "Already broken.";
            }

            return {
                description: "Break egg",
                item0: new Egg({ ...this.state, broken: true }),
                item1,
            };
        }
    }
}

class RecipeBuilder {
    private readonly _ingredients: Array<Recipe.Ingredient<typeof Item>> = [];

    addIngredient<TItem extends typeof Item>(
        Item: TItem,
        filter: (item: InstanceType<TItem>) => true | string,
        count: Integer,
        transform: (item: InstanceType<TItem>) => Item | null = () => null,
    ) {
        this._ingredients.push({ Item, filter: filter as any, count, transform: transform as any });
        return this;
    }

    build() {
        return new Recipe([...this._ingredients]);
    }
}

class Recipe {
    constructor(readonly ingredients: Recipe.Ingredients) {
    }

    createState(): Recipe.State {
        return this.ingredients.map(() => 0);
    }

    receive(_state: Recipe.State, item: Item): Recipe.ReceiveResult {
        const state = [..._state];

        for (let i = 0; i < this.ingredients.length; i++) {
            const { Item, filter, count, transform } = this.ingredients[i];

            if (!(item instanceof Item)) {
                continue;
            }

            if (state[i] >= count) {
                return { success: false, reason: "At maximum." };
            }

            const result = filter(item);

            if (typeof result === "string") {
                return { success: false, reason: result };
            }

            state[i] += 1;
            return { success: true, state, transformedItem: transform(item) };
        }

        return { success: false, reason: "...?" };
    }

    hasAllIngredients(state: Recipe.State) {
        for (let i = 0; i < this.ingredients.length; i++) {
            if (state[i] < this.ingredients[i].count) {
                return false;
            }
        }

        return true;
    }
}

namespace Recipe {
    export type State = ReadonlyArray<Integer>;

    export type Ingredients = Array<Recipe.Ingredient<typeof Item>>;

    export interface Ingredient<TItem extends typeof Item> {
        Item: TItem;
        filter: (item: InstanceType<TItem>) => true | string;
        transform: (item: InstanceType<TItem>) => Item | null;
        count: Integer;
    }

    export type ReceiveResult = { success: false; reason: string } | {
        success: true;
        state: State;
        transformedItem: Item | null;
    };
}

class MixingBowl extends Item {
    constructor(
        readonly state = { recipe: latkesRecipe.createState() },
    ) {
        super();
    }

    name = "Mixing Bowl";

    view = Tx.Item.MixingBowl;

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Scooper) {
            return "Not assembled yet.";
        }

        const recipeReceiveResult = latkesRecipe.receive(this.state.recipe, item1);

        if (recipeReceiveResult.success) {
            const { state: recipeState, transformedItem } = recipeReceiveResult;

            const description = "Add " + item1.name;

            if (latkesRecipe.hasAllIngredients(recipeState)) {
                return {
                    description,
                    item0: new MixingBowlAssembled(),
                    item1: transformedItem,
                };
            }

            return {
                description,
                item0: new MixingBowl({ ...this.state, recipe: recipeState }),
                item1: transformedItem,
            };
        }
        return recipeReceiveResult.reason;
    }
}

class MixingBowlAssembled extends Item {
    constructor(readonly state = { remainingLatkes: 9 }) {
        super();
    }

    get name() {
        return `Bowl w. ${this.state.remainingLatkes} Latkes`;
    }

    view = Tx.Item.MixingBowl;

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (this.state.remainingLatkes > 0) {
            if (item1 instanceof Scooper) {
                if (item1.state.hasLatke) {
                    return "Already full.";
                }

                return {
                    description: "Scoop latke",
                    item0: new MixingBowlAssembled({ ...this.state, remainingLatkes: this.state.remainingLatkes - 1 }),
                    item1: new Scooper({ ...item1.state, hasLatke: true }),
                };
            }

            return "Needs scooping.";
        }
    }
}

class Scooper extends Item {
    constructor(readonly state = { hasLatke: false }) {
        super();
    }

    get name() {
        return this.state.hasLatke ? "Full Scooper" : "Scooper";
    }

    get view() {
        return this.state.hasLatke ? Tx.Item.ScooperWithLatke : Tx.Item.Scooper;
    }
}

class Flour extends Item {
    name = "Bagged Flour";
    view = Tx.Item.Flour;

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Scooper) {
            return "Incorrect measurement.";
        }

        if (item1 instanceof HalfCup) {
            if (item1.state.hasFlour) {
                return "Already full.";
            }

            return {
                description: "Scoop flour",
                item0: new Flour(),
                item1: new HalfCup({ ...item1.state, hasFlour: true }),
            };
        }
    }
}

class HalfCup extends Item {
    constructor(readonly state = { hasFlour: false }) {
        super();
    }

    get name() {
        return this.state.hasFlour ? "Half Cup Flour" : "Half Cup";
    }

    get view() {
        return this.state.hasFlour ? Tx.Item.HalfCupFlour : Tx.Item.HalfCup;
    }
}

const latkesRecipe = new RecipeBuilder()
    .addIngredient(Potato, item => item.state.grated ? true : "Grate first.", 3)
    .addIngredient(Garlic, item => item.state.grated ? true : "Grate first.", 1)
    .addIngredient(Onion, item => item.state.grated ? true : "Grate first.", 1)
    .addIngredient(Carrot, item => item.state.grated ? true : "Grate first.", 1)
    .addIngredient(Egg, item => item.state.broken ? true : "Break first.", 1)
    .addIngredient(Salt, () => true, 1)
    .addIngredient(Pepper, () => true, 1)
    .addIngredient(
        HalfCup,
        (item) => item.state.hasFlour ? true : "Need flour.",
        1,
        item => new HalfCup({ ...item.state, hasFlour: false }),
    )
    .build();

export namespace DataItem {
    export const Manifest = {
        Potato,
        Peeler,
        Grater,
        Garlic,
        Hammer,
        Skillet,
        Cigarette,
        Lighter,
        Egg,
        MixingBowl,
        Scooper,
        Flour,
        HalfCup,
        Onion,
        Carrot,
        Salt,
        Pepper,
        OliveOil,
    };

    export type Id = keyof typeof Manifest;

    export function listIds() {
        return Object.keys(Manifest);
    }
}
