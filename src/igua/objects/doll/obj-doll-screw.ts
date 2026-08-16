import { DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { Rng } from "../../../lib/math/rng";
import { mxnSerialize } from "../../mixins/mxn-serialize";

export function objDollScrew(angle = Rng.int(4) * 90, scaleX = Rng.intp(), scaleY = Rng.intp()) {
    const sourceFn = (): DisplayObject => objDollScrew(angle, scaleX, scaleY);

    return Sprite.from(Tx.Doll.Screw0)
        .mixin(mxnSerialize, sourceFn)
        .anchored(0.5, 0.5)
        .angled(angle)
        .scaled(scaleX * 3, scaleY * 3);
}
