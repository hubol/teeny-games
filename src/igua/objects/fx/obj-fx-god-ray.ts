import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interp } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { PseudoRng, Rng } from "../../../lib/math/rng";

export function objFxGodRay(prng: PseudoRng) {
    return Sprite.from(Tx.Fx.GodRay)
        .coro(function* (self) {
            self.alpha = 0;
            while (true) {
                yield sleep(prng.int(8000, 15000));
                self.x = prng.int(-335, 1920 - 335);
                yield interp(self, "alpha").steps(5).to(prng.float(0.3, 0.5)).over(prng.int(5000, 6000));
                yield sleep(prng.int(5000, 6000));
                yield interp(self, "alpha").steps(5).to(0).over(prng.int(5000, 6000));
            }
        });
}
