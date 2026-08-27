import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interp } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { mxnSerialize } from "../../mixins/mxn-serialize";
import { DollSkinTint } from "./doll-skin-tint";

const txs = Tx.Doll.Leg.split({ count: 3 });
const sockTxs = Tx.Doll.Sock.split({ count: 3 });

export function objDollLeg(
    tintValue = DollSkinTint.createValue(),
    flipH = Rng.bool(),
    socks = Rng.bool(),
) {
    const tint = DollSkinTint.getPrimary(tintValue);
    const objs = txs.map((tx, i) =>
        container(
            Sprite.from(tx).tinted(tint),
            ...(socks ? [Sprite.from(sockTxs[i])] : []),
        )
    );

    const thighCollisionObjs = [
        new Graphics().beginFill(0xff0000).drawCircle(24 + 20.5, 5 + 20.5, 20.5).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(27 + 16, 46 + 16, 16).invisible(),
    ];

    const femurCollisionObjs = [
        new Graphics().beginFill(0xff0000).drawCircle(27 + 16, 54 + 16, 16.5).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(30 + 15, 87 + 15, 15.5).invisible(),
    ];

    const footCollisionObjs = [
        new Graphics().beginFill(0xff0000).drawCircle(31 + 13, 103 + 13, 13.5).invisible(),
        new Graphics().beginFill(0xff0000).drawCircle(11 + 12, 117 + 12, 12).invisible(),
    ];

    const state = {
        thighAngle: 0,
        femurAngle: 0,
    };

    const sourceFn = (): DisplayObject => objDollLeg(tintValue, flipH, socks);
    return container(
        objs[0],
        ...thighCollisionObjs,
        container(
            objs[1],
            ...femurCollisionObjs,
            container(
                objs[2],
                ...footCollisionObjs,
            )
                .pivoted(48, 114)
                .at(48, 114)
                .coro(function* (self) {
                    while (true) {
                        yield sleep(Rng.int(200, 500));
                        yield interp(self, "angle").factor(factor.sine).to(Rng.int(-40, 10)).over(Rng.int(500, 1500));
                    }
                }),
        )
            .pivoted(42, 67)
            .at(42, 67)
            .coro(function* () {
                while (true) {
                    yield sleep(Rng.int(200, 500));
                    yield interp(state, "femurAngle").factor(factor.sine).to(Rng.int(-10, 10)).over(Rng.int(500, 1500));
                }
            })
            .step(self => {
                self.angle = state.femurAngle - Math.abs(state.thighAngle);
            }),
    )
        .collisionShape(CollisionShape.DisplayObjects, [
            ...thighCollisionObjs,
            ...femurCollisionObjs,
            ...footCollisionObjs,
        ])
        .pivoted(46, 18)
        .scaled(flipH ? -2.7 : 2.7, 2.7)
        .coro(function* (self) {
            while (true) {
                yield sleep(Rng.int(200, 500));
                yield interp(self, "angle")
                    .factor(factor.sine)
                    .to(Rng.int(0, 10 * Math.sign(self.scale.x)))
                    .over(Rng.int(500, 1500));
            }
        })
        .step(self => state.thighAngle = self.angle)
        .mixin(mxnSerialize, sourceFn);
}
