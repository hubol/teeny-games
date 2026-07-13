import { Sfx } from "../../assets/sounds";
import { Integer } from "../../lib/math/number-alias-types";
import { PseudoRng } from "../../lib/math/rng";

const rng = new PseudoRng();

export namespace DataToppingsSfx {
    const pickSfxs = Object.values(Sfx.Toppings.Pick);
    const placeSfxs = Object.values(Sfx.Toppings.Place);

    export function create(seed: Integer) {
        rng.seed = seed;
        rng.bool();

        const pickSfx = rng.item(pickSfxs);
        const placeSfx = rng.item(placeSfxs);
        const pickRate = rng.float(0.5, 1.5);
        const placeRate = rng.float(0.5, 1.5);

        return {
            get pick() {
                return pickSfx.rate(pickRate, pickRate + 0.2);
            },
            get place() {
                return placeSfx.rate(placeRate, placeRate + 0.2);
            },
        };
    }

    export type Model = ReturnType<typeof create>;
}
