import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { interp } from "../../../lib/game-engine/routines/interp";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";

export function objCharacterMystery() {
    const api = {
        isRevealed: false,
    };

    return container(
        Sprite.from(Tx.Characters.Mystery)
            .scaled(2, 2)
            .mixin(mxnFxBoil, "position"),
    )
        .merge({ objCharacterMystery: api })
        .mixin(mxnPointerPress)
        .dispatches<"objCharacterMystery:pressed">()
        .handles("mxnPointerPress:pressed", (self) => {
            if (api.isRevealed) {
                self.dispatch("objCharacterMystery:pressed");
            }
        })
        .coro(function* (self) {
            self.alpha = 0;
            while (true) {
                yield () => api.isRevealed;
                yield interp(self, "alpha").steps(4).to(1).over(333);
                yield () => !api.isRevealed;
                yield interp(self, "alpha").steps(4).to(0).over(333);
            }
        });
}
