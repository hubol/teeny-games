import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { approachLinear } from "../../lib/math/number";
import { vnew } from "../../lib/math/vector-type";
import { Mouse } from "../globals";

export function objCursor() {
    return Sprite.from(Tx.Heart)
        .zIndexed(99)
        .anchored(0.5, 0.5)
        .merge({ objCursor: { inferredSpeed: vnew() } })
        .step(self => {
            self.visible = Mouse.isPositionKnown;
            self.objCursor.inferredSpeed.at(Mouse).add(self, -1);
            self.at(Mouse);

            let scale = self.scale.x;
            scale = approachLinear(scale, Mouse.isDown ? 10 : 1, Mouse.isDown ? 0.2 : 1);
            self.scale.set(scale);
        });
}
