import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interp } from "../../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { objFxBubble } from "../fx/obj-fx-bubble";

export function objCharacterTuna() {
    return Sprite.from(Tx.Characters.Tuna)
        .pivoted(89, 276)
        .scaled(0.4, 0.4)
        .coro(function* (self) {
            while (true) {
                yield interp(self, "angle").steps(4).to(4).over(1000);
                yield interp(self, "angle").steps(4).to(0).over(1000);
            }
        })
        .coro(function* (self) {
            while (true) {
                const count = Rng.int(3, 6);
                for (let i = 0; i < count; i++) {
                    objFxBubble()
                        .scaled(0.4, 0.4)
                        .at(self)
                        .add(-30 * self.scale.x, -6 * self.scale.x)
                        .show();
                    yield sleepf(20 + Rng.int(2, 10));
                }
                yield sleep(Rng.int(600, 1500));
            }
        });
}
