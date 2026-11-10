import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Rng } from "../../lib/math/rng";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";

export function objKelp() {
    return Sprite.from(Tx.Kelp)
        .anchored(0.5, 1)
        .scaled(2 * Rng.intp(), 2)
        .mixin(mxnFxBoilDisplacement, { rate: 0.1, scale: 15 });
}
