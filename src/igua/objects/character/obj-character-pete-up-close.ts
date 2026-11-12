import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interp, interpv } from "../../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../../lib/game-engine/routines/sleep";
import { nlerp } from "../../../lib/math/number";
import { Rng } from "../../../lib/math/rng";
import { vnew } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";

const [txNoggin, txSclera, txPupil, txShirt] = Tx.Character.Pete.UpperBody.split({ width: 940, trimFrame: true });

export function objCharacterPeteUpClose() {
    const pupilPosition = vnew();
    const eyelid = {
        closedUnit: 0,
    };

    const api = {
        isWalking: false,
        isWaving: false,
    };

    function objEye() {
        const eyelidObj = Sprite.from(txSclera).tinted(0x13A071);
        const eyelidMaskObj = new Graphics()
            .beginFill(0xff0000)
            .drawRect(0, 0, 184, 194)
            .at(286, 64)
            .scaled(1, 0)
            .step(self => self.scale.y = eyelid.closedUnit);

        return container(
            Sprite.from(txSclera),
            Sprite.from(txPupil)
                .step(self => {
                    self.at(pupilPosition);
                    self.visible = eyelid.closedUnit < 1;
                }),
            eyelidObj
                .masked(eyelidMaskObj),
            eyelidMaskObj,
        );
    }

    return container(
        container(
            objEye().at(-384, -10),
            Sprite.from(txNoggin),
            Sprite.from(txShirt),
            objEye(),
        )
            .pivoted(524, 710),
        Sprite.from(Tx.Character.Pete.Arm)
            .anchored(0.5, 1)
            .at(-300, 710)
            .coro(function* (self) {
                let steps = 0;
                self.step(() => self.angle = Math.sin(steps / 8) * 10 - 20);

                yield () => api.isWaving;

                yield interpv(self).to(-500, 300).over(1000);
                self.step(() => steps++);
            }),
    )
        .merge({ objCharacterPeteUpClose: api })
        .coro(function* () {
            while (true) {
                yield interpv(pupilPosition)
                    .factor(factor.sine)
                    .to(Rng.float(-64, 50), Rng.float(-63, 56))
                    .over(Rng.int(500, 1000));
                if (Rng.float() < 0.8) {
                    yield sleep(Rng.int(500, 1000));
                }
            }
        })
        .coro(function* () {
            while (true) {
                yield sleep(Rng.int(1500, 3000));
                yield interp(eyelid, "closedUnit").steps(10).to(1).over(200);
                yield sleepf(4);
                yield interp(eyelid, "closedUnit").to(0).over(250);
            }
        })
        .coro(function* (self) {
            yield () => api.isWalking;
            let steps = 0;
            self.step(self =>
                self.pivot.y = nlerp(0, ((Math.sin(steps++ / 10) + 1) * 2) * -5, Math.min(steps / 30, 4))
            );
        });
}
