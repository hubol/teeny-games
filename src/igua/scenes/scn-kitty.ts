import { BLEND_MODES, DisplayObject, Graphics, Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Cuesheet } from "../../lib/game-engine/audio/cuesheet";
import { Sound } from "../../lib/game-engine/audio/sound";
import { Instances } from "../../lib/game-engine/instances";
import { isOnScreen } from "../../lib/game-engine/logic/is-on-screen";
import { factor, interp, interpc, interpv, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { IguaAudio, Jukebox } from "../core/igua-audio";
import { renderer } from "../current-pixi-renderer";
import { Key, scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnCuesheet } from "../mixins/mxn-cuesheet";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";

const consts = {
    measure: {
        seconds: (60 / 126) * 8,
    },
};

export function scnKitty() {
    const lvl = Lvl.Kitty();

    {
        lvl.PlanetGroup.mixin(mxnBoilPivot);
    }

    {
        objKitty().at(lvl.KittyStartMarker).show();
    }

    {
        scene.stage
            .mixin(mxnCuesheet, Mzk.KittyOnTheRun, [
                [0, consts.measure.seconds * 1.75, "ufo", null],
                [0, consts.measure.seconds * 3.75, "ufo", null],
                [0, consts.measure.seconds * 5.75, "ufo", null],
                [0, consts.measure.seconds * 11.5, "ufo", null],
            ])
            .handles("cue:end", (_, message) => {
                if (message.command === "ufo" && Math.abs(message.delta) < 1) {
                    objUfo().show();
                }
            })
            .coro(function* () {
                Jukebox.warm(Mzk.KittyOnTheRun);
                yield sleep(250);
                for (let i = 0; i < 3; i++) {
                    Sfx.SwordLand.rate(1 + i / 3).play();
                    yield sleep(1000);
                }
                Jukebox.play(Mzk.KittyOnTheRun);
            });
    }

    {
        container()
            .mixin(mxnCuesheet, Mzk.KittyOnTheRun, [
                [0, consts.measure.seconds * 1, "treat", null],
                [0, consts.measure.seconds * 3, "treat", null],
                [0, consts.measure.seconds * 5, "treat", null],
                [0, consts.measure.seconds * 6, "treat", null],
                [0, consts.measure.seconds * 7, "treat", null],
                [0, consts.measure.seconds * 8, "treat", null],
                [0, consts.measure.seconds * 9, "treat", null],
                [0, consts.measure.seconds * 10, "treat", null],
                [0, consts.measure.seconds * 11, "treat", null],
            ])
            .handles("cue:end", (_, message) => {
                if (Math.abs(message.delta) < 0.3) {
                    objTreat().show();
                }
            })
            .show();
    }

    container(
        Sprite.from(Tx.Kitty.Overlay)
            .anchored(0.5, 0.5)
            .coro(function* (self) {
                self.blendMode = BLEND_MODES.SUBTRACT;
                while (true) {
                    yield sleep(Rng.intc(1000, 2000));
                    self.angle = Rng.int(2) * 180;
                    self.scale.x = Rng.intp();
                    self.scale.y = Rng.intp();
                }
            })
            .at(renderer.width / 2, renderer.height / 2),
    )
        .mixin(mxnBoilPivot)
        .zIndexed(1000)
        .show();
}

function objKitty() {
    let unit = 0;
    let nextRotation = 0;

    let jumpOffset = 0;
    let jumpSpeed = 0;

    let delta = 0;

    // @ts-ignore
    const cuesheet: Cuesheet<"verse" | "chorus"> = [
        [0, consts.measure.seconds * 2, "verse", null],
        [0, consts.measure.seconds * 4, "verse", null],
        [0, consts.measure.seconds * 6, "verse", null],
        [0, consts.measure.seconds * 8, "chorus", "0"],
        [0, consts.measure.seconds * 9, "chorus", "1"],
        [0, consts.measure.seconds * 10, "chorus", "2"],
        [0, consts.measure.seconds * 11, "chorus", "3"],
        [0, consts.measure.seconds * 12, "verse", null],
    ]
        .map(cue => {
            // @ts-ignore
            cue[0] -= consts.measure.seconds / 8;
            // @ts-ignore
            cue[1] -= consts.measure.seconds / 8;
            return cue;
        });

    let verseIndex = 0;
    let energy = 0;

    const analyser = IguaAudio.createAnalyser();
    const speechAnalyser = createSpeechAnalyser(analyser);

    function sing(sfx: Sound) {
        const instance = sfx.playInstance();
        instance.connect(analyser);
    }

    return objIndexedSprite(Tx.Kitty.Runnin.split({ count: 2 }))
        .pivoted(33, 62)
        .coro(function* (self) {
            const start = self.vcpy();
            const radius = 70;
            const origin = start.add(0, radius);

            self.step(() => {
                const run = Key.isDown("ControlLeft") ? 2 : 1;
                if (Key.isDown("ArrowLeft")) {
                    delta = approachLinear(delta, run, 0.05);
                }
                else if (Key.isDown("ArrowRight")) {
                    delta = approachLinear(delta, -run, 0.05);
                }
                else {
                    delta = approachLinear(delta, 0, 0.05);
                }
                if (Key.isDown("Space") && jumpOffset === 0) {
                    jumpSpeed = 4;
                }

                jumpOffset += jumpSpeed;
                jumpSpeed -= 0.3;
                if (jumpOffset <= 0) {
                    jumpOffset = 0;
                    jumpSpeed = 0;
                }

                unit += 0.005 * delta;

                nextRotation = (1 - Math.round(unit * 4) / 4) * Math.PI;
                const radians = unit * Math.PI;
                self.at(origin).add(vnew(Math.sin(radians), Math.cos(radians)), radius + jumpOffset);
            })
                .coro(function* (self) {
                    while (true) {
                        if (delta !== 0) {
                            self.textureIndex = (self.textureIndex + 1) % self.textures.length;
                            self.scale.x = Math.sign(delta);
                        }
                        self.rotation = nextRotation;
                        yield sleep(300);
                    }
                });
        })
        .step((self) => {
            const collided = self.collidesOne(Instances(objTreat));
            if (collided?.objTreat?.isActive) {
                collided.destroy();
                energy += 1;
            }
        })
        .mixin(mxnCuesheet, Mzk.KittyOnTheRun, cuesheet)
        .handles("cue:end", (_, message) => {
            if (Math.abs(message.delta) > 0.25 || energy <= 0) {
                return;
            }

            energy -= 1;

            if (message.command === "verse") {
                sing((Sfx.Song as Record<string, Sound>)["Verse" + (verseIndex % 4)]);
                verseIndex += 1;
            }
            else {
                verseIndex = 0;
                sing((Sfx.Song as Record<string, Sound>)["Chorus" + message.data!]);
            }
        })
        .coro(function* (self) {
            let value = 0;
            let target = 0;

            new Graphics()
                .beginFill(0x000000)
                .drawCircle(0, 0, 5)
                .step(self => {
                    const unit = speechAnalyser.speakingIntensity;
                    if (true || unit === 0 || unit === 1) {
                        target = unit;
                    }
                    value = approachLinear(value, target, 0.05);
                    const scale = Math.round(value * 3) / 2;
                    self.scale.set(scale, scale);
                })
                .show(self)
                .at(20, 33)
                .scaled(0, 0);
        })
        .coro(function* (self) {
            const collisionObj = new Graphics().beginFill(0xff0000).drawCircle(28, 27, 18).show(self).invisible();
            self.collisionShape(CollisionShape.DisplayObjects, [collisionObj]);
        })
        .coro(function* () {
            objUiVoice(() => energy).show();
        });
}

function objUiVoice(getValue: () => Integer) {
    const textObj = Sprite.from(Tx.Kitty.Voice).tinted(0x000000);
    const gfx = new Graphics();

    return container(
        textObj,
        gfx.at(80, 10),
    )
        .step(self => {
            if (!self.visible && getValue() > 0) {
                self.visible = true;
            }

            gfx.clear().beginFill(0xDB4373);
            for (let i = 0; i < getValue(); i++) {
                gfx.drawCircle(i * 28, 0, 10);
            }
        })
        .coro(function* () {
            while (true) {
                yield () => getValue() > 0;
                yield interpc(textObj, "tint").steps(3).to(0xDB4373).over(250);
                yield () => getValue() <= 0;
                yield sleep(250);
                yield interpc(textObj, "tint").steps(3).to(0x000000).over(333);
            }
        })
        .mixin(mxnBoilPivot)
        .invisible()
        .zIndexed(1001)
        .at(63, 226);
}

function objUfo() {
    return Sprite.from(Tx.Kitty.Ufo)
        .mixin(mxnBoilPivot)
        .mixin(mxnPlaceAndGlide);
}

function objTreat() {
    return Sprite.from(Tx.Kitty.Treat)
        .anchored(0.5, 0.5)
        .mixin(mxnPlaceAndGlide, "slow_first_half")
        .merge({ objTreat: { isActive: false } })
        .coro(function* (self) {
            yield sleep(200);
            self.objTreat.isActive = true;
        })
        .track(objTreat);
}

function mxnPlaceAndGlide(obj: DisplayObject, behavior: "default" | "slow_first_half" = "default") {
    return obj
        .coro(function* (self) {
            self.at(renderer.width / 2, renderer.height / 2);
            const unit = Rng.vunit();
            let length = Math.min(renderer.width, renderer.height) / 2;
            while (isOnScreen(self) && length < 500) {
                self.at(unit.vcpy().scale(length).add(renderer.width / 2, renderer.height / 2).vround());
                length += 8;
            }

            const target = unit.vcpy().scale(-600).add(renderer.width / 2, renderer.height / 2).vround();
            if (behavior === "slow_first_half") {
                yield interpvr(self).factor(factor.sine).to(renderer.width / 2, renderer.height / 2).over(3500);
                yield interpvr(self).factor(factor.sine).to(target).over(3000);
            }
            else {
                yield interpvr(self).factor(factor.sine).to(target).over(Rng.intc(5000, 9000));
            }
            self.destroy();
        });
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
