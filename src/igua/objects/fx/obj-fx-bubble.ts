import { Tx } from "../../../assets/textures";
import { blendColor } from "../../../lib/color/blend-color";
import { Rng } from "../../../lib/math/rng";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txsBubble = Tx.Effects.Bubble68.split({ width: 68 });

export function objFxBubble() {
    return objIndexedSprite(txsBubble)
        .anchored(0.5, 0.5)
        .angled(Rng.int(4) * 90)
        .tinted(blendColor(0xffffff, 0x65a2db, Rng.float()))
        .step(self => {
            self.y -= Rng.float(3);
            self.textureIndex += Rng.float(0.03, 0.1);
            if (self.textureIndex >= txsBubble.length) {
                self.destroy();
            }
        });
}
