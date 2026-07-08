import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interpv } from "../../../lib/game-engine/routines/interp";
import { vdeg } from "../../../lib/math/angle";
import { Rng } from "../../../lib/math/rng";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";

const txsMagnet = Tx.Characters.Magnet.split({ count: 2 });

export function objCharacterMagnet() {
    const api = {
        isSparking: false,
    };

    return container(
        ...txsMagnet.map(tx =>
            Sprite.from(tx)
                .anchored(0.5, 0.5)
                .scaled(2, 2)
                .mixin(mxnFxBoil, "position")
        ),
    )
        .merge({ objCharacterMagnet: api })
        .coro(function* (self) {
            while (true) {
                yield () => api.isSparking;
                const sparkObj = Sprite.from(Tx.Effects.Spark)
                    .anchored(0.5, 0.5)
                    .scaled(1.5 * Rng.intp(), 1.5 * Rng.intp())
                    .show();

                const dir = vdeg(Rng.int(-90, -180));

                sparkObj
                    .at(self)
                    .add(dir, Rng.int(90, 130));
                yield interpv(sparkObj).factor(factor.sine).to(self.vcpy().add(dir, 60)).over(Rng.int(100, 300));
                sparkObj.destroy();
            }
        });
}
