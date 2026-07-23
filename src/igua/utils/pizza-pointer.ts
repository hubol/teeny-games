import { DisplayObject, Graphics } from "pixi.js";
import { Pointer } from "../globals";

const pointerObj = new Graphics().beginFill(0xffffff).drawRect(0, 0, 1, 1);

export namespace PizzaPointer {
    export function claim(self: DisplayObject) {
        for (const pointer of Pointer.states) {
            if (!pointer.down) {
                continue;
            }

            pointerObj.at(pointer);
            pointerObj.width = pointer.width;
            pointerObj.height = pointer.height;

            if (!self.collides(pointerObj)) {
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
