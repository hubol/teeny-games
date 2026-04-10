import { DisplayObject } from "pixi.js";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";

export function mxnBoilPivot(obj: DisplayObject) {
    return obj
        .coro(function* () {
            const pivot = obj.pivot.vcpy();
            while (true) {
                yield sleep(Rng.intc(100, 200));
                obj.pivot.at(pivot.x + Rng.intc(-1, 1), pivot.y + Rng.intc(-1, 1));
            }
        });
}
