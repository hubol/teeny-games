import { DisplayObject } from "pixi.js";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";

export function mxnBoilPivot(obj: DisplayObject, rate = 333) {
    return obj
        .coro(function* (self) {
            while (true) {
                self.pivot.at(Rng.intc(-1, 1), Rng.intc(-1, 1));
                yield sleep(rate);
            }
        });
}
