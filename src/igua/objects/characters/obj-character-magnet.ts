import { Sprite } from "pixi.js";
import { Sfx } from "../../../assets/sounds";
import { Tx } from "../../../assets/textures";
import { factor, interpv } from "../../../lib/game-engine/routines/interp";
import { vdeg } from "../../../lib/math/angle";
import { RgbInt } from "../../../lib/math/number-alias-types";
import { Rng } from "../../../lib/math/rng";
import { container } from "../../../lib/pixi/container";
import { Null } from "../../../lib/types/null";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";

const [txBody, txFaceDefault, txFaceSparking] = Tx.Characters.Magnet.split({ count: 3 });
const sfxs = [
    Sfx.Effects.Spark0,
    Sfx.Effects.Spark1,
    Sfx.Effects.Spark2,
    Sfx.Effects.Spark3,
    Sfx.Effects.Spark4,
];

export function objCharacterMagnet() {
    const api = {
        isSparking: false,
        tint: Null<RgbInt>(),
    };

    const sprites = [txBody, txFaceDefault].map(tx =>
        Sprite.from(tx)
            .anchored(0.5, 0.5)
            .scaled(2, 2)
            .mixin(mxnFxBoil, "position")
    );

    sprites[0]
        .step(self => {
            if (api.tint === null) {
                self.texture = txBody;
                self.tint = 0xffffff;
            }
            else {
                self.texture = Tx.Characters.MagnetTinted;
                self.tint = api.tint;
            }
        });

    sprites[1]
        .step(self => self.texture = api.isSparking ? txFaceSparking : txFaceDefault);

    return container(
        ...sprites,
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

                self.play(Rng.item(sfxs).rate(0.6, 1));

                sparkObj
                    .at(self)
                    .add(dir, Rng.int(90, 130));
                yield interpv(sparkObj).factor(factor.sine).to(self.vcpy().add(dir, 60)).over(Rng.int(66, 150));
                sparkObj.destroy();
            }
        });
}
