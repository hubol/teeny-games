import { Sprite, TilingSprite } from "pixi.js";
import { Mzk } from "../../assets/music";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { Coro } from "../../lib/game-engine/routines/coro";
import { factor, interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear, nlerp } from "../../lib/math/number";
import { container } from "../../lib/pixi/container";
import { Jukebox } from "../core/igua-audio";
import { Key, sceneStack } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";
import { scnLibrary } from "./scn-library";

export function scnTitle() {
    Jukebox.warm(Mzk.Title, Mzk.Library);
    Sprite.from(Tx.Library.BackgroundBarnesNoLabel).show();

    container()
        .coro(function* () {
            Sfx.Title.Appear.play();

            const lottieObj = objLottie().show();

            lottieObj.objLottie.agape = true;
            lottieObj.at(96, 100 + lottieObj.height);
            yield interpvr(lottieObj).factor(factor.sine).translate(0, -lottieObj.height).over(1000);

            Sfx.Title.Lottie.gain(0.8).play();

            const titleObj = objIndexedSprite(Tx.Title.Title.split({ count: 3 }))
                .anchored(0.5, 0.5)
                .at(250, 0)
                .step(self => self.textureIndex = (self.textureIndex + 0.1) % 3)
                .show();

            yield* Coro.all([
                interpvr(titleObj).factor(factor.sine).translate(0, 32).over(300),
                interp(lottieObj.objLottie, "armsExtendedUnit").to(1).over(300),
            ]);

            lottieObj.objLottie.agape = false;

            yield sleep(500);

            const subtitleObj = container()
                .at(250, 104)
                .pivoted(112, 37)
                .show();

            const subtitleTxs = Tx.Title.Subtitle.split({ count: 7 });
            const subtitleTimestamps = [0, .424, 1.038, 1.119, 1.489, 2.131, 2.582];

            const subtitleSoundInstance = Sfx.Title.Subtitle.playInstance();

            for (let i = 0; i < subtitleTimestamps.length; i++) {
                yield () =>
                    subtitleSoundInstance.ended
                    || subtitleSoundInstance.estimatedPlayheadPosition >= subtitleTimestamps[i];
                Sprite.from(subtitleTxs[i]).show(subtitleObj);
            }

            Jukebox.play(Mzk.Title);

            const pressSpaceObj = new TilingSprite(NoAtlasTx.Title.PressSpace, 500, 20)
                .at(500, 260)
                .step(self => {
                    if (self.x <= 0) {
                        self.tilePosition.x -= 2;
                    }
                    self.x = approachLinear(self.x, 0, 2);
                })
                .show();

            yield () => pressSpaceObj.x <= 480 && Key.justWentDown("Space");

            Jukebox.applyGainRamp(Mzk.Title, 0, 1000);
            Sfx.Title.Space.play();

            lottieObj.objLottie.agape = true;

            titleObj.destroy();
            subtitleObj.destroy();
            pressSpaceObj.destroy();

            yield interpvr(lottieObj).factor(factor.sine).translate(0, 200).over(500);

            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnLibrary, { useGameplay: true }));
        })
        .show();
}

function objLottie() {
    const [txBody, txFace, txFaceAgape, txArms] = Tx.Title.Lottie.split({ count: 4 });

    const api = {
        agape: false,
        armsExtendedUnit: 0,
    };

    const faceObj = Sprite.from(txFace)
        .mixin(mxnBoilPivot)
        .step(self => self.texture = api.agape ? txFaceAgape : txFace);

    const armsObj = Sprite.from(txArms)
        .step(self => self.y = Math.round(nlerp(75, 0, api.armsExtendedUnit)));

    return container(
        Sprite.from(txBody),
        faceObj,
        armsObj,
    )
        .merge({ objLottie: api });
}
