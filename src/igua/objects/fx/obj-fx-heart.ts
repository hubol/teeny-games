import { DisplayObject, Rectangle, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { blendColor } from "../../../lib/color/blend-color";
import { Coro } from "../../../lib/game-engine/routines/coro";
import { interpc } from "../../../lib/game-engine/routines/interp";
import { Integer } from "../../../lib/math/number-alias-types";
import { Rng } from "../../../lib/math/rng";
import { VectorSimple } from "../../../lib/math/vector-type";
import { _Internal_Collision } from "../../../lib/pixi/collision";

const tints = {
    start: 0x776F97,
    end: 0x3D316B,
};

export function objFxHeart(speed: VectorSimple) {
    const scale = Rng.float(0.05, 0.2);

    return Sprite.from(Tx.Fx.Heart)
        .anchored(0.5, 0.5)
        .tinted(blendColor(tints.start, tints.end, Rng.float()))
        .scaled(scale, scale)
        .angled(Rng.float(-10, 10))
        .coro(function* (self) {
            const duration = Rng.int(500, 1000);
            yield* Coro.all([
                interpc(self, "tint").to(blendColor(tints.start, tints.end, Rng.float())).over(duration),
            ]);
            self.destroy();
        })
        .step(self => self.add(speed));
}

objFxHeart.burstAroundCollisionRectangles = function burstAroundCollisionRectangles (
    obj: DisplayObject,
    count: Integer,
) {
    const rectangles = obj.getCollisionRectangles();

    for (let i = 0; i < count; i++) {
        const rectangle = Rng.item(rectangles);
        const unit = Rng.vunit();
        const wh = rectangle.width / 2;
        const hh = rectangle.height / 2;

        objFxHeart(unit)
            .at(rectangle.x + wh + unit.x * wh, rectangle.y + hh + unit.y * hh)
            .zIndexed(9999)
            .show();
    }
};
