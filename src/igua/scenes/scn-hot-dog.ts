import { Graphics, ILineStyleOptions, LINE_CAP, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { scene, sceneStack } from "../globals";
import { GenerativeMusicUtils } from "../lib/generative-music-utils";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnSpeaker } from "../mixins/mxn-speaker";
import { ObjKeyLocation, objKeyLocation } from "../objects/obj-key-location";
import { objSpriteMouth } from "../objects/obj-sprite-mouth";
import { scnOutro } from "./scn-outro";

const [txHubolBody, txHubolFace, txHubolMouth, txHubolMouthAgape, txHotDog] = Tx.HotDog.Scene.split({ count: 5 });

export function scnHotDog() {
    const hotDogObj = Sprite.from(txHotDog).at(0, 66);
    const hubolObj = objHotDogHubol().at(0, 238);

    const backgroundObj = container(
        hubolObj,
        hotDogObj,
    )
        .at(46, 0)
        .show();

    function* say(sfx: Sound) {
        const soundInstance = sfx.playInstance();
        const textObj = objText.XLargeIrregular(
            dialogSfxTexts.get(sfx) ?? "???",
            { align: "right", maxWidth: renderer.width },
        )
            .anchored(1, 0)
            .at(renderer.width, 0)
            .on("destroyed", () => soundInstance.stop())
            .show();
        hubolObj.mxnSpeaker.isSpeaking = true;
        yield () => soundInstance.isEnded;
        hubolObj.mxnSpeaker.isSpeaking = false;
        textObj.destroy();
    }

    scene.stage
        .coro(function* () {
            yield* Coro.all([
                interpvr(hubolObj).factor(factor.sine).to(0, 0).over(1000),
                Coro.chain([
                    sleep(500),
                    interpvr(hotDogObj).factor(factor.sine).to(0, 0).over(1000),
                ]),
            ]);

            const condimentsObj = objHotDogCondimentsControlled().show();

            yield* Coro.race([
                (function* () {
                    yield () => condimentsObj.objHotDogCondimentsControlled.condimentsUnit > 0;
                    while (true) {
                        yield sleep(2000);
                        const sfxs = condimentsObj.objHotDogCondimentsControlled.condimentsUnit > 0.6
                            ? [Sfx.Dialog.HotDog.Urgh, Sfx.Dialog.HotDog.UrghJustALittle, Sfx.Dialog.HotDog.More6]
                            : [
                                Sfx.Dialog.HotDog.INeedMore,
                                Sfx.Dialog.HotDog.IWantSomeMore,
                                Sfx.Dialog.HotDog.More5,
                                Sfx.Dialog.HotDog.More6,
                            ];
                        const sfx = Rng.item(sfxs);
                        yield* say(sfx);
                    }
                })(),
                () => condimentsObj.objHotDogCondimentsControlled.condimentsUnit >= 1,
            ]);

            Sfx.Advance.play();
            sceneStack.replace(scnOutro, { useGameplay: false });
        });
}

function objHotDogCondimentsControlled() {
    const condimentPressesStartedAt: Record<CondimentId, null | Integer> = {
        ketchup: null,
        mustard: null,
        onion: null,
        relish: null,
    };

    function mxnRecordPress(obj: ObjKeyLocation, condimentId: CondimentId) {
        return obj
            .step(() => {
                if (obj.objKeyLocation.isDown) {
                    if (condimentPressesStartedAt[condimentId] === null) {
                        condimentPressesStartedAt[condimentId] = scene.ticker.ticks;
                    }
                }
                else {
                    condimentPressesStartedAt[condimentId] = null;
                }
            });
    }

    const ketchupKeyObj = objKeyLocation({
        code: "KeyK",
    })
        .mixin(mxnRecordPress, "ketchup")
        .at(20, 20);

    const mustardKeyObj = objKeyLocation({
        code: "KeyM",
    })
        .mixin(mxnRecordPress, "mustard")
        .at(20, 70);

    const relishKeyObj = objKeyLocation({
        code: "KeyR",
    })
        .mixin(mxnRecordPress, "relish")
        .at(20, 120);

    const onionKeyObj = objKeyLocation({
        code: "KeyO",
    })
        .mixin(mxnRecordPress, "onion")
        .at(20, 170);

    function getPressedCondimentId(): CondimentId | null {
        let condimentId = Null<CondimentId>();
        let maximumStartedAt = -1;

        for (const key in condimentPressesStartedAt) {
            const value = (condimentPressesStartedAt as any)[key] as number | null;
            if (value !== null && value > maximumStartedAt) {
                condimentId = key as CondimentId;
                maximumStartedAt = value;
            }
        }

        return condimentId;
    }

    const condimentsObj = objHotDogCondiments()
        .step(self => {
            const condimentId = getPressedCondimentId();
            if (condimentId) {
                self.objHotDogCondiments.addCondiment(condimentId);
            }
        })
        .at(66, 216);

    const api = {
        get condimentsUnit() {
            return condimentsObj.objHotDogCondiments.condimentY / -220;
        },
    };

    return container(
        ketchupKeyObj,
        mustardKeyObj,
        relishKeyObj,
        onionKeyObj,
        condimentsObj,
    )
        .merge({ objHotDogCondimentsControlled: api });
}

function objHotDogHubol() {
    return container(
        Sprite.from(txHubolBody),
        container(
            Sprite.from(txHubolFace),
            objSpriteMouth([txHubolMouth, txHubolMouthAgape]),
        )
            .mixin(mxnBoilPivot),
    )
        .mixin(mxnSpeaker);
}

