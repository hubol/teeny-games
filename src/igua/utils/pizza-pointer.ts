import { DisplayObject, Graphics } from "pixi.js";
import { Pointer, scene } from "../globals";

const pointerObj = new Graphics().beginFill(0xffffff).drawRect(0, 0, 1, 1);
let lastPointerDownTick = -999;

export namespace PizzaPointer {
    export function getTicksSinceDown() {
        return scene.ticker.ticks - lastPointerDownTick;
    }

    export function claim(self: DisplayObject) {
        for (const pointer of Pointer.states) {
            if (!pointer.down) {
                continue;
            }

            lastPointerDownTick = scene.ticker.ticks;

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
