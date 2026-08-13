import { DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { Rng } from "../../../lib/math/rng";
import { container } from "../../../lib/pixi/container";
import { mxnSerialize } from "../../mixins/mxn-serialize";
import { DollSkinTint } from "./doll-skin-tint";

export function objDollEar(tintValue = DollSkinTint.createValue(), flipH = Rng.bool()) {
    const sourceFn = (): DisplayObject => objDollEar(tintValue, flipH);
    return container(
        Sprite.from(Tx.Doll.Ear0).tinted(DollSkinTint.getPrimary(tintValue)),
        Sprite.from(Tx.Doll.EarShadow0).tinted(DollSkinTint.getAccent(tintValue)),
    )
        .mixin(mxnSerialize, sourceFn)
        .scaled(3, 3)
        .flipH(flipH ? -1 : 1);
}
