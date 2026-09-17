import { RAD_TO_DEG } from "pixi.js";
import { Rng } from "../../lib/math/rng";
import { vdir } from "../../lib/math/vector";
import { vnew } from "../../lib/math/vector-type";
import { Key } from "../globals";
import { objCharacterCole } from "../objects/character/obj-character-cole";

export function scnMain() {
    objCharacterCole()
        .at(250, 140)
        .step(self => {
            if (Key.isDown("Space") && Rng.float() < 0.1) {
                self.objCharacterCole.strokesCount++;
            }

            const v = vnew();
            if (Key.isDown("ArrowRight")) {
                v.x += 1;
            }
            if (Key.isDown("ArrowLeft")) {
                v.x -= 1;
            }
            if (Key.isDown("ArrowDown")) {
                v.y += 1;
            }
            if (Key.isDown("ArrowUp")) {
                v.y -= 1;
            }

            if (v.isZero) {
                return;
            }

            v.normalize();
            self.add(v, 3);
            self.objCharacterCole.facingDegrees = vdir(v) * RAD_TO_DEG;
            self.objCharacterCole.pedometer += 1;
        })
        .show();
}
