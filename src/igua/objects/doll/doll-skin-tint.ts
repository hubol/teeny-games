import { blendColor } from "../../../lib/color/blend-color";
import { Unit } from "../../../lib/math/number-alias-types";
import { Rng } from "../../../lib/math/rng";

export namespace DollSkinTint {
    const primary = [0x1a1109, 0xcea488];
    const accent = [0x0e0803, 0xaa7e60];

    export function createValue(): Unit {
        return Rng.float();
    }

    export function getPrimary(value: Unit) {
        return blendColor(primary[0], primary[1], value);
    }

    export function getAccent(value: Unit) {
        return blendColor(accent[0], accent[1], value);
    }
}
