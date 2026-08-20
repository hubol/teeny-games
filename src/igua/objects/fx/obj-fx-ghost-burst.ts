import { Tx } from "../../../assets/textures";
import { sleepf } from "../../../lib/game-engine/routines/sleep";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txs = Tx.Fx.GhostBurst.split({ width: 178 });

export function objFxGhostBurst() {
    return objIndexedSprite(txs)
        .scaled(2, 2)
        .coro(function* (self) {
            for (let i = 0; i < txs.length; i++) {
                self.textureIndex = i;
                yield sleepf(i * 0.67 + 2);
            }

            self.destroy();
        });
}
