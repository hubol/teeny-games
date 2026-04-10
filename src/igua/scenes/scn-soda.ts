import { Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound, SoundInstance } from "../../lib/game-engine/audio/sound";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interpv } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vequals } from "../../lib/math/vector";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { scene, sceneStack } from "../globals";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { ObjKeyLocation, objKeyLocation } from "../objects/obj-key-location";
import { objSodaCup } from "../objects/obj-soda-cup";
import { scnDressMy } from "./scn-dress-my";

const [txDispenserBack, txDispenserTriggers, txDispenserLabels] = Tx.Soda.Dispenser.split({ count: 3 });

const txsPour = Tx.Soda.Pour.split({ count: 3 });

type FillId = "coke" | "diet_coke" | "coke_zero" | "sprite" | "ice";

export function scnSoda() {
    Sprite.from(Tx.Soda.Background).mixin(mxnBoilDisplacement).show();
    Sprite.from(txDispenserBack).show();
    Sprite.from(txDispenserTriggers).show();

    const sodaCupObj = objSodaCup().at(250, 310).show();

    const fillCounts: Record<FillId, Integer> = {
        coke: 0,
        coke_zero: 0,
        diet_coke: 0,
        ice: 0,
        sprite: 0,
    };

    const fillIds = Object.keys(fillCounts) as Array<FillId>;

    function mxnFillWith(obj: ObjKeyLocation, id: FillId, fill: objSodaCup.Fill) {
        let stepsSincePour = 999;

        if (fill.kind === "soda") {
            let pourSoundInstance = Null<SoundInstance>();

            const pourObj = Sprite.from(txsPour[0])
                .anchored(0.5, 0.2)
                .filtered(sodaCupObj.objSodaCup.maskFilter)
                .tinted(fill.tint)
                .mixin(mxnBoilPivot)
                .coro(function* (self) {
                    while (true) {
                        yield sleepf(Rng.intc(5, 8));
                        self.texture = Rng.item(txsPour);
                    }
                })
                .scaled(0, 0)
                .coro(function* (self) {
                    while (true) {
                        yield () => stepsSincePour < 5;
                        const soundInstance = Sfx.Soda.Fill.loop().playInstance();
                        pourSoundInstance = soundInstance;
                        yield interpv(self.scale).steps(3).to(1, 1).over(333);
                        yield () => stepsSincePour > 10;
                        soundInstance.stop();
                        yield interpv(self.scale).steps(3).to(0, 0).over(200);
                    }
                })
                .on("destroyed", () => pourSoundInstance?.stop())
                .show();

            obj.coro(function* () {
                pourObj.at(obj).add(0, 165);
            });
        }
        else {
            obj
                .coro(function* () {
                    while (true) {
                        yield () => stepsSincePour < 5;
                        Sfx.Soda.IceMachine.rate(0.9, 1.1).play();
                        yield sleep(Rng.int(200, 300));
                    }
                });
        }

        return obj
            .handles("objKeyLocation:down", (self) => {
                const targetPosition = self.vcpy().add(0, 255);
                sodaCupObj.moveTowards(targetPosition, 9);
                if (vequals(targetPosition, sodaCupObj)) {
                    fillCounts[id]++;
                    stepsSincePour = 0;
                    sodaCupObj.objSodaCup.fillWith(fill);

                    if (fill.kind === "ice") {
                        if (scene.ticker.ticks % 5 === 2) {
                            let speed = Rng.intc(6, 10);
                            Sprite.from(Tx.Soda.IceCube)
                                .anchored(0.5, 0.5)
                                .angled(Rng.float(360))
                                .scaled(Rng.intp(), Rng.intp())
                                .at(self)
                                .add(Rng.intc(-40, 40), Rng.intc(-10, 10))
                                .step(self => {
                                    self.y += speed;
                                    if (scene.ticker.ticks % 8 === 0) {
                                        speed += 1;
                                    }
                                    if (self.y >= 300) {
                                        self.destroy();
                                    }
                                })
                                .coro(function* (self) {
                                    yield () => self.y >= 194;
                                    self.filtered(sodaCupObj.objSodaCup.maskFilter);
                                    sodaCupObj.objSodaCup.splash();
                                })
                                .show(iceCubesObj);
                        }
                    }
                }
            })
            .step(() => stepsSincePour++);
    }

    Sprite.from(txDispenserLabels).show();

    const iceCubesObj = container().show();

    Sprite.from(Tx.Soda.DispenserFront).show();

    const cokeKeyObj = objKeyLocation({
        code: "KeyC",
    })
        .mixin(mxnFillWith, "coke", { kind: "soda", tint: 0x2c1507 })
        .at(50, 48)
        .show();

    const dietCokeKeyObj = objKeyLocation({
        code: "KeyD",
    })
        .mixin(mxnFillWith, "diet_coke", { kind: "soda", tint: 0x2c1507 })
        .at(144, 48)
        .show();

    const cokeZeroKeyObj = objKeyLocation({
        code: "KeyZ",
    })
        .mixin(mxnFillWith, "coke_zero", { kind: "soda", tint: 0x2c1507 })
        .at(352, 48)
        .show();

    const spriteKeyObj = objKeyLocation({
        code: "KeyS",
    })
        .mixin(mxnFillWith, "sprite", { kind: "soda", tint: 0xe7fa7d })
        .at(447, 48)
        .show();

    const iceKeyObj = objKeyLocation({
        code: "KeyI",
    })
        .mixin(mxnFillWith, "ice", { kind: "ice" })
        .at(250, 48)
        .show();

    scene.stage
        .coro(function* () {
            let requestsCount = 0;
            let requestSoundInstance = Null<SoundInstance>();
            let lastRequestFillId = Null<FillId>();

            const textObj = objText.XLargeIrregular("", { maxWidth: renderer.width, tint: 0xD15144 })
                .anchored(0, 1)
                .at(0, 280)
                .show();

            function* request(id: FillId) {
                lastRequestFillId = id;
                const requiredFillCount = getRequiredFillCount(id, requestsCount);
                const [sfx, text] = requestsCount === 0 ? fillDialogs[id][0] : Rng.item(fillDialogs[id]);

                requestsCount += 1;

                fillCounts[id] = 0;

                yield* Coro.race([
                    (function* () {
                        while (true) {
                            const soundInstance = sfx.playInstance();
                            textObj.text = text;
                            requestSoundInstance = soundInstance;
                            yield () => soundInstance.isEnded;
                            textObj.text = "";
                            yield sleep(2000);
                        }
                    })(),
                    () => fillCounts[id] >= requiredFillCount,
                ]);

                Sfx.Advance.play();
                requestSoundInstance?.stop();
                textObj.text = "";

                yield sleep(Math.max(125, 2000 - requestsCount * 250));
            }

            yield sleep(2000);

            for (let i = 0; i < 3; i++) {
                const shuffledFillIds = Rng.shuffle(fillIds.filter(id => id !== lastRequestFillId));
                for (const fillId of shuffledFillIds) {
                    yield* request(fillId);
                }
            }

            sceneStack.replace(scnDressMy, { useGameplay: false });
        });
}

