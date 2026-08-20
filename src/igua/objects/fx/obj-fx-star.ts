import { Tx } from "../../../assets/textures";
import { interp } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { PseudoRng, Rng } from "../../../lib/math/rng";
import { ZIndex } from "../../core/scene/z-index";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txs = Tx.Fx.Star.split({ width: 16 });
const prng = new PseudoRng();

export function objFxStar() {
    return objIndexedSprite(txs)
        .coro(function* (self) {
            prng.seed = (self.x & 0b1010101010101010) + (self.y & 0b0101010101010101);

            self.angle = prng.int(4) * 90;

            const txMin = prng.int(txs.length);
            const txMax = prng.int(txMin, txs.length);

            self.textureIndex = txMin;

            if (txMin === txMax) {
                return;
            }

            const delayMin = prng.int(1500, 3000);
            const delayMax = delayMin + prng.int(1500, 3000);

            yield sleep(Rng.int(delayMin, delayMax) * 0.5);
            while (true) {
                yield interp(self, "textureIndex").to(txMax).over(Rng.int(delayMin, delayMax) * 0.5);
                yield sleep(Rng.int(delayMin, delayMax) * 0.5);
                yield interp(self, "textureIndex").to(txMin).over(Rng.int(delayMin, delayMax) * 0.5);
                yield sleep(Rng.int(delayMin, delayMax));
            }
        })
        .pivoted(7, 6)
        .scaled(3, 3)
        .zIndexed(ZIndex.FxStar);
}
