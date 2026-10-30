import { Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { factor, interpc, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { approachLinear, cyclic } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { AdjustColor } from "../../lib/pixi/adjust-color";
import { container } from "../../lib/pixi/container";
import { SpriteAlphaMaskFilter } from "../../lib/pixi/filters/sprite-alpha-mask-filter";
import { IguaAudio } from "../core/igua-audio";
import { scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";

const [txBackground, txClouds, txTitle, txChairs] = Tx.Background.split({ width: 640 });
const txsHubol = Tx.Hubol.split({ width: 320 });
const txsKirsi = Tx.Kirsi.split({ width: 290 });

export function scnPlaceholder() {
    new Graphics().beginFill(0x1e31d8).drawRect(0, 0, 640, 360).show();

    Sprite.from(Tx.Clouds)
        .pivoted(640, 0)
        .coro(function* (self) {
            while (true) {
                yield interpvr(self).to(640 * 2, 40).over(30_000);
                self.at(0, 0);
            }
        })
        .show();

    const mysteryObj = Sprite.from(Tx.Mystery)
        .mixin(mxnBoilPivot);

    new Graphics()
        .beginFill(0xffffff)
        .drawRect(0, 0, 640, 360)
        .coro(function* (self) {
            while (true) {
                for (let i = 0; i < 60; i++) {
                    const hue = i * 6;
                    self.tint = AdjustColor.hsv(cyclic(hue - 6, 0, 360), 50, 100).toPixi();
                    yield interpc(self, "tint").to(AdjustColor.hsv(hue, 50, 100).toPixi()).over(1000);
                }
            }
        })
        .step(self => {
            const hsv = AdjustColor.pixi(self.tint as number).toHsv();
            mysteryObj.tint = AdjustColor.hsv(cyclic(hsv.h + 180, 0, 360), 75, 90).toPixi();
        })
        .filtered(new SpriteAlphaMaskFilter(Sprite.from(Tx.Mask)))
        .show();

    mysteryObj.show();
    Sprite.from(Tx.Mall).show();

    container(
        objIndexedSprite(Tx.KirsiWalk.split({ count: 2 }).reverse())
            .step(self => self.textureIndex = (scene.ticker.ticks / 30) % 2)
            .at(-40, -10),
        objIndexedSprite(Tx.HubolWalk.split({ count: 2 }))
            .step(self => self.textureIndex = (scene.ticker.ticks / 30) % 2),
    )
        .at(690, 240)
        .coro(function* (self) {
            while (true) {
                yield interpvr(self.pivot).to(780, -40).over(20_000);
                yield sleep(10_000);
                self.pivot.at(0, 0);
            }
        })
        .show();

    return;
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
