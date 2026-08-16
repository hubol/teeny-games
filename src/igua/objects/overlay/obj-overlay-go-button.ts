import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interp } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnFxBoilDisplacement } from "../../mixins/fx/mxn-fx-boil-displacement";

const [txAura, txBody, txFace] = Tx.Overlay.GoButton.split({ count: 3, trimFrame: true });

export function objOverlayGoButton() {
    return objPuppetGoButton()
        .scaled(2, 2)
        .coro(function* (self) {
            while (true) {
                yield sleep(500);
                yield interp(self.objPuppetGoButton, "visible").to(1).over(1500);

                yield sleep(1000);
                yield interp(self.objPuppetGoButton, "visible").to(0).over(1500);
            }
        });
}

function objPuppetGoButton() {
    const api = {
        visible: 0,
    };

    const bodyObj = Sprite.from(txBody);

    return container(
        Sprite.from(txAura)
            .mixin(mxnFxBoilDisplacement)
            .anchored(0.5, 0.5)
            .at(txAura.width / 2, txAura.height / 2)
            .coro(function* (self) {
                while (true) {
                    self.alpha = 0;
                    yield () => api.visible >= 0.95;
                    yield interp(self, "alpha").steps(3).to(1).over(500);
                    yield () => api.visible < 0.9;
                    yield interp(self, "alpha").steps(3).to(0).over(500);
                }
            }),
        container(
            bodyObj,
            Sprite.from(txFace).mixin(mxnFxBoil, "pivot"),
        )
            .step(self => self.y = factor.sine(1 - api.visible) * 200),
    )
        .merge({ objPuppetGoButton: api })
        .collisionShape(CollisionShape.DisplayObjects, [bodyObj]);
}
