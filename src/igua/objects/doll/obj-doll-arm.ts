import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { blendColor } from "../../../lib/color/blend-color";
import { factor, interp } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { mxnSerialize } from "../../mixins/mxn-serialize";

const txs = Tx.Doll.Arm0.split({ count: 3, trimFrame: true });
const skinTints = [0x1a1109, 0xcea488];

export function objDollArm(tint = blendColor(skinTints[0], skinTints[1], Rng.float()), angle = Rng.int(360)) {
    const sprites = txs.map(tx => Sprite.from(tx).tinted(tint));

    const upperArmCollisionObjs = [
        new Graphics().beginFill(0xff0000).drawCircle(15, 24, 15).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(44, 24, 15).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(64, 26, 13).invisible(),
    ];

    const forearmCollisionObjs = [
        new Graphics().beginFill(0xff0000).drawCircle(63 + 12, 15 + 12, 12).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(88 + 11, 17 + 11, 11).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(110 + 17, 14 + 17, 17).invisible(),
    ];

    const sourceFn = () => objDollArm(tint, angle);
    return container(
        sprites[0],
        ...upperArmCollisionObjs,
        container(
            sprites[1],
            sprites[2],
            ...forearmCollisionObjs,
        )
            .pivoted(73, 28)
            .at(73, 28)
            .coro(function* (self) {
                while (true) {
                    yield sleep(Rng.int(200, 500));
                    yield interp(self, "angle").factor(factor.sine).to(Rng.int(-90, 90)).over(Rng.int(500, 1500));
                }
            }),
    )
        .collisionShape(CollisionShape.DisplayObjects, [...upperArmCollisionObjs, ...forearmCollisionObjs])
        .pivoted(17, 24)
        .scaled(3, 3)
        .angled(angle)
        .mixin(mxnSerialize, sourceFn);
}
