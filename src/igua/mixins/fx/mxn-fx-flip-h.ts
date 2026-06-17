import { Container, DisplayObject } from "pixi.js";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";

export function mxnFxFlipH(obj: Container) {
    return obj
        .coro(function* () {
            const f = Rng.bool() ? 1 : -1;
            obj.flipH(f);
            while (true) {
                yield sleep(Rng.int(500, 1500));
                obj.flipH(-f);
                yield sleep(Rng.int(500, 1500));
                obj.flipH(f);
            }
        });
}
