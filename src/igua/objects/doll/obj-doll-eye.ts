import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { interpv } from "../../../lib/game-engine/routines/interp";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { container } from "../../../lib/pixi/container";

export function objDollEye() {
    return container(
        Sprite.from(Tx.Doll.Eye0),
        Sprite.from(Tx.Doll.Sclera0.trimmed)
            .coro(function* (self) {
                while (true) {
                    yield sleep(Rng.int(250, 750));
                    yield interpv(self).to(Rng.vunit().scale(10)).over(Rng.int(250, 1500));
                }
            }),
    )
        .pivoted(15, 14)
        .scaled(3, 3);
}
