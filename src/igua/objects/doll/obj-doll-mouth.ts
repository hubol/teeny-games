import { DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { interpv } from "../../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { mxnSerialize } from "../../mixins/mxn-serialize";

const txs = [
    Tx.Doll.Mouth0,
    Tx.Doll.Mouth1,
    Tx.Doll.Mouth2,
]
    .map(tx => tx.trimmed);

export function objDollMouth(tx = Rng.item(txs)) {
    const sourceFn = (): DisplayObject => objDollMouth(tx);

    return Sprite.from(tx)
        .coro(function* (self) {
            while (true) {
                yield sleep(Rng.int(500, 1000));
                yield interpv(self.scale).steps(3).to(2, 2).over(Rng.int(250, 750));
                self.tint = 0x000000;
                if (Rng.bool()) {
                    self.scale.y *= -1;
                    yield sleep(Rng.int(333, 666));
                    for (let i = 1; i <= 8; i++) {
                        self.pivot.x = (i % 2) * 2;
                        yield sleepf(6);
                    }
                    self.scale.y *= -1;
                }
                yield interpv(self.scale).steps(3).to(3, 3).over(Rng.int(250, 750));
                yield sleep(Rng.int(250, 500));
                self.tint = 0xffffff;
            }
        })
        .mixin(mxnSerialize, sourceFn)
        .anchored(0.5, 0.5)
        .scaled(3, 3);
}
