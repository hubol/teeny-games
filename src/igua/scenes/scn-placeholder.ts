import { Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Mzk } from "../../assets/music";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { interp } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { AdjustColor } from "../../lib/pixi/adjust-color";
import { Jukebox } from "../core/igua-audio";
import { renderer } from "../current-pixi-renderer";
import { Key, scene } from "../globals";

export function scnPlaceholder() {
    Jukebox.play(Mzk.Canyon);
    scene.style.backgroundTint = 0x3716b1;

    for (let i = 0; i < 2; i++) {
        objCloud()
            .at(Rng.int(500), Rng.int(100))
            .show();
    }

    Sprite.from(Tx.GrandCanyon).show();

    Sprite.from(Tx.Dog)
        .at(340, 110)
        .coro(function* (self) {
            while (true) {
                self.tinted(AdjustColor.hsv(Rng.int(360), 100, 100).toPixi());
                yield sleep(200);
            }
        })
        .coro(function* (self) {
            while (true) {
                yield () => Key.isDown("KeyB");
                self.play(Sfx.Bark.rate(0.9, 1.1));
                self.texture = Tx.DogBark;
                yield sleep(300);
                self.texture = Tx.Dog;
            }
        })
        .show();

    objPumpkinGuy()
        .at(60, 90)
        .show();

    new Graphics()
        .beginFill(scene.style.backgroundTint)
        .drawRoundedRect(60, renderer.height - 20, 380, 20, 8)
        .show();

    objText.MediumIrregular("Move: Arrow Keys, Hold N: Do the macarena, Hold Space: Backflip, B: Bark")
        .anchored(0.5, 1)
        .at(renderer.width / 2, renderer.height - 2)
        .show();
}

function objPumpkinGuy() {
    let isMacarenaing = false;

    return Sprite.from(Tx.PumpkinGuy)
        .step(self => {
            if (Key.isDown("ArrowRight")) {
                self.x += 1;
            }
            if (Key.isDown("ArrowDown")) {
                self.y += 1;
            }
            if (Key.isDown("ArrowLeft")) {
                self.x -= 1;
            }
            if (Key.isDown("ArrowUp")) {
                self.y -= 1;
            }

            const willMacerana = Key.isDown("KeyN");
            if (!isMacarenaing && willMacerana) {
                self.play(Sfx.SixSeven.rate(0.9));
            }
            isMacarenaing = willMacerana;
        })
        .anchored(0.5, 0.5)
        .coro(function* (self) {
            while (true) {
                yield onPrimitiveMutate(() => self.x + self.y);
                self.texture = Tx.PumpkinGuyStep;
                yield sleep(300);
                self.texture = Tx.PumpkinGuy;
                yield sleep(300);
            }
        })
        .coro(function* (self) {
            while (true) {
                yield sleep(300);
                if (isMacarenaing) {
                    self.flipH(-self.scale.x);
                }
                if (Key.isDown("Space")) {
                    self.scale.x = 1;
                    self.angle = 0;
                    yield interp(self, "angle").steps(8).to(-360).over(600);
                }
            }
        });
}

function objCloud() {
    return Sprite.from(Tx.Cloud)
        .step(self => {
            self.x -= Rng.float();
            if (self.x <= -self.width) {
                self.x = 500;
            }
        });
}
