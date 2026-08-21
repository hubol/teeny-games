import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { approachLinear } from "../../lib/math/number";
import { vdir } from "../../lib/math/vector";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { scene } from "../globals";
import { mxnCameraSubject } from "../mixins/mxn-camera-subject";
import { mxnPhysics } from "../mixins/mxn-physics";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { StepOrder } from "../objects/step-order";

export function scnSkate(dollData: objDollBase.Serialized = { objects: [] }) {
    const lvl = Lvl.Skate();
    objSkatingDoll(dollData).at(lvl.StartMarker).show();
    scene.camera.zoom = 2;
}

function objSkatingDoll(data: objDollBase.Serialized) {
    const previousPosition = vnew();

    return container(
        objDollBase.deserialize(data)
            .scaled(0.2, 0.2)
            .at(0, -80),
    )
        .mixin(mxnPhysics, { gravity: 0.5, physicsRadius: 10 })
        .mixin(mxnCameraSubject)
        .handles("moved", (self, event) => {
            if (!self.isOnGround) {
                return;
            }

            self.rotation = vdir(self.speed);

            if (!event.previousOnGround) {
                return;
            }

            const deltaY = self.y - previousPosition.y;
            if (deltaY > 0) {
                self.speed.x += deltaY / 16;
            }
            else {
                self.speed.x = Math.max(1, self.speed.x + deltaY / 40);
            }
        })
        .step(self => {
            previousPosition.at(self);
            const zoomTarget = self.speed.vlength < 6 ? 2 : 1;
            scene.camera.zoom = approachLinear(scene.camera.zoom, zoomTarget, 0.01);
        }, StepOrder.Physics - 1);
}
