import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { factor, interpv } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";

const txs = Tx.Nyfish.Layers.split({ width: 362, trimFrame: true });
const txsBody = txs.slice(0, -2);
const [txSclera, txPupil] = txs.slice(-2);

export function objNyfish() {
    return container(
        Sprite.from(Rng.item(txsBody)),
        Sprite.from(txSclera),
        Sprite.from(txPupil)
            .coro(function* (self) {
                while (true) {
                    yield interpv(self)
                        .factor(factor.sine)
                        .to(Rng.float(-10, 10), Rng.float(-10, 10))
                        .over(Rng.int(500, 1000));
                    if (Rng.float() < 0.8) {
                        yield sleep(Rng.int(500, 1000));
                    }
                }
            }),
    );
}
