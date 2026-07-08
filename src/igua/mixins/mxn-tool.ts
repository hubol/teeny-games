import { DisplayObject } from "pixi.js";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { vnew } from "../../lib/math/vector-type";
import { PizzaPointer } from "../utils/pizza-pointer";

const v = vnew();

export function mxnTool(obj: DisplayObject) {
    const startPosition = vnew();
    let pointers = new Array<PointerListener.State>();
    let isDown = false;

    const api = {
        get isDown() {
            return isDown;
        },
    };

    return obj
        .merge({ mxnTool: api })
        .step(() => {
            isDown = false;

            const pointer = PizzaPointer.claim(obj);
            if (pointer) {
                pointers.push(pointer);
            }

            if (pointers.length === 0) {
                return;
            }

            pointers = pointers.filter(pointer => pointer.down);

            const lastPointer = pointers.last;

            if (!lastPointer) {
                return;
            }

            isDown = true;

            obj.at(lastPointer);
        })
        .step(() => {
            if (!isDown) {
                const speed = Math.max(3, v.at(obj).add(startPosition, -1).vlength / 16);
                obj.moveTowards(startPosition, speed);
            }
        })
        .coro(function* (self) {
            startPosition.at(self);
        });
}
