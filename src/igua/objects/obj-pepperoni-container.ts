import { Rectangle, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { areRectanglesOverlapping } from "../../lib/math/rectangle";
import { Pointer } from "../globals";
import { mxnFxFlipH } from "../mixins/fx/mxn-fx-flip-h";
import { objTopping } from "./obj-topping";

const r = new Rectangle();

export function objPepperoniContainer() {
    return Sprite.from(Tx.Containers.Pepperoni)
        .mixin(mxnFxFlipH)
        .step(self => {
            for (const pointer of Pointer.states) {
                if (!areRectanglesOverlapping(self.getBounds(false, r), pointer)) {
                    continue;
                }

                if (!Pointer.claim(pointer)) {
                    return;
                }

                objTopping("Pepperoni", pointer).show();
            }
        });
}
