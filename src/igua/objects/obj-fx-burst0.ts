import { Tx } from "../../assets/textures";
import { Rng } from "../../lib/math/rng";
import { objIndexedSprite } from "./utils/obj-indexed-sprite";

const txs = Tx.Fx.Burst0.split({ width: 90 });

export function objFxBurst0() {
    let speed = Rng.float(0.2, 0.3);

    return objIndexedSprite(txs)
        .anchored(1, 0)
        .step(self => {
            self.textureIndex += speed;
            if (self.textureIndex >= txs.length) {
                self.destroy();
            }
        });
}
