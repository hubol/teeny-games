import { Sprite } from "pixi.js";
import { Sfx } from "../../../assets/sounds";
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
                self.x = 270 + prng.int(1250);
                yield interp(self, "alpha").steps(5).to(prng.float(0.3, 0.5)).over(prng.int(5000, 6000));
                yield sleep(prng.int(5000, 6000));
                yield interp(self, "alpha").steps(5).to(0).over(prng.int(5000, 6000));
            }
        })
        .coro(function* (self) {
            while (true) {
                yield () => self.alpha >= 0;
                const sfx = self.playInstance(Sfx.Fx.Glock.rate(Rng.item(cScaleRates) / 4));
                sfx.gain = Rng.float(0.02, 0.1) * self.alpha;
                yield sleep(Rng.intc(1, 4) * 250);
            }
        });
}

// TODO share?
const c4Hz = 261.63;
export const cScaleRates = [
    c4Hz,
    // 277.18,
    293.66,
    // 311.13,
    329.63,
    349.23,
    // 369.99,
    392.00,
    // 415.30,
    440.00,
    // 466.16,
    493.88,
]
    .map(hz => hz / c4Hz);
