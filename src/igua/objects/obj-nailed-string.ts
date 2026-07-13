import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { approachLinear, nlerp } from "../../lib/math/number";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { scene } from "../globals";
import { mxnFxBoil } from "../mixins/fx/mxn-fx-boil";

interface Strum {
    position: number;
    strength: number;
}

const consts = {
    strumWidth: 32,
    strumAffectRadius: 45,
};

export function objNailedString(length: number) {
    const strums = new Array<Strum>();

    const api = {
        visibleUnit: 0,
        strum(position: number) {
            if (api.visibleUnit < 0.8) {
                return;
            }

            const existingStrum = strums.find(strum => strum.position === position);

            if (existingStrum) {
                existingStrum.strength = Math.min(1, Math.max(1.5, existingStrum.strength * 1.1));
                return;
            }
            strums.push({ position, strength: 1 });
            strums.sort((a, b) => a.position - b.position);
        },
    };

    const gfx = new Graphics();

    const [centerNailObj, farNailObj] = range(2).map(() =>
        Sprite.from(Tx.Pizza.Nail)
            .mixin(mxnFxBoil, "position")
            .pivoted(10, 15)
            .scaled(2, 2)
    );

    return container(
        farNailObj,
        gfx,
        centerNailObj,
    )
        .merge({ objNailedString: api })
        .step(() => {
            for (let i = 0; i < strums.length;) {
                const strum = strums[i];
                strum.strength = approachLinear(strum.strength, 0, 1 / 60);
                if (strum.strength <= 0) {
                    strums.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        })
        .step(self => {
            self.pivot.y = (1 - api.visibleUnit) * (length * 1.2);
            centerNailObj.y = nlerp(-100, 0, api.visibleUnit);
            farNailObj.y = nlerp(-100, -length, api.visibleUnit);
            gfx.clear().lineStyle(5, 0xffffff).moveTo(0, -8);

            for (const strum of strums) {
                const t = Math.sin(scene.ticker.ticks / 120);

                for (let f = -1; f < 1; f += 0.05) {
                    const y = -strum.position - f * consts.strumAffectRadius;
                    const x = Math.sin((y + t) / nlerp(5, 3.5, strum.strength)) * strum.strength * (1 - Math.abs(f))
                        * consts.strumWidth;
                    gfx.lineTo(x, y);
                }
            }

            gfx.lineTo(0, -length - 6);
        });
}
