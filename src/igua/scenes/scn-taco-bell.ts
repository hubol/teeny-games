import { Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Mzk } from "../../assets/music";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interp, interpv, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { SpriteAlphaMaskFilter } from "../../lib/pixi/filters/sprite-alpha-mask-filter";
import { Jukebox } from "../core/igua-audio";
import { Key, sceneStack } from "../globals";
import { getLottiePoints, lottieProgress, resetLottieProgress } from "../lottie-progress";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnCuesheet } from "../mixins/mxn-cuesheet";
import { scnLibrary } from "./scn-library";

const [txSkyline, txInterior, txTable, txHubol, txHubolFace, txHubolMouth] = Tx.Tbell.Scene0.split({ width: 500 });
const [txLottie, txLottieFace, txLottieMouth, txLottieSpeech, txHubolSpeech] = Tx.Tbell.Scene1.split({ width: 500 });

const consts = {
    hubolDialogs: [
        { text: "What'd you do this week bitch?", sfx: Sfx.TacoBell.Hubol0 },
        { text: "What you been up to girl?", sfx: Sfx.TacoBell.Hubol1 },
        { text: "What the hell have you been doing this week?", sfx: Sfx.TacoBell.Hubol2 },
        { text: "Anything good this week?", sfx: Sfx.TacoBell.Hubol3 },
    ],
};

export function scnTacoBell() {
    Jukebox.warm(Mzk.Rap);

    Sprite.from(txSkyline)
        .mixin(mxnBoilDisplacement, { rate: 0.0125, scale: 2 })
        .zIndexed(-999)
        .show();

    Sprite.from(txInterior).show();
    Sprite.from(txTable).show();

    const hubolObj = objCharacter("hubol").show();
    const lottieObj = objCharacter("lottie").show();

    let showRetryButton = false;

    container()
        .coro(function* () {
            yield sleep(1000);

            const hubolDialog = Rng.item(consts.hubolDialogs);
            showHubolSpeech(hubolDialog.text);
            const soundInstance = hubolDialog.sfx.playInstance();
            yield () => soundInstance.ended;
            clearHubolSpeech();

            yield sleep(500);

            const style0 = { tint: 0x546DFF };

            const points = getLottiePoints();

            const scoreObj = container(
                objText.Large(lottieProgress.score.library.booksCollected + " books", style0)
                    .anchored(1, 1)
                    .at(-30, 0),
                objText.Large(lottieProgress.score.library.fecesCollected + " brown", { tint: 0xA06614 })
                    .anchored(1, 1)
                    .at(-30, 20),
                objText.Large(lottieProgress.score.reading.goodWords + " good", style0)
                    .anchored(1, 1)
                    .at(80, -15),
                objText.Large(lottieProgress.score.reading.okWords + " ok", style0)
                    .anchored(1, 1)
                    .at(75, 10),
                objText.Large(lottieProgress.score.reading.badWords + " bad", style0)
                    .anchored(1, 1)
                    .at(98, 35),
                objPointsText(points.library.booksCollected)
                    .at(-28, 0),
                objPointsText(points.library.fecesCollected)
                    .at(-28, 20),
                objPointsText(points.reading.goodWords)
                    .at(82, -15),
                objPointsText(points.reading.okWords)
                    .at(77, 10),
                objPointsText(points.reading.badWords)
                    .at(100, 35),
                objText.Medium(`Total: ${points.total}pts`, { tint: 0xCB9EFF })
                    .anchored(0.5, 0)
                    .at(-1, 30),
                objText.Medium(`Total: ${points.total}pts`, style0)
                    .anchored(0.5, 0)
                    .at(0, 30),
            );
            scoreObj.show(lottieObj.objCharacter.speechObjs);

            scoreObj.children.forEach(obj => obj.invisible());

            for (const child of scoreObj.children) {
                yield sleep(250);
                const sfx = Rng.choose(
                    Sfx.TacoBell.Lottie0,
                    Sfx.TacoBell.Lottie1,
                    Sfx.TacoBell.Lottie2,
                    Sfx.TacoBell.Lottie3,
                    Sfx.TacoBell.Lottie4,
                );
                sfx.rate(0.95, 1.05).play();
                child.visible = true;
            }

            yield sleep(500);
            showRetryButton = true;
            Jukebox.play(Mzk.Rap);

            objElijah()
                .mixin(mxnCuesheet, Mzk.Rap, cueRap as any)
                .handles("cue:start", (self, message) => {
                    if (message.command === "hubol") {
                        lottieObj.objCharacter.speechObjs.removeAllChildren();
                        showHubolSpeech(message.data!);
                    }
                    if (message.command === "hmm") {
                        Sprite.from(Tx.Tbell.Hmm)
                            .at(369, 68)
                            .coro(function* (self) {
                                yield interpvr(self).translate(0, -100).over(1000);
                                self.destroy();
                            })
                            .show();
                    }
                    if (message.command === "elijah") {
                        self.objElijah.on = message.data === "on";
                    }
                    if (message.command === "lyrics") {
                        self.objElijah.lyrics = message.data!;
                        self.objElijah.nextArmPositions();
                    }
                })
                .handles("cue:end", (self, message) => {
                    if (message.command === "lyrics" && message.data === self.objElijah.lyrics) {
                        self.objElijah.lyrics = "";
                    }
                    if (message.command === "hubol") {
                        clearHubolSpeech();
                    }
                })
                .at(250, 0)
                .show();
        })
        .show();

    const retryMaskObj = Sprite.from(Tx.Tbell.RetryMask)
        .at(33, 172)
        .show();

    Sprite.from(Tx.Tbell.Retry)
        .at(177, 230)
        .filtered(new SpriteAlphaMaskFilter(retryMaskObj))
        .coro(function* (self) {
            yield () => showRetryButton;

            yield* Coro.all([
                interpvr(retryMaskObj).to(177, 227).over(1000),
                interpv(retryMaskObj.scale).to(1, 2).over(1000),
            ]);

            yield () => Key.justWentDown("Space");

            Jukebox.applyGainRamp(Mzk.Rap, 0, 1500);

            yield interpvr(self).translate(0, 100).over(500);

            const overlayObj = new Graphics().beginFill(0x6EA719).drawRect(0, 0, 500, 280).show();

            overlayObj.alpha = 0;
            yield interp(overlayObj, "alpha").steps(4).to(1).over(500);
            yield sleep(500);

            resetLottieProgress();
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnLibrary, { useGameplay: false }));
        })
        .show();

    function clearHubolSpeech() {
        hubolObj.objCharacter.speechObjs.removeAllChildren();
    }

    function showHubolSpeech(message: string) {
        objText.Large(message, { tint: 0xD5321C, maxWidth: 200 })
            .anchored(0.5, 0.5)
            .show(hubolObj.objCharacter.speechObjs);
    }
}

