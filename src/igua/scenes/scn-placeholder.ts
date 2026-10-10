import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { factor, interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { ForceTintFilter } from "../../lib/pixi/filters/force-tint-filter";
import { Key } from "../globals";
import { mxnActionRepeater } from "../mixins/mxn-action-repeater";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";

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
    const mouthObj = objIndexedSprite([txMouthClosed, txMouthOpen0, txMouthOpen1]);
    const api = {
        get mouthAgapeUnit() {
            return mouthObj.textureIndex / mouthObj.textures.length;
        },
        set mouthAgapeUnit(value) {
            mouthObj.textureIndex = value * mouthObj.textures.length;
        },
    };

    const pupilObj = Sprite.from(txPupils);
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
        Sprite.from(txEyesClosed)
            .invisible()
            .coro(function* (self) {
                while (true) {
                    yield sleep(Rng.int(2000, 10000));
                    const count = Rng.float() > 0.8 ? 2 : 1;
                    for (let i = 0; i < count; i++) {
                        self.visible = true;
                        yield sleepf(10);
                        self.visible = false;
                        yield sleepf(10);
                    }
                }
            })
            .step(self => {
                pupilObj.visible = !self.visible;
            }),
        mouthObj.mixin(mxnBoilPivot),
    )
        .merge({ objCharacter: api });
}

function createSpeechAnalyser(analyser: AnalyserNode) {
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 1;

    const bufferLength = analyser.frequencyBinCount;
    const data = new Uint8Array(bufferLength);

    function getSpeakingIntensity() {
        analyser.getByteTimeDomainData(data);
        let delta = 0;
        for (const item of data) {
            delta += Math.abs(item - 128);
        }

        return Math.min(1, Math.max(0, (delta - 700) / 8000));
    }

    return {
        get speakingIntensity() {
            return getSpeakingIntensity();
        },
    };
}
