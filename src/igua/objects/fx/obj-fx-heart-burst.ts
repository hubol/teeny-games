import { Tx } from "../../../assets/textures";
import { Rng } from "../../../lib/math/rng";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txs = Tx.Effects.HeartBurst.split({ width: 44 });

export function objFxHeartBurst() {
    return objIndexedSprite(txs)
        .pivoted(23, 14)
        .scaled(2 * Rng.intp(), 2)
        .step(self => {
            self.textureIndex += Rng.float(0.2, 0.4);
            self.y += Rng.float(1.5);
            if (self.textureIndex >= txs.length) {
                self.destroy();
            }
        });
}