function objPointsText(value: Integer) {
    return objText.MediumBoldIrregular(
        `(${value}pts)`,
        { tint: value === 0 ? 0x808080 : (value < 0 ? 0xa00000 : 0x00a000) },
    )
        .pivoted(0, 2)
        .anchored(0, 1);
}

function objCharacter(mode: "hubol" | "lottie") {
    const txBody = mode === "hubol" ? txHubol : txLottie;
    const txFace = mode === "hubol" ? txHubolFace : txLottieFace;
    const txMouth = mode === "hubol" ? txHubolMouth : txLottieMouth;
    const txSpeech = mode === "hubol" ? txHubolSpeech : txLottieSpeech;
    const speechObjsPosition = mode === "hubol" ? vnew(235, 62) : vnew(255, 55);

    const api = {
        speechObjs: container().at(speechObjsPosition),
    };

    return container(
        Sprite.from(txBody),
        container(
            Sprite.from(txFace),
            Sprite.from(txMouth)
                .invisible()
                .coro(function* (self) {
                    while (true) {
                        yield () => api.speechObjs.children.length > 0;
                        self.visible = true;
                        yield sleep(250);
                        self.visible = false;
                        yield sleep(250);
                    }
                }),
        )
            .mixin(mxnBoilPivot),
        container(
            Sprite.from(txSpeech),
            api.speechObjs,
        )
            .invisible()
            .coro(function* (self) {
                while (true) {
                    yield () => api.speechObjs.children.length > 0;
                    self.y = 10;
                    self.visible = true;
                    yield interpvr(self).to(0, 0).over(750);
                    yield () => api.speechObjs.children.length <= 0;
                    self.visible = false;
                }
            }),
    )
        .merge({ objCharacter: api });
}

