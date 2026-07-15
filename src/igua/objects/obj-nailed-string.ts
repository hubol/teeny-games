import { Graphics, Matrix, Point, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { ToRad } from "../../lib/math/angle";
import { approachLinear, cyclic, nlerp } from "../../lib/math/number";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { scene } from "../globals";
import { mxnFxBoil } from "../mixins/fx/mxn-fx-boil";
import { objCharacterRunner } from "./characters/obj-character-runner";
import { objFeatureFlags } from "./obj-feature-flags";
import { StepOrder } from "./step-order";

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
        angle: 0,
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

    const runnerCharacterObj = objCharacterRunner()
        .scaled(2, 2);

    const matrix = new Matrix();
    const point = new Point();

    return container(
        farNailObj,
        gfx,
        centerNailObj,
        runnerCharacterObj,
    )
        .autoSorted()
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
            const extendedUnit = Math.max(0, (api.visibleUnit - 0.5) * 2);
            farNailObj.y = nlerp(0, -length, extendedUnit);
            gfx.clear().lineStyle(5, 0xffffff).moveTo(0, 0);

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
            gfx.scale.y = extendedUnit;
        })
        .step(() => {
            const angle = cyclic(-api.angle, 0, 360);
            gfx.angle = angle * api.visibleUnit;
            farNailObj.x = 0;
            matrix.identity().rotate(angle * ToRad).apply(point.at(farNailObj), point);
            farNailObj.at(point);
            farNailObj.zIndex = Math.sign(farNailObj.y);

            runnerCharacterObj.objCharacterRunner.pedometer = angle / 8;
            runnerCharacterObj.at(farNailObj);
            runnerCharacterObj.zIndex = farNailObj.zIndex;

            farNailObj.visible = objFeatureFlags.singleton.isEnabled("PizzaSpin");
            runnerCharacterObj.visible = !farNailObj.visible;
        }, StepOrder.BeforeCamera);
}

const v = vnew();
