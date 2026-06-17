import { Rectangle, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { areRectanglesOverlapping } from "../../lib/math/rectangle";
import { Pointer } from "../globals";
import { mxnFxFlipH } from "../mixins/fx/mxn-fx-flip-h";
import { objTopping } from "./obj-topping";

const r = new Rectangle();

export function objPepperoniContainer() {
    const usedPointers = new WeakSet<PointerListener.State>();

    return Sprite.from(Tx.Containers.Pepperoni)
        .mixin(mxnFxFlipH)
        .step(self => {
            for (const pointer of Pointer.states) {
                if (usedPointers.has(pointer)) {
                    continue;
                }

                if (!areRectanglesOverlapping(self.getBounds(false, r), pointer)) {
                    continue;
                }

                objTopping("Pepperoni", pointer).show();
                usedPointers.add(pointer);
            }
        });
}
