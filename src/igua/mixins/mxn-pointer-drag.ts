import { DisplayObject } from "pixi.js";
import { vnew } from "../../lib/math/vector-type";
import { StepOrder } from "../objects/step-order";
import { mxnFxDie } from "./fx/mxn-fx-die";
import { mxnPointer } from "./mxn-pointer";

export function mxnPointerDrag(obj: mxnPointer.Type) {
    const pointerOffset = vnew();

    return obj
        .handles("mxnPointer.claimed", (self, pointer) => pointerOffset.at(self).add(pointer, -1))
        .step(self => {
            if (mxnFxDie.isDying(self)) {
                return;
            }

            const pointer = self.mxnPointer.current;

            if (!pointer) {
                return;
            }

            self.at(pointer).add(pointerOffset);
        }, StepOrder.AfterPointerClaim);
}
