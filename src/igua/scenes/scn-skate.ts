import { Sprite } from "pixi.js";
import { Lvl, LvlType } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { vdir } from "../../lib/math/vector";
import { Vector, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { scene } from "../globals";
import { mxnCameraSubject } from "../mixins/mxn-camera-subject";
import { mxnPhysics } from "../mixins/mxn-physics";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { StepOrder } from "../objects/step-order";
import { DollPointer } from "../utils/doll-pointer";

export function scnSkate(dollData: objDollBase.Serialized = { objects: [] }) {
    const lvl = Lvl.Skate();
    objSkatingDoll(dollData, lvl).at(lvl.StartMarker).show();
    scene.camera.zoom = 2;
}

const deltas = new Array<Vector>();
const sum = vnew();

function objSkatingDoll(data: objDollBase.Serialized, lvl: LvlType.Skate) {
    const previousPosition = vnew();

    const tombstoneObj = objTombstonePuppet()
        .pivoted(133, 34)
        .scaled(0.5, 0.5);
    const dollObj = objDollBase.deserialize(data);

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

            self.speed.x += DollPointer.getJustWentDownCount() * 2;
            previousPosition.at(self);
            const zoomTarget = self.speed.vlength < 6 ? 2 : 1;
            scene.camera.zoom = approachLinear(scene.camera.zoom, zoomTarget, 0.01);

            sum.at(0, 0);
            for (const delta of deltas) {
                sum.add(delta);
            }

            const target = Math.round(-vdir(sum) * 4) / 4;
            self.rotation = approachLinear(self.rotation, target, Math.PI / 8);
        }, StepOrder.Physics - 1)
        .coro(function* (self) {
            yield* Coro.all([
                interpvr(dollObj).to(0, -80).over(1000),
                interp(tombstoneObj.objTombstonePuppet, "shadowUnit").to(1).over(1000),
            ]);

            scene.camera.shake = 1;

            yield sleep(500);

            phase = "skate";

            yield () => !self.isOnGround && self.x >= lvl.BeginFlightRegion.x;

            phase = "fly";

            dollObj.rotation = self.rotation;
            tombstoneObj.rotation = self.rotation;
            self.gravity = 0;
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
    const api = {
        shadowUnit: 0,
    };

    return container(
        Sprite.from(txTombstone),
        Sprite.from(txTombstoneShadow).step(self => self.alpha = api.shadowUnit),
    )
        .merge({ objTombstonePuppet: api });
}
