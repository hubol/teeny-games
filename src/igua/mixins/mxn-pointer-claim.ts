import { DisplayObject } from "pixi.js";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Null } from "../../lib/types/null";
import { PizzaPointer } from "../utils/pizza-pointer";

export function mxnPointerClaim(obj: DisplayObject) {
    let pointer = Null<PointerListener.State>();

    const api = {
        get pointer() {
            return !pointer?.down ? null : pointer as Omit<PointerListener.State, "down"> & { down: true };
        },
    };

    return obj
        .step(self => {
            if (pointer?.down) {
                return;
            }
            pointer = PizzaPointer.claim(self);
        })
        .merge({ mxnPointerClaim: api });
}
