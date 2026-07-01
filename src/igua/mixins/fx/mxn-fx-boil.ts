import { DisplayObject } from "pixi.js";
import { interpvr } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";

export function mxnFxBoil(obj: DisplayObject, target: "position" | "pivot") {
    const vector = obj[target];
    return obj
        .coro(function* () {
            while (true) {
                yield interpvr(vector).to(Rng.intc(-3, 3), Rng.intc(-3, 3)).over(Rng.int(250, 1000));
                yield sleep(Rng.int(500));
            }
        });
}
