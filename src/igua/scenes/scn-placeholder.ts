import { ColorMatrixFilter, DisplayObject, Graphics } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Instances } from "../../lib/game-engine/instances";
import { Integer } from "../../lib/math/number-alias-types";
import { PseudoRng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { ZIndex } from "../core/scene/z-index";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objFxGodRay } from "../objects/fx/obj-fx-god-ray";
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
        .zIndexed(ZIndex.BackDecals)
        .show();

    scene.sandStage.mixin(mxnFxBoilDisplacement);

    const dyMap = new WeakMap<DisplayObject, Integer>();

    new Graphics()
        .step(self => {
            self.clear().beginFill(0x101010, 0.1);
            for (const obj of Instances(mxnShadowCaster)) {
                if (!dyMap.has(obj)) {
                    dyMap.set(obj, prng.int(-200, 0));
                }
                const bounds = obj.getBounds();
                const center = bounds.getCenter();
                const dy = dyMap.get(obj)!;
                const y = Math.max(center.y + bounds.height / 2, 1050 + dy);
                const halfHeight = 18 + bounds.height / 20;

                self.drawRoundedRect(bounds.x + 30, y - halfHeight, bounds.width - 60, halfHeight * 2, 999);
                self.drawRoundedRect(bounds.x + 50, y - halfHeight / 2, bounds.width - 100, halfHeight, 999);
            }
        })
        .show(entitiesObj);

    const fishesObj = container()
        .filtered(filter)
        .show(entitiesObj);

    [lvl.KelpGroup0, lvl.KelpGroup1, lvl.KelpGroup2, lvl.KelpGroup4, lvl.KelpGroup5, lvl.KelpGroup6, lvl.WaterSurface]
        .forEach(obj => obj.mixin(mxnFxBoilDisplacement, { scale: 10, rate: 0.1 }));

    [lvl.FxWaterSurface, lvl.FxWaterSurface_1]
        .forEach((obj, i) =>
            obj.step(() => {
                const f = Math.sin(i * 2 + scene.ticker.ticks / (25 + i)) * 24;
                obj.x = Math.round(f / 10) * 6;
            })
        );

    for (const fishPosition of fishPositions) {
        // const scale = Rng.float(1, 3);
        objNyfish(prng)
            .at(fishPosition)
            .coro(function* (self) {
                const position = self.vcpy();
                self.step(() => {
                    position.x += 0.5;
                    position.y += Math.sin(fishPosition.x + scene.ticker.ticks / 30) * 0.3;
                    if (position.x >= renderer.width) {
                        position.x = -362;
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

    objFxGodRay(prng)
        .zIndexed(ZIndex.Entities)
        .show();
}

function mxnShadowCaster(obj: DisplayObject) {
    return obj
        .track(mxnShadowCaster);
}
