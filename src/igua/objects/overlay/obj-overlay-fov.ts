import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { blendColor } from "../../../lib/color/blend-color";
import { factor, interp } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoilDisplacement } from "../../mixins/fx/mxn-fx-boil-displacement";

export function objOverlayFov() {
    const gfx = new Graphics()
        .beginFill(0xffffff)
        .drawRect(-1024, 0, 1024, 1024)
        .drawRect(1024, 0, 1024, 1024);
    const fovInnerObj = Sprite.from(Tx.Overlay.FovInner)
        .anchored(0.5, 0.5)
        .at(512, 512)
        .step(self => self.angle += 0.02);
    const fovObj = Sprite.from(Tx.Overlay.Fov);

    let tint = 0xffffff;

    const api = {
        get tint() {
            return tint;
        },
        set tint(value) {
            tint = value;
            gfx.tint = tint;
            fovObj.tint = tint;
            fovInnerObj.tint = blendColor(tint, 0xffffff, 0.5);
        },
    };

    return container(fovInnerObj, gfx, fovObj)
        .mixin(mxnFxBoilDisplacement)
        .merge({ objOverlayFov: api })
        .pivoted(512, 512)
        .coro(function* (self) {
            while (true) {
                yield sleep(Rng.intc(500, 1000));
                yield interp(self.mxnBoilDisplacement, "scale")
                    .to(Rng.intc(5, 50))
                    .over(Rng.intc(500, 1000));
            }
        });
}
