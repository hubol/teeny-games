import { DisplayObject, Rectangle } from "pixi.js";
import { areRectanglesOverlapping } from "../../lib/math/rectangle";
import { Pointer } from "../globals";

const r = new Rectangle();

export namespace PizzaPointer {
    export function claim(self: DisplayObject) {
        for (const pointer of Pointer.states) {
            if (!pointer.down) {
                continue;
            }

            if (!areRectanglesOverlapping(self.getBounds(false, r), pointer)) {
                continue;
            }

            if (!Pointer.claim(pointer)) {
                continue;
            }

            return pointer;
        }

        return null;
    }
}
