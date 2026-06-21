import { Container } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Integer } from "../../lib/math/number-alias-types";
import { PseudoRng } from "../../lib/math/rng";
import { mxnFace } from "./mxn-face";

const prng = new PseudoRng();

const txsIdle = Tx.Faces.Idle.split({ width: 284 });
txsIdle.splice(2, 1);
const txsSing = Tx.Faces.Sing.split({ width: 284 });

export function mxnFaceSeed(obj: Container, seed: Integer, scale: number) {
    prng.seed = 654321 + Math.pow(seed % 100, 3) + seed;
    prng.bool();
    return obj
        .mixin(mxnFace, [prng.item(txsIdle), prng.item(txsSing)], scale);
}