function objHotDogCondiments() {
    let lastCondimentObj = Null<ObjCondiment>();
    let condimentState: CondimentState = { x: 0, y: 0, direction: 1 };

    const condimentsObj = container();
    const condimentsPourGfx = new Graphics();

    let stepsSincePour = 999;

    const api = {
        addCondiment(id: CondimentId) {
            if (lastCondimentObj?.objCondiment?.condimentId !== id) {
                lastCondimentObj = objCondiment(condimentState, id).show(condimentsObj);
            }

            condimentState = lastCondimentObj.objCondiment.draw();
            condimentsPourGfx
                .clear()
                .lineStyle(condimentStyles[id].line)
                .moveTo(condimentState.x, -280)
                .lineTo(condimentState.x, condimentState.y);
            stepsSincePour = 0;
        },
        get condimentY() {
            return condimentState.y;
        },
    };

    return container(condimentsObj, condimentsPourGfx)
        .step(() => condimentsPourGfx.visible = stepsSincePour++ < 5)
        .coro(function* () {
            while (true) {
                yield onPrimitiveMutate(() =>
                    condimentsPourGfx.visible ? (lastCondimentObj?.objCondiment?.condimentId ?? "") : ""
                );
                if (condimentsPourGfx.visible && lastCondimentObj) {
                    condimentStyles[lastCondimentObj.objCondiment.condimentId].sfx.start.rate(0.9, 1.1).play();
                }
            }
        })
        .coro(function* () {
            while (true) {
                const f = Rng.intc(1, 4) * 3;
                yield holdf(() => condimentsPourGfx.visible, f);
                if (lastCondimentObj) {
                    condimentStyles[lastCondimentObj.objCondiment.condimentId].sfx.impact.rate(
                        GenerativeMusicUtils.getRate("major"),
                    ).play();
                }
            }
        })
        .merge({ objHotDogCondiments: api });
}

interface CondimentStyle {
    line: ILineStyleOptions;
    sfx: {
        start: Sound;
        impact: Sound;
    };
}

const condimentStyles: Record<CondimentId, CondimentStyle> = {
    ketchup: {
        line: {
            color: 0xf00000,
            cap: LINE_CAP.ROUND,
            width: 9,
        },
        sfx: {
            start: Sfx.HotDog.TinyFart,
            impact: Sfx.HotDog.Impact0,
        },
    },
    mustard: {
        line: {
            color: 0xf0cc00,
            cap: LINE_CAP.ROUND,
            width: 9,
        },
        sfx: {
            start: Sfx.HotDog.TinyFart,
            impact: Sfx.HotDog.Impact1,
        },
    },
    relish: {
        line: {
            cap: LINE_CAP.ROUND,
            width: 12,
            texture: NoAtlasTx.HotDog.Relish,
        },
        sfx: {
            start: Sfx.HotDog.TinyFart,
            impact: Sfx.HotDog.Impact2,
        },
    },
    onion: {
        line: {
            color: 0xfffbe2,
            cap: LINE_CAP.ROUND,
            texture: NoAtlasTx.HotDog.Onions,
            width: 15,
        },
        sfx: {
            start: Sfx.HotDog.TinyFart,
            impact: Sfx.HotDog.Impact3,
        },
    },
};

const condimentConsts = {
    lineSegmentInterval: 8,
    width: 340,
    arcHeight: 9,
};

function objCondiment(initialState: CondimentState, condimentId: CondimentId) {
    const gfx = new Graphics();
    let amount = 0;

    const api = {
        get condimentId() {
            return condimentId;
        },
        draw(): CondimentState {
            amount += 2 + Math.min(4, Math.round(amount / 100));
            const state = { ...initialState };
            gfx.clear();
            gfx.lineStyle(condimentStyles[condimentId].line);
            gfx.moveTo(state.x, state.y);

            let lineSegmentLength = amount;
            while (lineSegmentLength > 0) {
                const delta = Math.min(condimentConsts.lineSegmentInterval, lineSegmentLength);
                lineSegmentLength -= delta;
                const previousStateX = state.x;
                state.x = Math.max(0, Math.min(condimentConsts.width, state.x + delta * state.direction));
                const effectiveDelta = Math.abs(state.x - previousStateX);

                if (effectiveDelta > 0) {
                    const f = (amount - lineSegmentLength) / 5;
                    gfx.lineTo(
                        state.x + Math.round(Math.sin(f) * 2),
                        state.y + Math.round(Math.cos(f)),
                    );
                }

                if (effectiveDelta < delta) {
                    for (let y = 0; y < 1; y += 0.1) {
                        const x = Math.sin(y * Math.PI) * state.direction;
                        gfx.lineTo(state.x + x * condimentConsts.arcHeight, state.y - y * condimentConsts.arcHeight);
                    }

                    state.direction *= -1;
                    state.y -= condimentConsts.arcHeight;
                }
            }
            return state;
        },
    };

    return gfx
        .merge({ objCondiment: api });
}

type ObjCondiment = ReturnType<typeof objCondiment>;

type CondimentId = "ketchup" | "mustard" | "relish" | "onion";
interface CondimentState {
    x: number;
    y: number;
    direction: 1 | -1;
}

const dialogSfxTexts = new Map<Sound, string>();
dialogSfxTexts.set(Sfx.Dialog.HotDog.INeedMore, "I need more!");
dialogSfxTexts.set(Sfx.Dialog.HotDog.IWantSomeMore, "I want some more!");
dialogSfxTexts.set(Sfx.Dialog.HotDog.More5, "More, more, more, more, more!");
dialogSfxTexts.set(Sfx.Dialog.HotDog.More6, "More, more, more, more, more, more!");
dialogSfxTexts.set(Sfx.Dialog.HotDog.Urgh, "Urgh!");
dialogSfxTexts.set(Sfx.Dialog.HotDog.UrghJustALittle, "Urgh! Just a little bit more!");
