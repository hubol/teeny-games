import { ColorMatrixFilter, Graphics } from "pixi.js";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objFish } from "../objects/obj-fish";
import { objKelp } from "../objects/obj-kelp";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x808080;

    const prng = new PseudoRng(9934941);
    prng.bool();

    const filter = new ColorMatrixFilter();
    filter.greyscale(0.25, true);

    const fishesObj = container()
        .mixin(mxnFxBoilDisplacement)
        .filtered(filter)
        .show();

    new Graphics()
        .beginFill(0xffffff)
        .drawEllipse(renderer.width / 2, renderer.height, renderer.width * 1.5, 400)
        .show(fishesObj);

    for (let i = 0; i < 15; i++) {
        const scale = Rng.float(1, 3);
        objFish()
            .at(prng.int(-200, renderer.width), prng.int(-100, renderer.height - 400))
            .coro(function* (self) {
                const position = self.vcpy();
                self.step(() => {
                    position.x += 0.5;
                    position.y += Math.sin(i + scene.ticker.ticks / 30) * 0.3;
                    if (position.x >= renderer.width) {
                        position.x = -215 * scale;
                    }
                    self.at(position).vround();
                });
            })
            .scaled(scale, scale)
            .show(fishesObj);

        if (i % 3 === 2) {
            objKelp()
                .at((i / 15) * renderer.width, renderer.height + (Math.sin(i)) * 100)
                .show(fishesObj);
        }
    }
}
