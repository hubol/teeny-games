import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { factor, interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { ForceTintFilter } from "../../lib/pixi/filters/force-tint-filter";
import { Key } from "../globals";
import { mxnActionRepeater } from "../mixins/mxn-action-repeater";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";

const [txBackground, txClouds, txTitle, txChairs] = Tx.Background.split({ width: 640 });
const txsHubol = Tx.Hubol.split({ width: 320 });
const txsKirsi = Tx.Kirsi.split({ width: 290 });

export function scnPlaceholder() {
    Sprite.from(txBackground).show();
    new TilingSprite(txClouds, 640, 360)
        .step(self => {
            if (Rng.float() > 0.8) {
                self.tilePosition.x += 1;
            }
        })
        .show();
    Sprite.from(txTitle).mixin(mxnBoilPivot).show();
    Sprite.from(txChairs).show();
    objCharacter(txsHubol).at(320, 0).show();
    objCharacter(txsKirsi).show();
}

function objCharacter(
    [txBody, txHeadphones, txPupils, txMouthClosed, txMouthOpen0, txMouthOpen1, txEyesClosed]: Texture[],
) {
    const pupilObj = Sprite.from(txPupils);
    const mouthObj = Sprite.from(txMouthClosed);
    return container(
        Sprite.from(txBody),
        Sprite.from(txHeadphones)
            .mixin(mxnBoilPivot),
        pupilObj
            .coro(function* (self) {
                while (true) {
                    yield sleep(Rng.int(500, 2000));
                    yield interpvr(self.pivot)
                        .factor(factor.sine)
                        .to(Rng.vunit().scale(Rng.float(5, 13), Rng.float(1, 6)).vround())
                        .over(Rng.int(500, 2000));
                }
            }),
        mouthObj.mixin(mxnBoilPivot),
    );
}
