import { Container, Texture } from "pixi.js";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";

export function mxnFace(obj: Container, textures: Texture[]) {
    let singStepsCount = 0;
    const faceObj = objIndexedSprite(textures)
        .anchored(0.5, 0.5)
        .step(self => self.textureIndex = singStepsCount-- > 0 ? 1 : 0);

    const api = {
        sing() {
            singStepsCount = 10;
        },
    };

    faceObj.show(obj);

    return obj
        .merge({ mxnFace: api });
}
