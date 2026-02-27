import { DisplayObject } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { container } from "../../lib/pixi/container";
import { layers } from "../globals";
import { Item } from "../objects/data-item";
import { ItemRef } from "../objects/item-ref";
import { mxnInteractive } from "./mxn-interactive";
import { mxnItem } from "./mxn-item";

interface MxnItemStorageArgs<TItem extends typeof Item> {
    text: string;
    Item: TItem;
    filter: (item: InstanceType<TItem>) => true | string;
}

export function mxnItemStorage<TItem extends typeof Item>(obj: DisplayObject, args: MxnItemStorageArgs<TItem>) {
    const item: ItemRef = { ref: null };

    return obj
        .merge({
            mxnItemStorage: {
                get isStored() {
                    return item.ref !== null;
                },
            },
        })
        .mixin(mxnInteractive, {
            text: item.ref ? "Good job" : args.text,
            get enabled() {
                return item.ref === null;
            },
            interact(heldItem) {
                if (!heldItem.ref) {
                    return;
                }

                if (!(heldItem.ref instanceof args.Item)) {
                    layers.overlay.showError("Not that.");
                    return;
                }

                const result = args.filter(heldItem.ref as any);
                if (typeof result === "string") {
                    layers.overlay.showError(result);
                    return;
                }

                obj.play(Sfx.PutDown);
                item.ref = heldItem.ref;
                heldItem.ref = null;
            },
        })
        .step(self => self.visible = !self.mxnItemStorage.isStored)
        .coro(function* (self) {
            container()
                .mixin(mxnItem, item, [0.5, 1])
                .at(self)
                .show();
        });
}
