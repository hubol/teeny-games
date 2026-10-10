import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { IguaAudio } from "../core/igua-audio";
import { scene } from "../globals";
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
    objCharacter(txsHubol)
        .mixin(mxnCharacterSpeak, Sfx.Hubol)
        .at(320, 0)
        .show();
    objCharacter(txsKirsi)
        .mixin(mxnCharacterSpeak, Sfx.Kirsi)
        .show();
    const podcastSfx = Sfx.Podcast.playInstance();

    new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, 640, 360)
        .invisible()
        .coro(function* (self) {
            self.alpha = 0.2;
            yield () => podcastSfx.estimatedPlayheadPosition >= 153;
            for (let i = 0; i < 2; i++) {
                self.visible = true;
                yield sleepf(10);
                self.visible = false;
                yield sleepf(10);
            }
        })
        .show();
}

function objCharacter(
    [txBody, txHeadphones, txPupils, txMouthClosed, txMouthOpen0, txMouthOpen1, txEyesClosed]: Texture[],
) {
    let mouthAgapeUnit = 0;
    const mouthObj = objIndexedSprite([txMouthClosed, txMouthOpen0, txMouthOpen1]);
    const api = {
        get mouthAgapeUnit() {
            return mouthAgapeUnit;
        },
        set mouthAgapeUnit(value) {
            mouthAgapeUnit = value;
            if (value === 0) {
                mouthObj.textureIndex = 0;
                return;
            }
            mouthObj.textureIndex = Math.ceil(value * 2);
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

function mxnCharacterSpeak(obj: objCharacter.Type, sfx: Sound) {
    const instance = sfx.gain(0).playInstance();
    const analyser = IguaAudio.createAnalyser();
    instance.connect(analyser);
    const speechAnalyser = createSpeechAnalyser(analyser);

    return obj
        .step(self => {
            const target = speechAnalyser.speakingIntensity > 0.05
                ? ((Math.sin(scene.ticker.ticks / 5) + 1) / 2 + 0.1)
                : 0;
            self.objCharacter.mouthAgapeUnit = approachLinear(self.objCharacter.mouthAgapeUnit, target, 0.05);
        });
}

namespace objCharacter {
    export type Type = ReturnType<typeof objCharacter>;
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
