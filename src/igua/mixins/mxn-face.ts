import { Container, Texture } from "pixi.js";
import { Rng } from "../../lib/math/rng";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";

export function mxnFace(obj: Container, textures: Texture[], scale = 1) {
    objFace(textures)
        .anchored(0.5, 0.5)
        .scaled(scale, scale)
        .show(obj);

    return obj;
}

export function objFace(textures: Texture[]) {
    let singStepsCount = 0;
    let defaultTextureIndex = Rng.int(textures.length - 1);

    const api = {
        sing() {
            singStepsCount = 10;
        },
        get isSinging() {
            return singStepsCount > 0;
        },
    };

    return objIndexedSprite(textures)
        .step(self => {
            self.textureIndex = singStepsCount-- > 0 ? textures.length - 1 : defaultTextureIndex;
            if (Rng.float() < 0.15) {
                defaultTextureIndex = Rng.int(textures.length - 1);
            }
            if (Rng.float() < 0.05) {
                self.x = Rng.int(2);
                self.y = Rng.int(2);
            }
        })
        .merge({ objFace: api })
        .identify(objFace);
}
