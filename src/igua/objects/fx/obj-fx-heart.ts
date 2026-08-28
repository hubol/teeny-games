import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { blendColor } from "../../../lib/color/blend-color";
import { Coro } from "../../../lib/game-engine/routines/coro";
import { factor, interpc, interpv } from "../../../lib/game-engine/routines/interp";
import { Rng } from "../../../lib/math/rng";
import { VectorSimple } from "../../../lib/math/vector-type";

const tints = {
    start: 0xB2AFFF,
    end: 0x5E4EC4,
};

export function objFxHeart(speed: VectorSimple) {
    const scale = Rng.float(1.5, 3);

    return Sprite.from(Tx.Fx.Heart)
        .anchored(0.5, 0.5)
        .tinted(blendColor(tints.start, tints.end, Rng.float()))
        .scaled(scale, scale)
        .coro(function* (self) {
            const duration = Rng.int(500, 1000);
            yield* Coro.all([
                interpc(self, "tint").to(blendColor(tints.start, tints.end, Rng.float())).over(duration),
                interpv(self.scale).factor(factor.sine).to(0, 0).over(duration),
            ]);
            self.destroy();
        })
        .step(self => self.add(speed));
}
