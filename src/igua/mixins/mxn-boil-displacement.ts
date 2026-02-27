import { Container, DisplacementFilter, DisplayObject, Sprite } from "pixi.js";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { layers, scene } from "../globals";

let globalSeed = 0;

interface MxnBoilDisplacementArgs {
    rate: number;
    scale: number;
}

export function mxnBoilDisplacement(obj: DisplayObject, args: MxnBoilDisplacementArgs = { rate: 0.1, scale: 10 }) {
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
                .step(() => {
                    const time = Math.round(seed + scene.ticker.ticks * args.rate);
                    displacementObj.position.at(0, 0).add(self, 1).add(time * 16, time * 16);
                });
        });
}
