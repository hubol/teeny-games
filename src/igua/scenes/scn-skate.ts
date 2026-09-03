import { Graphics, Sprite } from "pixi.js";
import { Lvl, LvlType } from "../../assets/generated/levels/generated-level-data";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { blendColor } from "../../lib/color/blend-color";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interp, interpv, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { vdir } from "../../lib/math/vector";
import { Vector, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { ZIndex } from "../core/scene/z-index";
import { scene, sceneStack } from "../globals";
import { mxnCameraSubject } from "../mixins/mxn-camera-subject";
import { mxnPhysics } from "../mixins/mxn-physics";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { objFxHeart } from "../objects/fx/obj-fx-heart";
import { StepOrder } from "../objects/step-order";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";
import { DollPointer } from "../utils/doll-pointer";
import { scnDesigner } from "./scn-designer";

export function scnSkate(dollData: objDollBase.Serialized = { objects: [] }) {
    const lvl = Lvl.Skate();

    objSkatingDoll(dollData, lvl)
        .at(lvl.StartMarker)
        .zIndexed(ZIndex.SkaterEntities)
        .show();
    scene.camera.zoom = 2;
}

function objSkatingDoll(data: objDollBase.Serialized, lvl: LvlType.Skate) {
    const deltas = new Array<Vector>();
    const sum = vnew();

    const previousPosition = vnew();

    const tombstoneObj = objTombstonePuppet()
        .pivoted(133, 34)
        .scaled(0.5, 0.5);
    const dollObj = objDollBase.deserialize(data);

    const droneSoundInstance = Sfx.Skate.Drone.gain(0).rate(0.25).loop(true).playInstance();

    let phase: "appear" | "skate" | "fly" = "appear";

    return container(
        tombstoneObj,
        dollObj
            .scaled(0.2, 0.2)
            .at(0, -350),
    )
        .mixin(mxnPhysics, { gravity: 0.5, physicsRadius: 10 })
        .mixin(mxnCameraSubject)
        .handles("moved", (self, event) => {
            if (phase !== "skate") {
                return;
            }

            if (!self.isOnGround) {
                return;
            }

            if (!event.previousOnGround) {
                return;
            }

            const delta = (deltas.length >= 30 ? deltas.shift()! : vnew()).at(self).add(previousPosition, -1);
            deltas.push(delta);

            const deltaY = delta.y / 2;
            if (deltaY > 0) {
                self.speed.x += deltaY / 16;
            }
            else {
                self.speed.x = Math.max(1, self.speed.x + deltaY / 40);
            }
        })
        .step(self => {
            if (phase !== "skate") {
                return;
            }

            const pointerPressesCount = DollPointer.getJustWentDownCount();
            self.speed.x += pointerPressesCount * 2;

            if (pointerPressesCount) {
                Sfx.Skate.Nudge.rate(1 + self.speed.vlength / 200).play();
                tombstoneObj.objTombstonePuppet.nudgeFactorAuto = 1;
                objFxDash()
                    .at(-50, -2)
                    .show(self);
            }

            previousPosition.at(self);
            const zoomTarget = self.speed.vlength < 6 ? 2 : 1;
            scene.camera.zoom = approachLinear(scene.camera.zoom, zoomTarget, 0.01);

            sum.at(0, 0);
            for (const delta of deltas) {
                sum.add(delta);
            }

            const target = Math.round(-vdir(sum) * 4) / 4;
            self.rotation = approachLinear(self.rotation, target, Math.PI / 8);

            for (let i = 0; i < Math.ceil(self.speed.vlength / 8); i++) {
                if (Rng.bool()) {
                    continue;
                }
                const offset = vnew(sum).normalize().scale(i * 8);
                const speed = vnew(sum).normalize().scale(-self.speed.vlength);
                speed.y -= Rng.float(0.5, 1.5);

                objFxHeart(speed)
                    .at(tombstoneObj.objTombstonePuppet.skidPosition)
                    .add(offset)
                    .zIndexed(ZIndex.SkaterEntities - 1)
                    .show();
            }
        }, StepOrder.Physics - 1)
        .step(self => {
            const rate = phase === "fly" ? droneSoundInstance.rate - 0.05 : 0.25 + self.speed.vlength / 64;
            droneSoundInstance.linearRamp("rate", rate, 0.1);
        })
        .coro(function* (self) {
            yield* Coro.all([
                interpvr(dollObj).to(0, -80).over(1000),
                interp(tombstoneObj.objTombstonePuppet, "shadowUnit").to(1).over(1000),
            ]);

            Sfx.Skate.Land.rate(0.95, 1.05).play();
            scene.camera.shake = 1;

            yield sleep(500);

            phase = "skate";

            yield () => !self.isOnGround && self.x >= lvl.BeginFlightRegion.x;

            phase = "fly";

            dollObj.rotation = self.rotation;
            tombstoneObj.rotation = self.rotation;
            self.gravity = 0;

            yield sleep(1000);

            const shuttleSpeed = vnew(-4, -4);

            const shuttleObj = objShuttle()
                .at(self)
                .add(self.speed, 60)
                .add(shuttleSpeed, -60)
                .step(self => self.add(shuttleSpeed))
                .zIndexed(-1)
                .show();

            yield sleep(1000);

            scene.camera.shake = 1;

            droneSoundInstance.stop();
            self.speed.vlength = 15;
            self.mxnCameraSubject.isEnabled = false;
            shuttleObj.objShuttle.isBroken = true;
            objFxShuttleDebrisBurst()
                .at(self)
                .show();

            yield interpv(self.scale).to(0, 0).over(100);
            scene.stage
                .coro(function* () {
                    yield sleep(2000);
                    sceneStack.replace(scnDesigner, {});
                });
            self.destroy();
        })
        .coro(function* (self) {
            yield () => self.speed.x > 0;
            droneSoundInstance.linearRamp("gain", 1, 1);
            yield () => phase === "fly";
            droneSoundInstance.linearRamp("gain", 0, 3);
        })
        .step(self => {
            if (phase !== "fly") {
                return;
            }

            dollObj.rotation += Math.PI / 24;
            tombstoneObj.rotation += Math.PI / 16;
            tombstoneObj.add(self.speed.x * -0.8, 4);
        });
}

const [txTombstone, txTombstoneShadow] = Tx.Skate.Tombstone.split({ count: 2 });

function objTombstonePuppet() {
    const v = vnew();
    const skidObj = new Graphics().beginFill(0xff0000).drawRect(0, 0, 5, 5).at(29, 38);

    const api = {
        shadowUnit: 0,
        get skidPosition() {
            return v.at(skidObj.getWorldPosition());
        },
        nudgeFactorAuto: 0,
    };

    return container(
        container(
            Sprite.from(txTombstone),
            Sprite.from(txTombstoneShadow).step(self => self.alpha = api.shadowUnit),
            skidObj.invisible(),
        )
            .step(self => {
                self.pivot.x = api.nudgeFactorAuto * -8;
                api.nudgeFactorAuto = approachLinear(api.nudgeFactorAuto, 0, 0.2);
            }),
    )
        .merge({ objTombstonePuppet: api });
}

const [txShuttle, txShuttleBreak] = Tx.Shuttle.Layers.split({ count: 2 });

function objShuttle() {
    const api = {
        isBroken: false,
    };

    return container(
        Sprite.from(txShuttle),
        Sprite.from(txShuttleBreak).step(self => self.visible = api.isBroken),
        Sprite.from(Tx.Shuttle.Flames)
            .at(500, 730)
            .coro(function* (self) {
                while (true) {
                    yield sleep(222);
                    self.pivot.at(Rng.int(-6, 6), Rng.int(-6, 6));
                }
            }),
    )
        .merge({ objShuttle: api })
        .pivoted(484, 385);
}

const shuttleDebrisTxs = Tx.Shuttle.Debris.split({ count: 3 });

function objFxShuttleDebris(speed: Vector) {
    const scale = Rng.float(1.5, 2.5);

    return Sprite.from(Rng.item(shuttleDebrisTxs))
        .anchored(0.5, 0.5)
        .scaled(scale, scale)
        .angled(Rng.float(360))
        .step(self => {
            self.add(speed);
            self.angle += Math.sign(speed.x) * speed.vlength * 0.8;
            speed.y += 0.01;
        });
}

function objFxShuttleDebrisBurst() {
    return container()
        .coro(function* (self) {
            Sfx.Skate.Crash.rate(0.95, 1.05).play();
            for (let j = 0; j < 24; j++) {
                const distance = Rng.float(60, 90);
                const unit = Rng.vunit();
                objFxShuttleDebris(unit.vcpy().scale((distance / 60 + Rng.float(0.5)) * 1.5))
                    .add(unit, distance)
                    .show(self);
            }
        });
}

const txsDash = Tx.Skate.Dash.split({ width: 82 });

function objFxDash() {
    return objIndexedSprite(txsDash)
        .step(self => {
            self.textureIndex += 0.1 + Rng.float(0.1);
            const f = self.textureIndex / self.textures.length;
            if (f >= 1) {
                self.destroy();
                return;
            }
            self.tint = blendColor(0xffffff, 0x291F51, f);
            self.x -= 2 + Rng.float(2);
        })
        .scaled(1, -1)
        .pivoted(80, 25);
}
