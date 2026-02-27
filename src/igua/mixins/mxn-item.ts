import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { VectorSimple } from "../../lib/math/vector-type";
import { Null } from "../../lib/types/null";
import { ItemRef } from "../objects/item-ref";

export function mxnItem(obj: Container, item: ItemRef, pivotUnit: VectorSimple) {
    let previousView = Null<Texture | ((item: ItemRef) => DisplayObject)>();

    const api = {
        get item() {
            return item.ref;
        },
    };

    return obj
        .merge({ mxnItem: api })
        .step(self => {
            const view = item.ref?.view ?? null;
            if (view !== previousView) {
                self.removeAllChildren();
                if (view instanceof Texture) {
                    Sprite.from(view).show(self);
                }
                else if (view) {
                    view(item).show(self);
                }
                self.pivotedUnit(pivotUnit);
                previousView = view;
            }
        })
        .track(mxnItem);
}
