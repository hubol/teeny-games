import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { factor, interpv } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { PseudoRng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";

const txs = Tx.Nyfish.Layers.split({ width: 362, trimFrame: true });
const txsBody = txs.slice(0, -2);
const [txSclera, txPupil] = txs.slice(-2);

export function objNyfish(prng: PseudoRng) {
    return container(
        Sprite.from(prng.item(txsBody)),
        Sprite.from(txSclera),
        Sprite.from(txPupil)
            .coro(function* (self) {
                while (true) {
                    yield interpv(self)
                        .factor(factor.sine)
                        .to(prng.float(-10, 10), prng.float(-10, 10))
                        .over(prng.int(500, 1000));
                    if (prng.float() < 0.8) {
                        yield sleep(prng.int(500, 1000));
                    }
                }
            }),
    );
}
