import { PseudoRng } from "../../lib/math/rng";
import { scene } from "../globals";
import { objFish } from "../objects/obj-fish";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x808080;

    const prng = new PseudoRng(993494);
    prng.bool();

    for (let i = 0; i < 5; i++) {
        objFish()
            .at(prng.int(-200, 640), prng.int(-60, 300))
            .step(self => {
                self.x += 0.5;
                self.y += Math.sin(i + scene.ticker.ticks / 30) * 0.3;
                if (self.x >= 640) {
                    self.x = -215;
                }
            })
            .show();
    }
}
