import { Container, DisplacementFilter, DisplayObject, Sprite } from "pixi.js";
import { NoAtlasTx } from "../../../assets/no-atlas-textures";
import { Rng } from "../../../lib/math/rng";
import { layers, scene } from "../../globals";

let globalSeed = 0;

interface MxnBoilDisplacementArgs {
    rate: number;
    scale: number;
}

export function mxnFxBoilDisplacement(obj: DisplayObject, args: MxnBoilDisplacementArgs = { rate: 0.03, scale: 10 }) {
    const seed = globalSeed += 29;

    return obj
        .merge({ mxnBoilDisplacement: args })
        .coro(function* (self) {
            const displacementObj = Sprite.from(NoAtlasTx.Fx.Displacement)
                .step(() => {
                    if (self.destroyed) {
                        displacementObj.destroy();
                        filter.destroy();
                    }
                })
                .show(layers.overlay as any as Container);
            const filter = new DisplacementFilter(displacementObj, args.scale);
            filter.padding = 10;

            self
                .filtered(filter)
                .coro(function* (self) {
                    while (true) {
                        let x = 0;
                        yield () => (x += args.rate) >= 1;
                        displacementObj.position.at(0, 0).add(self, 1).add(Rng.float(256), Rng.float(256));
                    }
                })
                .step(() => {
                    filter.scale.set(args.scale);
                });
        });
}
