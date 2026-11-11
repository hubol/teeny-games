import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { cyclic } from "../../../lib/math/number";
import { Rng } from "../../../lib/math/rng";
import { AdjustColor } from "../../../lib/pixi/adjust-color";
import { container } from "../../../lib/pixi/container";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txs = Tx.Virus.Layers.split({ width: 52 });

const txsBody = txs.slice(0, 4);
const txHighlight = txs[4];
const txsFace = txs.slice(5);

export function objCellVirus() {
    const tint = AdjustColor.hsv(Rng.float(360), Rng.float(70, 100), Rng.float(90, 100)).toPixi();
    const highlightTint = AdjustColor.pixi(tint).lighten(0.2).saturate(0.2).toPixi();

    let stepsCount = 0;
    let angleDelta = Rng.float(0.5, 1) * Rng.intp();

    return container(
        container(
            Sprite.from(Tx.Virus.Outline)
                .at(-3, -3),
            objIndexedSprite(txsBody)
                .tinted(tint)
                .coro(function* (self) {
                    while (true) {
                        yield sleep(Rng.float(100, 300));
                        self.textureIndex = cyclic(self.textureIndex + Rng.intp(), 0, txsBody.length);
                    }
                }),
        )
            .angled(Rng.int(4) * 90)
            .pivoted(26, 28)
            .at(26, 28)
            .step(self => self.angle += angleDelta),
        Sprite.from(txHighlight)
            .tinted(highlightTint)
            .step(self => {
                if (Rng.float() > 0.9) {
                    self.pivot.y = Rng.intc(-1, 1);
                }
            }),
        Sprite.from(Rng.item(txsFace))
            .step(self => self.y = Math.sin(stepsCount++ / 20) * 2),
    );
}
