import { DisplayObject, Resource, Texture } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";

export abstract class Item {
    abstract readonly name: string;
    abstract readonly view: Texture | (() => DisplayObject);

    /** Should be implemented to NOT mutate state */
    protected combine(item1: Item): Item.CombineResult | void {
    }

    static combine(item0: Item, item1: Item): Item.CombineResult {
        const result0 = item0.combine(item1) ?? { kind: "impossible" };
        if (result0.kind === "combined") {
            return result0;
        }
        const result1 = item1.combine(item0) ?? { kind: "impossible" };
        if (result1.kind === "combined") {
            return result1;
        }
        if (result1.kind === "failed") {
            return result1;
        }
        return result0;
    }
}

namespace Item {
    export type CombineResult =
        | { kind: "impossible" }
        | { kind: "failed"; reason: string }
        | { kind: "combined"; description: string; item0: Item; item1: Item };
}

function objDummy(name: string) {
    return () => objText.Medium(name).anchored(0.5, 0.5);
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

    protected combine(item1: Item): void | Item.CombineResult {
        if (item1 instanceof Peeler) {
            if (!this.state.peeled) {
                return {
                    kind: "combined",
                    description: "Peel potato",
                    item0: new Potato({ ...this.state, peeled: true }),
                    item1,
                };
            }
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

class Peeler extends Item {
    name = "Peeler";
    view = objDummy("peeler");
}

export namespace DataItem {
    export const Manifest = {
        Potato,
        Peeler,
    };

    export type Id = keyof typeof Manifest;
}
