import { Tx } from "../../../assets/textures";
import { blendColor } from "../../../lib/color/blend-color";
import { factor, interp, interpv } from "../../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../../lib/game-engine/routines/sleep";
import { vdeg } from "../../../lib/math/angle";
import { Integer, RgbInt } from "../../../lib/math/number-alias-types";
import { Rng } from "../../../lib/math/rng";
import { VectorSimple } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";
import { renderer } from "../../current-pixi-renderer";
import { DataCondiments } from "../../data/data-condiments";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txs = Tx.Effects.CondimentDrip.split({ width: 34 });
const landedTxs = Tx.Effects.CondimentDripLanded.split({ width: 34 });

export function objFxCondimentDrip() {
    return objIndexedSprite(txs);
}

namespace BurstRing {
    interface Config {
        radius: Integer;
        count: Integer;
    }

    export const configs: Config[] = [
        {
            radius: 400,
            count: 14,
        },
        {
            radius: 280,
            count: 10,
        },
        {
            radius: 140,
            count: 6,
        },
        {
            radius: 50,
            count: 3,
        },
    ];
}

objFxCondimentDrip.objBurst = function objBurst (condimentId: DataCondiments.Id) {
    const data = DataCondiments.getById(condimentId);

    const positions = new Array<VectorSimple>();

    for (const { count, radius } of BurstRing.configs) {
        const offset = Rng.float(360);
        const delta = 360 / count;

        for (let i = 0; i < count; i++) {
            const position = vdeg(offset + delta * i).scale(radius);
            positions.push(position);
        }
    }

    positions.sort((a, b) => a.y - b.y);

    return container()
        .coro(function* (self) {
            for (const position of positions) {
                const tint = blendColor(data.tints[0], data.tints[1], Rng.float());
                const delay = Math.max(0, position.y) + Rng.float(500);

                objFxCondimentDrip()
                    .step(self => {
                        if (self.textures === txs) {
                            self.textureIndex += Rng.float(0.1);
                        }
                    })
                    .pivoted(18, 80)
                    .tinted(tint)
                    .at(self)
                    .add(position)
                    .coro(function* (self) {
                        self.scale.x = Rng.intp();
                        yield interpv(self).steps(Rng.int(12, 24)).translate(0, renderer.height).over(delay);
                        self.textures = landedTxs;
                        self.textureIndex = 0;
                        self.scale.scale(1.4, 1.4);
                        yield interp(self, "textureIndex").to(landedTxs.length).over(Rng.int(200, 300));
                        self.alpha = 0.5;
                        yield sleep(200);
                        self.destroy();
                    })
                    .show();
            }
            self.destroy();
        });
};
