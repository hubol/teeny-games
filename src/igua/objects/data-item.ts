import { DisplayObject, Graphics, Sprite, Texture } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { interp, interpvr } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { ItemRef } from "./item-ref";
import { objIndexedSprite } from "./utils/obj-indexed-sprite";

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
    abstract readonly view: Texture | ((item: ItemRef) => DisplayObject);

    take(): Item.TakeResult {
        return { success: true, item: this };
    }

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

    export type TakeResult = { success: true; item: Item } | { success: false; reason: string };
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

    get view() {
        if (this.state.grated) {
            return Tx.Item.GarlicGrated;
        }
        if (this.state.smashed) {
            return Tx.Item.GarlicSmashed;
        }
        return Tx.Item.Garlic;
    }
}

class Onion extends Item {
    constructor(readonly state = { grated: false }) {
        super();
    }

    get name() {
        return this.state.grated ? "Grated Onion" : "Onion";
    }

    get view() {
        if (this.state.grated) {
            return Tx.Item.OnionGrated;
        }

        return Tx.Item.Onion;
    }

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

    get view() {
        return this.state.grated ? Tx.Item.CarrotGrated : Tx.Item.Carrot;
    }

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
    name = "Salt";
    view = Tx.Item.SaltShaker;
}

class Pepper extends Item {
    name = "Pepper";
    view = Tx.Item.PepperShaker;
}

class OliveOil extends Item {
    name = "Olive Oil";
    view = Tx.Item.OliveOil;
}

class Hammer extends Item {
    name = "Hammer";
    view = Tx.Item.Hammer;
}

class Peeler extends Item {
    name = "Peeler";
    view = Tx.Item.Peeler;
}

class Grater extends Item {
    name = "Grater";
    view = Tx.Item.Grater;
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
    readonly totalIngredientsCount: Integer;

    constructor(readonly ingredients: Recipe.Ingredients) {
        this.totalIngredientsCount = ingredients
            .reduce((sum, ingredient) => sum + ingredient.count, 0);
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
    private static objMixingBowl(item: ItemRef) {
        return container(
            Sprite.from(Tx.Item.MixingBowl),
            objText.MediumBoldIrregular("", { tint: 0x808E72, align: "center" })
                .anchored(0.5, 0.5)
                .at(43, 25)
                .step(self => {
                    if (!(item.ref instanceof MixingBowl)) {
                        return;
                    }

                    const ingredientsCount = item.ref.state.recipe.reduce((sum, value) => sum + value, 0);
                    self.text = ingredientsCount + " of " + latkesRecipe.totalIngredientsCount + "\ningredients";
                }),
        );
    }

    constructor(
        readonly state = { recipe: latkesRecipe.createState() },
    ) {
        super();
    }

    name = "Mixing Bowl";

    view = MixingBowl.objMixingBowl;

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
    private static objMixingBowlAssembled(item: ItemRef) {
        return container(
            Sprite.from(Tx.Item.MixingBowl),
            objText.MediumBoldIrregular("", { tint: 0x808E72, align: "center" })
                .anchored(0.5, 0.5)
                .at(43, 25)
                .step(self => {
                    if (!(item.ref instanceof MixingBowlAssembled)) {
                        return;
                    }

                    self.text = item.ref.state.remainingLatkes + " latkes";
                }),
        );
    }

    constructor(readonly state = { remainingLatkes: 9 }) {
        super();
    }

    name = "Latke Mix";

    view = MixingBowlAssembled.objMixingBowlAssembled;

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

class SmokeAlarm extends Item {
    private static objSmokeAlarm(item: ItemRef) {
        function isTriggered() {
            return item.ref instanceof SmokeAlarm ? item.ref.state.triggered : false;
        }

        return container(
            Sprite.from(Tx.Item.SmokeAlarm),
            new Graphics()
                .tinted(0x000000)
                .beginFill(0xffffff)
                .drawRect(28, 25, 4, 4)
                .coro(function* (self) {
                    while (true) {
                        self.tint = isTriggered() ? 0x400000 : 0x004000;
                        yield sleep(isTriggered() ? 200 : 500);
                        self.tint = isTriggered() ? 0xf00000 : 0x00f000;
                        yield sleep(isTriggered() ? 200 : 500);
                    }
                }),
        )
            .coro(function* (self) {
                let gain = 1;
                while (true) {
                    if (!isTriggered()) {
                        gain = 1;
                    }
                    yield () => isTriggered();
                    SmokeAlarm.objFxNoise().at(self.getWorldPosition()).zIndexed(9999).show();
                    const soundInstance = self.playInstance(Sfx.Alarm);
                    soundInstance.gain *= gain;
                    gain = approachLinear(gain, 0.5, 0.05);
                    yield sleep(500);
                }
            });
    }

    private static readonly txsFxNoise = Tx.Fx.AlarmNoise.split({ count: 8 });

    private static objFxNoise() {
        return objIndexedSprite(this.txsFxNoise)
            .pivoted(-20, 33)
            .coro(function* (self) {
                yield interp(self, "textureIndex").to(8).over(Rng.intc(600, 750));
                self.destroy();
            });
    }

    constructor(readonly state = { triggered: false }) {
        super();
    }

    name = "Smoke Alarm";
    view = SmokeAlarm.objSmokeAlarm;

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Cigarette) {
            if (item1.state.lit) {
                return {
                    description: "Trigger smoke alarm",
                    item0: new SmokeAlarm({ ...this.state, triggered: true }),
                    item1,
                };
            }
        }
    }
}

