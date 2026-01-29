import { DisplayObject } from "pixi.js";
import { Vector, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { StepOrder } from "./step-order";

type CameraMode = "follow_player";

function getCameraPositionToFrameSubject(vector: DisplayObject | Vector, subjectObj: DisplayObject) {
    if (subjectObj && !subjectObj.destroyed) {
        vector.at(subjectObj).add(-renderer.width / 2, -renderer.height / 2);
        vector.x = Math.max(0, Math.min(vector.x, scene.level.width - renderer.width));
        vector.y = Math.max(0, Math.min(vector.y, scene.level.height - renderer.height));
        return vector;
    }

    return null;
}

const v = vnew();

export function objCamera() {
    // TODO not sure if mode should be exposed...
    const obj = container().merge({ mode: <CameraMode> "follow_player" }).step(self => {
        if (self.mode === "follow_player") {
            // getCameraPositionToFrameSubject(self, playerObj);
        }

        // TODO switch for this?
        self.x = Math.max(0, Math.min(self.x, scene.level.width - renderer.width));
        self.y = Math.max(0, Math.min(self.y, scene.level.height - renderer.height));

        scene.stage.x = Math.round(-self.x);
        scene.stage.y = Math.round(-self.y);

        scene.parallaxStage.x = Math.round(-self.x * 0.8);
        scene.parallaxStage.y = Math.round(-self.y * 0.8);
    }, StepOrder.Camera);

    return obj;
}
