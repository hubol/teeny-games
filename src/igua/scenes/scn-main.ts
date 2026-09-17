import { RAD_TO_DEG } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { vdir } from "../../lib/math/vector";
import { vnew } from "../../lib/math/vector-type";
import { renderer } from "../current-pixi-renderer";
import { Key } from "../globals";
import { objCharacterCole } from "../objects/character/obj-character-cole";

export function scnMain() {
    const textObj = objText.Large("Welcome to Age 30. ", { maxWidth: renderer.width })
        .coro(function* (self) {
            for (const message of ["Walk with ARROW KEYS. ", "Masturbate with HOLD SPACE. "]) {
                yield sleep(2000);
                Sfx.Message.play();
                self.text += "\n" + message;
            }
        })
        .step(self => {
            const delta = self.height - renderer.height;
            if (delta < 0) {
                return;
            }
            self.y = approachLinear(self.y, -delta, 1);
        })
        .show();

    objCharacterCole()
        .at(250, 200)
        .step(self => {
            if (Key.isDown("Space") && Rng.float() < 0.1) {
                const isStroke0 = self.objCharacterCole.strokesCount++ % 2 === 0;
                self.play((isStroke0 ? Sfx.Stroke0 : Sfx.Stroke1).rate(0.95, 1.05));
                if (Rng.float() < 0.02) {
                    textObj.text += "You'll never get to cum. ";
                }
                else {
                    textObj.text += Rng.choose("You stroke your dick. ", "You stroke your dick! ");
                }
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
        .show()
        .objCharacterCole.facingDegrees = 90;
}
