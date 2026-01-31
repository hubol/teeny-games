import { DisplacementFilter, DisplayObject, Sprite } from "pixi.js";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { scene } from "../globals";

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
            const displacementObj = Sprite.from(NoAtlasTx.Effects.Displacement).show();
            self.on("destroyed", () => {
                if (!displacementObj.destroyed) {
                    displacementObj.destroy();
                }
            });

            const filter = new DisplacementFilter(displacementObj, args.scale);

            self
                .filtered(filter)
                .step(() => {
                    const time = Math.round(seed + scene.ticker.ticks * args.rate);
                    displacementObj.position.at(0, 0).add(self, 1).add(time * 16, time * 16);
                });
        });
}
