import { DisplayObject, Sprite, Texture } from "pixi.js";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { DataItem } from "./data-item";

export function objItem(itemId: DataItem.Id) {
    const item = { ref: new DataItem.Manifest[itemId]() };

    let previousView = Null<Texture | (() => DisplayObject)>();

    return container()
        .step(self => {
            const view = item.ref.view;
            if (view !== previousView) {
                self.removeAllChildren();
                if (view instanceof Texture) {
                    Sprite.from(view).show(self);
                }
                else {
                    view().show(self);
                }
                previousView = view;
            }
        })
        .mixin(
            mxnInteractive,
            {
                get text() {
                    return "Take " + item.ref.name;
                },
            },
        );
}
