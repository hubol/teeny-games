import { Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Mzk } from "../../assets/music";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interp, interpv, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
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
            const dialogTextObj = objText.Large(hubolDialog.text, { tint: 0xD5321C, maxWidth: 200 })
                .anchored(0.5, 0.5)
                .show(hubolObj.objCharacter.speechObjs);
            const soundInstance = hubolDialog.sfx.playInstance();
            yield () => soundInstance.ended;
            dialogTextObj.destroy();

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
            Jukebox.play(Mzk.Title);
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

            Jukebox.applyGainRamp(Mzk.Title, 0, 1500);

            yield interpvr(self).translate(0, 100).over(500);

            const overlayObj = new Graphics().beginFill(0x6EA719).drawRect(0, 0, 500, 280).show();

            overlayObj.alpha = 0;
            yield interp(overlayObj, "alpha").steps(4).to(1).over(500);
            yield sleep(500);

            resetLottieProgress();
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnLibrary, { useGameplay: false }));
        })
        .show();
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
