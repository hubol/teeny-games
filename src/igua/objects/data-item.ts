import { DisplayObject, Graphics, Resource, Texture } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
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

    constructor(readonly state = { peeled: false, shredded: false }) {
        super();
    }

    get name() {
        if (this.state.shredded) {
            return "Shredded Potato";
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
            if (!this.state.shredded) {
                return {
                    description: "Grate potato",
                    item0: new Potato({ ...this.state, shredded: true }),
                    item1,
                };
            }
            return "Already grated.";
        }
    }

    get view() {
        if (this.state.shredded) {
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
            return "Fine Garlic";
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

export namespace DataItem {
    export const Manifest = {
        Potato,
        Peeler,
        Grater,
        Garlic,
        Hammer,
        Skillet,
    };

    export type Id = keyof typeof Manifest;

    export function listIds() {
        return Object.keys(Manifest);
    }
}
