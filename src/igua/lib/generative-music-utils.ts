import { cyclic } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { ForceAliasType } from "../../lib/types/force-alias-type";

export const MusicScaleRatesC = {};

export namespace GenerativeMusicUtils {
    type RootIndex = ForceAliasType<number>;
    type RateIndex = ForceAliasType<number>;
    type Rate = ForceAliasType<number>;

    const c4Hz = 261.63;
    const cScaleRates: Rate[] = [
        c4Hz,
        277.18,
        293.66,
        311.13,
        329.63,
        349.23,
        369.99,
        392.00,
        415.30,
        440.00,
        466.16,
        493.88,
    ]
        .map(hz => hz / c4Hz);

    const scales = {
        major: [0, 2, 4, 5, 7, 9, 11] as RateIndex[],
        minor: [0, 2, 3, 5, 7, 9, 11] as RateIndex[],
        blues: [0, 3, 5, 6, 7, 10] as RateIndex[],
    };

    export function getRate(rootIndex: Integer, scale: ScaleId) {
        return cyclic(rootIndex + Rng.item(scales[scale]), 0, cScaleRates.length) * Rng.choose(0.5, 1);
    }

    export type ScaleId = keyof typeof scales;
}
