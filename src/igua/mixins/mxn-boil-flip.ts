import { Container, DisplayObject } from "pixi.js";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";

export function mxnBoilFlip(obj: Container) {
    return obj
        .coro(function* () {
            while (true) {
                obj.flipH(Rng.intp());
                obj.flipV(Rng.intp());
                yield sleep(250);
            }
        });
}