class Whisky extends Item {
    constructor(readonly state = { hasPermission: false }) {
        super();
    }

    name = "Whisky";
    view = Tx.Item.Whisky;

    take(): Item.TakeResult {
        if (this.state.hasPermission) {
            return super.take();
        }

        return { success: false, reason: "Need permission." };
    }

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof WhiskyGlass) {
            if (!this.state.hasPermission) {
                return "Need permission.";
            }

            if (item1.state.filled) {
                return "Already full.";
            }

            return {
                description: "Fill glass",
                item0: this,
                item1: new WhiskyGlass({ ...item1.state, filled: true }),
            };
        }
    }
}

class WhiskyGlass extends Item {
    constructor(readonly state = { filled: false }) {
        super();
    }

    name = "Whisky Glass";

    get view() {
        return this.state.filled ? Tx.Item.WhiskyGlassFull : Tx.Item.WhiskyGlass;
    }
}

class Skillet extends Item {
    constructor(readonly state = { oliveOilUnits: 0, remainingLatkes: 0, cookedLatkes: 0 }) {
        super();
    }

    name = "Skillet";
    view = Tx.Item.Skillet;

    take(): Item.TakeResult {
        return { success: false, reason: "Let's not move this" };
    }

    cook(): Skillet["state"] {
        return {
            oliveOilUnits: this.state.oliveOilUnits,
            remainingLatkes: Math.max(0, this.state.remainingLatkes - 1),
            cookedLatkes: this.state.cookedLatkes + 1,
        };
    }

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof OliveOil) {
            if (this.state.oliveOilUnits >= 4) {
                return "Already have enough";
            }

            return {
                description: "Add olive oil",
                item0: new Skillet({ ...this.state, oliveOilUnits: 4 }),
                item1: new OliveOil(),
            };
        }
        if (item1 instanceof Scooper) {
            if (!item1.state.hasLatke) {
                return "It's empty.";
            }

            if (this.state.oliveOilUnits <= 0) {
                return this.state.cookedLatkes ? "Needs more oil" : "Needs oil";
            }

            if (this.state.remainingLatkes >= 4) {
                return "Wait for others to cook.";
            }

            return {
                description: "Cook latke",
                item0: new Skillet({
                    ...this.state,
                    oliveOilUnits: this.state.oliveOilUnits - 1,
                    remainingLatkes: this.state.remainingLatkes + 1,
                }),
                item1: new Scooper({ ...item1.state, hasLatke: false }),
            };
        }
    }
}

class Latke extends Item {
    name = "Latke";
    view = Tx.Item.Latke;
}

class ServingPlatter extends Item {
    private static objServingPlatter(item: ItemRef) {
        function getLatkes() {
            return item.ref instanceof ServingPlatter ? item.ref.state.latkes : 0;
        }

        const positions = [
            [27, 14],
            [60, 5],
            [108, 8],
            [87, 26],
            [50, 27],
            [39, 7],
            [69, 18],
            [95, 5],
            [121, 16],
        ];

        return container(
            Sprite.from(Tx.Item.Platter),
        )
            .coro(function* (self) {
                const latkesObj = container().show(self);
                while (true) {
                    latkesObj.removeAllChildren();
                    const count = getLatkes();
                    for (let i = 0; i < count; i++) {
                        Sprite.from(Tx.Item.Latke)
                            .anchored(0.5, 0.5)
                            .at(positions[i])
                            .show(latkesObj);
                    }
                    yield onPrimitiveMutate(getLatkes);
                }
            });
    }

    name = "Serving Platter";
    view = ServingPlatter.objServingPlatter;

    constructor(readonly state = { latkes: 0 }) {
        super();
    }

    protected combine(item1: Item): Item.Protected.CombineResult {
        if (item1 instanceof Latke) {
            if (this.state.latkes > 9) {
                return "Too many.";
            }

            return {
                description: "Add latke",
                item0: new ServingPlatter({ ...this.state, latkes: this.state.latkes + 1 }),
                item1: null,
            };
        }
    }
}

const latkesRecipe = new RecipeBuilder()
    .addIngredient(Potato, item => item.state.grated ? true : "Grate first.", 3)
    .addIngredient(Garlic, item => item.state.grated ? true : "Grate first.", 1)
    .addIngredient(Onion, item => item.state.grated ? true : "Grate first.", 1)
    .addIngredient(Carrot, item => item.state.grated ? true : "Grate first.", 1)
    .addIngredient(Egg, item => item.state.broken ? true : "Break first.", 1)
    .addIngredient(Salt, () => true, 1, () => new Salt())
    .addIngredient(Pepper, () => true, 1, () => new Pepper())
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
        MixingBowlAssembled,
        Scooper,
        Flour,
        HalfCup,
        Onion,
        Carrot,
        Salt,
        Pepper,
        OliveOil,
        SmokeAlarm,
        Whisky,
        WhiskyGlass,
        Latke,
        ServingPlatter,
    };

    export type Id = keyof typeof Manifest;

    export function listIds() {
        return Object.keys(Manifest);
    }
}
