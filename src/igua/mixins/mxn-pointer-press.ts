import { DisplayObject } from "pixi.js";
import { PizzaPointer } from "../utils/pizza-pointer";

export function mxnPointerPress(obj: DisplayObject, priority = 0) {
    const api = {
        canPress: true,
    };

    return obj
        .dispatches<"mxnPointerPress:pressed">()
        .merge({ mxnPointerPress: api })
        .step((self) => {
            if (!api.canPress) {
                return;
            }

            const pointer = PizzaPointer.claim(obj);
            if (!pointer) {
                return;
            }

            self.dispatch("mxnPointerPress:pressed");
        }, -priority);
}
