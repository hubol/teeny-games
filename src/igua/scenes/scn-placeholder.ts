import { ColorMatrixFilter, Graphics } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { ZIndex } from "../core/scene/z-index";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objFish } from "../objects/obj-fish";
import { objKelp } from "../objects/obj-kelp";
import { objNyfish } from "../objects/obj-nyfish";

// TODO all get scared sometimes
// TODO a colorful one
// TODO they are happy with it so far

export function scnPlaceholder() {
    const lvl = Lvl.Aquarium();

    const prng = new PseudoRng(9934941);
    prng.bool();

    const filter = new ColorMatrixFilter();
    filter.greyscale(0.25, true);

    const fishesObj = container()
        .filtered(filter)
        .zIndexed(ZIndex.Entities)
        .show();

    new Graphics()
        .beginFill(0xffffff)
        .drawEllipse(renderer.width / 2, renderer.height, renderer.width * 1.5, 400)
        .mixin(mxnFxBoilDisplacement)
        .show(fishesObj);

    [lvl.KelpGroup0, lvl.KelpGroup1, lvl.KelpGroup2, lvl.KelpGroup4, lvl.KelpGroup5, lvl.KelpGroup6]
        .forEach(obj => obj.mixin(mxnFxBoilDisplacement, { scale: 10, rate: 0.1 }));

    for (let i = 0; i < 15; i++) {
        // const scale = Rng.float(1, 3);
        objNyfish()
            .at(prng.int(-200, renderer.width), prng.int(-100, renderer.height - 400))
            .coro(function* (self) {
                const position = self.vcpy();
                self.step(() => {
                    position.x += 0.5;
                    position.y += Math.sin(i + scene.ticker.ticks / 30) * 0.3;
                    if (position.x >= renderer.width) {
                        position.x = -215;
                    }
                    self.at(position).vround();
                });
            })
            .show(fishesObj);

        // if (i % 3 === 2) {
        //     objKelp()
        //         .at((i / 15) * renderer.width, renderer.height + (Math.sin(i)) * 100)
        //         .show(fishesObj);
        // }
    }
}
