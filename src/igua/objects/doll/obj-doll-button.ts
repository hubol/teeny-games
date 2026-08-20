import { DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { Rng } from "../../../lib/math/rng";
import { AdjustColor } from "../../../lib/pixi/adjust-color";
import { mxnSerialize } from "../../mixins/mxn-serialize";

export function objDollButton(
    isWasher = Rng.bool(),
    tint = AdjustColor.hsv(Rng.float(360), Rng.float(10, Rng.float(80, 100)), Rng.float(50, 85)).toPixi(),
) {
    const sourceFn = (): DisplayObject => objDollButton(isWasher, tint);

    return Sprite.from(isWasher ? Tx.Doll.Washer0 : Tx.Doll.Button)
        .mixin(mxnSerialize, sourceFn)
        .tinted(isWasher ? 0xffffff : tint)
        .anchored(0.5, 0.5)
        .scaled(3, 3);
}
