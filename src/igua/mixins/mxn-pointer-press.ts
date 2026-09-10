import { DisplayObject } from "pixi.js";
import { DollPointer } from "../utils/doll-pointer";

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

            const pointer = DollPointer.claim(obj);
            if (!pointer) {
                return;
            }

            self.dispatch("mxnPointerPress:pressed");
        }, -priority);
}