function getRequiredFillCount(id: FillId, requestsCount: Integer) {
    if (id === "ice") {
        return Math.max(30, 90 - requestsCount * 10);
    }
    return Math.max(10, 95 - requestsCount * 5);
}

const fillDialogs: Record<FillId, Array<[sfx: Sound, text: string]>> = {
    coke: [
        [Sfx.Dialog.Soda.ImDyingForA, "I'm dying for a Coke!"],
        [Sfx.Dialog.Soda.ActuallySomeRegularCoke, "Actually, some regular Coke sounds good..."],
    ],
    coke_zero: [
        [Sfx.Dialog.Soda.CokeZeroIDesperatelyNeedIt, "Coke Zero... I desperately need it!"],
        [Sfx.Dialog.Soda.MaybeJustALittle, "Maybe a little Coke Zero... just for fun?"],
    ],
    diet_coke: [
        [Sfx.Dialog.Soda.ILoveTheUnrecognizable, "I love the unrecognizeable flavor of Diet Coke!"],
        [Sfx.Dialog.Soda.IveBeenMeaningTo, "I've been meaning to try Diet Coke!"],
    ],
    ice: [
        [Sfx.Dialog.Soda.MansGottaHaveSome, "Man's gotta have some ice!"],
        [Sfx.Dialog.Soda.CantGoWrongWith, "Can't go wrong with ice!"],
        [Sfx.Dialog.Soda.IThinkItNeeds, "I think it needs a little more ice!"],
    ],
    sprite: [
        [Sfx.Dialog.Soda.IThinkSomeLemon, "I think some lemon-lime would go so hard right now!"],
        [Sfx.Dialog.Soda.MaybeJustASplash, "Maybe just a splash of Sprite!"],
    ],
};
