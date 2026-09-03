import { DisplayObject } from "pixi.js";
import { createDebugKey } from "../../lib/game-engine/debug/debug-key";
import { Instances } from "../../lib/game-engine/instances";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Toast } from "../../lib/game-engine/toast";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { Vector, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { mxnCameraSubject } from "../mixins/mxn-camera-subject";
import { objPlayer } from "./obj-player";
import { StepOrder } from "./step-order";

type CameraMode = "follow_player" | "controlled";

let zoomEnabled = true;

createDebugKey("KeyZ", "zoomDisable", (_, keydown) => {
    if (keydown) {
        zoomEnabled = !zoomEnabled;
        Toast.info(zoomEnabled ? "Zoom ON" : "Zoom OFF", "^_^");
    }
});

function getCameraPositionToFrameSubject(vector: DisplayObject | Vector, subjectObj: DisplayObject) {
    if (subjectObj && !subjectObj.destroyed) {
        vector.at(subjectObj).add(20, 20).add(-renderer.width / 2, -renderer.height / 2);
        return vector;
    }

    return null;
}

export function objCamera() {
    const shakeVector = vnew();

    // TODO not sure if mode should be exposed...
    const obj = container()
        .merge({ mode: <CameraMode> "follow_player", zoom: 1, shake: 0 })
        .step(self => {
            if (self.mode === "follow_player") {
                const cameraSubjectObj = Instances(mxnCameraSubject, obj => obj.mxnCameraSubject.isEnabled).last;
                if (cameraSubjectObj) {
                    getCameraPositionToFrameSubject(self, cameraSubjectObj);
                }
            }

            const zoom = zoomEnabled ? self.zoom : 1;
            scene.stage.scale.set(zoom);

            scene.stage.pivot.x = Math.round(self.x + renderer.width / 2 + shakeVector.x * self.shake * 3);
            scene.stage.pivot.y = Math.round(self.y + renderer.height / 2 + shakeVector.y * self.shake * 3);

            scene.stage.x = Math.round(renderer.width / 2);
            scene.stage.y = Math.round(renderer.height / 2);
        }, StepOrder.Camera);

    return obj
        .coro(function* (self) {
            while (true) {
                yield () => self.shake > 0;
                shakeVector.at(Rng.vunit());
                self.shake = approachLinear(self.shake * 0.9, 0, 0.1);
                yield sleep(67);
            }
        });
}
