import { DisplayObject } from "pixi.js";
import { interp } from "../../../lib/game-engine/routines/interp";

export function mxnFxDie(obj: DisplayObject) {
    return obj
        .coro(function* (self) {
            yield interp(self, "alpha").to(0).over(200);
            self.destroy();
        });
}

mxnFxDie.isDying = function isDying (obj: DisplayObject): boolean {
    return obj.is(mxnFxDie);
};
