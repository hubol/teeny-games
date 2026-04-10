import { Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { Coro } from "../../lib/game-engine/routines/coro";
import { factor, interp, interpv, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { scene, sceneStack } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnSpeaker } from "../mixins/mxn-speaker";
import { objKeyLocation } from "../objects/obj-key-location";
import { objSpriteMouth } from "../objects/obj-sprite-mouth";
import { scnSoda } from "./scn-soda";

export function scnIntro() {
    type SpeakerObj = typeof hubolObj | typeof ladyObj;

    function* speak(speakerObj: SpeakerObj, sfx: Sound) {
        const text = dialogSfxTexts.get(sfx) ?? "? No dialog ?";
        const textObj = objText.XLargeIrregular(text, { maxWidth: renderer.width })
            .at(0, 0)
            .show();
        speakerObj.mxnSpeaker.isSpeaking = true;
        const soundInstance = speakerObj.playInstance(sfx);
        yield () => soundInstance.isEnded;
        speakerObj.mxnSpeaker.isSpeaking = false;
        textObj.destroy();
    }

    const hubolObj = objIntroHubol().at(21, 72).show();
    const ladyObj = objIntroLady().at(500, 3).show();

    scene.stage
        .coro(function* () {
            yield sleep(2000);
            yield interpvr(ladyObj).translate(-230, 0).over(1000);
            yield* Coro.all([
                speak(ladyObj, Sfx.Dialog.Intro.DoYouWantMyExtra),
                interpv(hubolObj.objIntroHubol.lookingVector).to(1, 0).over(1000),
                Coro.chain([sleep(1000), () => (ladyObj.objIntroLady.hotDogState = "revealed", true)]),
                Coro.chain([sleep(1700), () => (ladyObj.objIntroLady.sodaState = "revealed", true)]),
            ]);

            yield sleep(300);

            hubolObj.objIntroHubol.isHandRaised = false;
            yield* speak(hubolObj, Sfx.Dialog.Intro.OhYesPleaseThank);
            yield* speak(hubolObj, Sfx.Dialog.Intro.EvenThoughItsSuch);
            yield* speak(ladyObj, Sfx.Dialog.Intro.ItsFineItWould);
            yield* speak(ladyObj, Sfx.Dialog.Intro.MaybeJustMakeSomeone);

            const hotDogKeyObj = objKeyLocation({
                code: "KeyH",
            })
                .at(359, 244)
                .show();

            const sodaKeyObj = objKeyLocation({
                code: "KeyS",
            })
                .at(302, 55)
                .show();

            yield* Coro.all([
                Coro.chain([
                    () => hotDogKeyObj.objKeyLocation.pressesCount > 0,
                    () => (hotDogKeyObj.destroy(), ladyObj.objIntroLady.hotDogState = "given", true),
                ]),
                Coro.chain([
                    () => sodaKeyObj.objKeyLocation.pressesCount > 0,
                    () => (sodaKeyObj.destroy(), ladyObj.objIntroLady.sodaState = "given", true),
                ]),
            ]);

            yield sleep(1000);

            sceneStack.replace(scnSoda, { useGameplay: false });
        });
}

function objIntroHubol() {
    const [txTorso, txScleras, txPupils, txMouth, txMouthAgape, txHand, txComputer] = Tx.Intro.Hubol.split({
        width: 208,
    });

    const api = {
        isHandRaised: true,
        lookingVector: vnew(),
    };

    return container(
        Sprite.from(txTorso),
        container(
            Sprite.from(txScleras).step(self => self.pivot.at(api.lookingVector, -2).vround()),
            Sprite.from(txPupils).step(self => self.pivot.at(api.lookingVector, -20).vround()),
            objSpriteMouth([txMouth, txMouthAgape]),
        )
            .mixin(mxnBoilPivot)
            .step(self => self.at(api.lookingVector, 6).vround()),
        Sprite.from(txHand)
            .coro(function* (self) {
                while (true) {
                    yield () => api.isHandRaised;
                    yield interpvr(self.pivot).to(Rng.intc(-5, 5), -Rng.intc(15, 40)).over(Rng.intc(200, 500));
                    self.play(Rng.choose(Sfx.Intro.Beep, Sfx.Intro.Boop).rate(0.9, 1.1));
                    yield sleepf(Rng.intc(4, 10));
                    yield interpvr(self.pivot).to(0, 0).over(Rng.intc(200, 500));
                    yield sleepf(Rng.intc(4, 10));
                }
            })
            .step(self => self.y = approachLinear(self.y, api.isHandRaised ? 0 : 130, 1)),
        Sprite.from(txComputer),
    )
        .mixin(mxnSpeaker)
        .merge({ objIntroHubol: api });
}

function objIntroLady() {
    type ItemState = "hidden" | "revealed" | "given";
    const [txTorso, txEyes, txMouth, txMouthAgape, txHotDogArm, txHotDog, txSodaArm, txSoda] = Tx.Intro.Lady.split({
        width: 230,
    });

    const api = {
        hotDogState: "hidden" as ItemState,
        sodaState: "hidden" as ItemState,
    };

    return container(
        Sprite.from(txTorso),
        Sprite.from(txEyes).mixin(mxnBoilPivot),
        objSpriteMouth([txMouth, txMouthAgape]),
        container(
            Sprite.from(txHotDogArm),
            Sprite.from(txHotDog)
                .coro(function* (self) {
                    yield () => api.hotDogState === "given";
                    Sfx.Advance.play();
                    yield interpvr(self).factor(factor.sine).to(-200, -30).over(600);
                    yield interp(self, "alpha").steps(3).to(0).over(333);
                }),
        )
            .at(230, 0)
            .coro(function* (self) {
                yield () => api.hotDogState !== "hidden";
                yield interpvr(self).to(0, 0).over(300);
                yield () => api.hotDogState === "given";
                yield sleep(1000);
                yield interpvr(self).to(230, 0).over(750);
            }),
        container(
            Sprite.from(txSodaArm),
            Sprite.from(txSoda)
                .coro(function* (self) {
                    yield () => api.sodaState === "given";
                    Sfx.Advance.play();
                    yield interpvr(self).factor(factor.sine).to(-180, 150).over(600);
                    yield interp(self, "alpha").steps(3).to(0).over(333);
                }),
        )
            .at(230, 0)
            .coro(function* (self) {
                yield () => api.sodaState !== "hidden";
                yield interpvr(self).to(0, 0).over(300);
                yield () => api.sodaState === "given";
                yield sleep(1000);
                yield interpvr(self).to(230, 0).over(750);
            }),
    )
        .mixin(mxnSpeaker)
        .merge({ objIntroLady: api });
}

const dialogSfxTexts = new Map<Sound, string>();
dialogSfxTexts.set(Sfx.Dialog.Intro.DoYouWantMyExtra, "Do you want my extra hot dog and soda?");
dialogSfxTexts.set(Sfx.Dialog.Intro.EvenThoughItsSuch, "Even though it's such a little thing, it really means a lot!");
dialogSfxTexts.set(Sfx.Dialog.Intro.ItsFineItWould, "It's fine. It would be a hassle to return it.");
dialogSfxTexts.set(Sfx.Dialog.Intro.MaybeJustMakeSomeone, "Maybe just make someone smile today.");
dialogSfxTexts.set(Sfx.Dialog.Intro.OhYesPleaseThank, "Oh, yes, please! Thank you so much!");