function objElijah() {
    let arm0: -1 | 0 | 1 = -1;
    let arm1: -1 | 0 | 1 = -1;

    const api = {
        on: false,
        lyrics: "",
        nextArmPositions() {
            arm0 = Rng.intc(-1, 1) as any;
            arm1 = Rng.intc(-1, 1) as any;
        },
    };

    const [txBody, txArm0, txArm1, txFace, txMouth] = Tx.Tbell.Elijah.split({ count: 5 });

    const txArms = [txArm0, txArm1];

    return container(
        Sprite.from(txArm0)
            .pivoted(0, 66)
            .step(self => {
                const arm = arm0;
                self.pivot.y = approachLinear(self.pivot.y, arm > -1 ? 0 : 66, 10);
                if (arm > -1) {
                    self.texture = txArms[arm];
                }
            }),
        Sprite.from(txArm0)
            .pivoted(142, 66)
            .at(142, 0)
            .scaled(-1, 1)
            .step(self => {
                const arm = arm1;
                self.pivot.y = approachLinear(self.pivot.y, arm > -1 ? 0 : 66, 10);
                if (arm > -1) {
                    self.texture = txArms[arm];
                }
            }),
        Sprite.from(txBody),
        container(
            Sprite.from(txFace),
            Sprite.from(txMouth)
                .invisible()
                .coro(function* (self) {
                    while (true) {
                        yield () => api.lyrics.length > 0;
                        self.visible = true;
                        yield sleep(214);
                        self.visible = false;
                        yield sleep(214);
                    }
                }),
        )
            .mixin(mxnBoilPivot),
        objText.XLargeIrregular("", { maxWidth: 440, align: "center" })
            .anchored(0.5, 0)
            .at(142, 190)
            .step(self => self.text = api.lyrics),
    )
        .step(self => self.pivot.y = approachLinear(self.pivot.y, api.on ? 0 : 178, 6))
        .pivoted(142, 178)
        .merge({ objElijah: api });
}

const cueRap = [
    [3.449, 3.449, "hmm", null],
    [6.892, 6.892, "hmm", null],
    [10.548, 12.279, "hubol", "Wait a minute... Isn't it your birthday?"],
    [26.582465, 26.582465, "elijah", "on"],
    [27.328766, 28.107515, "lyrics", "\"There's a girl"],
    [28.886264, 29.892148, "lyrics", "I must say"],
    [30.476209, 31.676781, "lyrics", "She's kind of perfect"],
    [31.676781, 33.266726, "lyrics", "And it's now her birthday"],
    [34.094147, 35.164926, "lyrics", "I see her future"],
    [35.781436, 36.803543, "lyrics", "I must say"],
    [37.517396, 38.620624, "lyrics", "A lot of kissing"],
    [38.766639, 40.178122, "lyrics", "Is coming her way"],
    [41.021766, 42.238561, "lyrics", "She's got a glow after all"],
    [42.676607, 43.92585, "lyrics", "Her femme nice and low for the dolls"],
    [43.92585, 44.99663, "lyrics", "She has her heart on her sleeve"],
    [44.99663, 46.213425, "lyrics", "On a shirt on her skin which is"],
    [46.213425, 47.381548, "lyrics", "Softer than a cotton ball"],
    [47.88449, 49.101285, "lyrics", "This girl serves looks in the mall"],
    [49.564116, 50.756126, "lyrics", "We wait for the novel, tell all"],
    [50.756126, 52.046378, "lyrics", "She is a woman who's loving"],
    [52.046378, 53.230725, "lyrics", "And caring and pretty and baby"],
    [53.230725, 54.123041, "lyrics", "Window to the wall\"\n-Elijah"],
    [54.642207, 54.642207, "elijah", "off"],
];
