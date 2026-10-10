import { DisplayObject } from "pixi.js";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";

export function mxnBoilPivot(obj: DisplayObject) {
    return obj
        .coro(function* (self) {
            while (true) {
                for (const y of Rng.shuffle([-1, 1])) {
                    yield interpvr(self.pivot)
                        .factor(factor.sine)
                        .to(Rng.intc(-2, 2), y * Rng.int(1, 3))
                        .over(Rng.int(400, 600));
                }
            }
        });
}
