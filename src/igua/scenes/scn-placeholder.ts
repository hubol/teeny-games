import { ColorMatrixFilter, DisplayObject, Graphics } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Instances } from "../../lib/game-engine/instances";
import { Integer } from "../../lib/math/number-alias-types";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { ZIndex } from "../core/scene/z-index";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objFish } from "../objects/obj-fish";
import { objKelp } from "../objects/obj-kelp";
import { objNyfish } from "../objects/obj-nyfish";
import { Search } from "../utils/search";

// TODO all get scared sometimes
// TODO a colorful one
// TODO they are happy with it so far

export function scnPlaceholder() {
    const lvl = Lvl.Aquarium();

    const fishPositions = Search.findMarkers(0x00ff00);

    const prng = new PseudoRng(99349415);
    prng.bool();

    const filter = new ColorMatrixFilter();
    filter.greyscale(0.25, true);

    const entitiesObj = container()
        .mixin(mxnFxBoilDisplacement)
        .zIndexed(ZIndex.Entities)
        .show();

    new Graphics()
        .beginFill(0xffffff)
        .drawEllipse(renderer.width / 2, renderer.height, renderer.width * 1.5, 400)
        .mixin(mxnFxBoilDisplacement)
        .show(entitiesObj);

    const dyMap = new WeakMap<DisplayObject, Integer>();

    new Graphics()
        .step(self => {
            self.clear().beginFill(0x101010, 0.5);
            for (const obj of Instances(mxnShadowCaster)) {
                if (!dyMap.has(obj)) {
                    dyMap.set(obj, Rng.int(-100, 0));
                }
                const bounds = obj.getBounds();
                const center = bounds.getCenter();
                const dy = dyMap.get(obj)!;
                self.drawEllipse(center.x, 1000 + dy, bounds.width / 2, 8 + bounds.height / 32);
            }
        })
        .show(entitiesObj);

    const fishesObj = container()
        .filtered(filter)
        .show(entitiesObj);

    [lvl.KelpGroup0, lvl.KelpGroup1, lvl.KelpGroup2, lvl.KelpGroup4, lvl.KelpGroup5, lvl.KelpGroup6]
        .forEach(obj => obj.mixin(mxnFxBoilDisplacement, { scale: 10, rate: 0.1 }));

    for (const fishPosition of fishPositions) {
        // const scale = Rng.float(1, 3);
        objNyfish()
            .at(fishPosition)
            .coro(function* (self) {
                const position = self.vcpy();
                self.step(() => {
                    position.x += 0.5;
                    position.y += Math.sin(fishPosition.x + scene.ticker.ticks / 30) * 0.3;
                    if (position.x >= renderer.width) {
                        position.x = -self.width;
                    }
                    self.at(position).vround();
                });
            })
            .mixin(mxnShadowCaster)
            .show(fishesObj);

        // if (i % 3 === 2) {
        //     objKelp()
        //         .at((i / 15) * renderer.width, renderer.height + (Math.sin(i)) * 100)
        //         .show(fishesObj);
        // }
    }
}

function mxnShadowCaster(obj: DisplayObject) {
    return obj
        .track(mxnShadowCaster);
}
