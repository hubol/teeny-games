import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { RgbInt } from "../../../lib/math/number-alias-types";
import { Rng } from "../../../lib/math/rng";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { mxnSerialize } from "../../mixins/mxn-serialize";

const hairTints: Array<hairTints.Type> = [
    [0xE5C32D, 0xE5D799],
    [0xC6C6C6, 0xF2F2F2],
    [0xBA593B, 0xE2935D],
    [0x593629, 0x875933],
    [0x191009, 0x3F2A18],
];

namespace hairTints {
    export type Type = [base: RgbInt, highlight: RgbInt];
}

const txs = Tx.Doll.Hair.split({ count: 2 });

export function objDollHair(
    angle = Rng.int(2) * -90,
    scaleX = Rng.intp(),
    tints = Rng.item(hairTints),
    highlightOffset = Rng.vunit().scale(Rng.float(6)).vround(),
) {
    const sourceFn = (): DisplayObject => objDollHair(angle, scaleX, tints);

    const collisionShapeObjs = [
        new Graphics().beginFill(0xff0000).drawCircle(4 + 16, 6 + 16, 16).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(28 + 16, 13 + 16, 16).invisible(),
    ];

    return container(
        Sprite.from(txs[0]).tinted(tints[0]),
        Sprite.from(txs[1]).tinted(tints[1]).at(highlightOffset),
        ...collisionShapeObjs,
    )
        .collisionShape(CollisionShape.DisplayObjects, collisionShapeObjs)
        .mixin(mxnSerialize, sourceFn)
        .pivoted(14, 16)
        .scaled(3 * scaleX, 3)
        .angled(angle * -Math.sign(scaleX));
}
