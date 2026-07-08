import { Container } from "pixi.js";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { vnew } from "../../lib/math/vector-type";
import { renderer } from "../current-pixi-renderer";
import { PizzaPointer } from "../utils/pizza-pointer";

const v = vnew();

export function mxnTool(obj: Container) {
    const enabledPosition = vnew();
    const disabledPosition = vnew();

    let pointers = new Array<PointerListener.State>();
    let isDown = false;

    const api = {
        get isDown() {
            return isDown;
        },
        isEnabled: false,
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
                const targetPosition = api.isEnabled ? enabledPosition : disabledPosition;
                const speed = Math.max(3, v.at(obj).add(targetPosition, -1).vlength / 16);
                obj.moveTowards(targetPosition, speed);
            }
        })
        .coro(function* (self) {
            enabledPosition.at(self);
            disabledPosition.at(self);
            disabledPosition.y = renderer.height + self.height;
            self.at(disabledPosition);
        });
}
