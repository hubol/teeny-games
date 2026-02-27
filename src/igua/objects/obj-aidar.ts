import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { layers } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { DataItem } from "./data-item";

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
                    yield sleep(Rng.intc(500, 700));
                    objFxSnooze().at(69, 60).show(self);
                    self.texture = txSleepyFace1;
                    yield sleep(Rng.intc(350, 550));
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
                if (heldItem.ref instanceof DataItem.Manifest.SmokeAlarm && heldItem.ref.state.triggered) {
                    state.isAsleep = false;
                    heldItem.ref = new DataItem.Manifest.SmokeAlarm({ ...heldItem.ref.state, triggered: false });
                }
                else {
                    layers.overlay.showError("Doesn't do anything.");
                }
            },
            boundsObj: maskObj,
        })
        .collisionShape(CollisionShape.DisplayObjects, [maskObj]);
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
