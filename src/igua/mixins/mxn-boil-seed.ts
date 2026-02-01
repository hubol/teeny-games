import { DisplayObject } from "pixi.js";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";

export function mxnBoilSeed(obj: DisplayObject & { seed: Integer }) {
    return obj
        .coro(function* (self) {
            while (true) {
                yield sleep(250);
                self.seed = Rng.intc(10000, 300000);
            }
        });
}
