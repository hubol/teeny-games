import { Graphics, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { layers } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { DataItem } from "./data-item";
import { objItem } from "./obj-item";
import { objIndexedSprite } from "./utils/obj-indexed-sprite";

const [txSleepyBody, txSleepyFace0, txSleepyFace1, txShockedBody, txShockedFace, ...txsShockedFx] = Tx.Character
    .AidarSleeping.split({ count: 8 });
const [txBody, txFace] = Tx.Character.Aidar.split({ count: 2 });

export function objAidar() {
    const state = {
        isAsleep: true,
    };
    const maskObj = new Graphics()
        .beginFill(0xff0000)
        .drawRect(40, 59, 104, 45)
        .invisible();

    return container(
        Sprite.from(txSleepyBody).mixin(mxnBoilPivot),
        Sprite.from(txSleepyFace0)
            .coro(function* (self) {
                while (true) {
                    self.texture = txSleepyFace0;
                    yield sleep(Rng.intc(850, 950) + 400);
                    const soundInstance = self.playInstance(Rng.choose(Sfx.Snore0, Sfx.Snore1).rate(1, 1.02));
                    soundInstance.gain *= 0.4;
                    objFxSnooze().at(69, 60).show(self);
                    self.texture = txSleepyFace1;
                    yield sleep(Rng.intc(650, 850) + 400);
                }
            }),
        maskObj,
    )
        .mixin(mxnInteractive, {
            text: (item) => {
                if (item instanceof DataItem.Manifest.SmokeAlarm && item.state.triggered) {
                    return "Wake up Aidar";
                }
                return state.isAsleep ? "Aidar, Asleep" : "Aidar";
            },
            interact(heldItem) {
                if (!state.isAsleep) {
                    return;
                }
                if (heldItem.ref instanceof DataItem.Manifest.SmokeAlarm && heldItem.ref.state.triggered) {
                    state.isAsleep = false;
                    heldItem.ref = new DataItem.Manifest.SmokeAlarm({ ...heldItem.ref.state, triggered: false });
                }
                else {
                    layers.overlay.showError("Doesn't wake him.");
                }
            },
            boundsObj: maskObj,
        })
        .collisionShape(CollisionShape.DisplayObjects, [maskObj])
        .coro(function* (self) {
            self.zIndex += 1;
            const whiskyObj = objItem("Whisky").at(self).add(90, 20).show();
            yield () => !state.isAsleep;
            self.play(Sfx.Shock);
            self.mxnInteractive.enabled = false;
            self.removeAllChildren();
            const shockedObj = container(
                Sprite.from(txShockedBody).mixin(mxnBoilPivot),
                Sprite.from(txShockedFace).mixin(mxnBoilPivot),
                objIndexedSprite(txsShockedFx)
                    .mixin(mxnBoilPivot)
                    .step(self => {
                        self.textureIndex = (self.textureIndex + 0.125) * 1.1;
                        if (self.textureIndex >= 3.5) {
                            self.destroy();
                        }
                    }),
            )
                .coro(function* (self) {
                    yield interpvr(self).factor(factor.sine).to(0, -8).over(300);
                    yield interpvr(self).to(0, 0).over(120);
                })
                .show(self);

            yield sleep(400);

            shockedObj.destroy();
            const bodyObj = Sprite.from(txBody).show(self);
            Sprite.from(txFace).mixin(mxnBoilPivot).show(self);
            self.mxnInteractive.enabled = true;
            self.collisionShape(CollisionShape.DisplayObjects, [bodyObj]);
            self.mxnInteractive.boundsObj = bodyObj;
            self.mxnInteractive.interact = () => {
                if (whiskyObj.destroyed) {
                    return;
                }
                layers.overlay.showInfo("Sure, take whisky!");
                whiskyObj.objItem.item.ref = new DataItem.Manifest.Whisky({ hasPermission: true });
            };
        });
}

function objFxSnooze() {
    return Sprite.from(Tx.Fx.ZSmall)
        .anchored(0.5, 0.5)
        .coro(function* (self) {
            yield sleep(200);
            self.texture = Tx.Fx.Z;
            yield sleep(500);
            self.texture = Tx.Fx.ZSmall;
            yield sleep(200);
            self.alpha = 0.5;
            yield sleep(200);
            self.destroy();
        })
        .coro(function* (self) {
            yield interpvr(self).translate(Rng.intc(-20, 20), Rng.intc(-80, -100)).over(Rng.intc(1100, 1500));
        });
}
