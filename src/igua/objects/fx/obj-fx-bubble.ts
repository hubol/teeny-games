import { Graphics } from "pixi.js";
import { sleepf } from "../../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../../lib/math/number";
import { Rng } from "../../../lib/math/rng";
import { vnew } from "../../../lib/math/vector-type";

export function objFxBubble(maxSize: number) {
    const gfx = new Graphics();

    const speed = vnew(Rng.float(-0.3, 3), Rng.float(-0.8, -1.5));
    const width = Rng.intc(2, 4);

    return gfx
        .step((self) => {
            speed.y -= 0.01;
            self.add(speed);
            speed.x *= 0.95;
            if (self.y <= 0) {
                self.destroy();
            }
        })
        .coro(function* (self) {
            let size = 4;
            while (size <= maxSize) {
                self.clear();
                self.lineStyle(width, 0xffffff);
                self.drawCircle(0, 0, size);
                yield sleepf(Rng.intc(3, 5));
                if (size === maxSize) {
                    break;
                }
                size = approachLinear(size, maxSize, 5);
            }
        })
        .coro(function* (self) {
            self.alpha = 0.5;
            yield sleepf(15);
            self.alpha = 1;
        });
}
