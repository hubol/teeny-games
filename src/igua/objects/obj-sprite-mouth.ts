import { Sprite, Texture } from "pixi.js";
import { mxnMouth } from "../mixins/mxn-mouth";

export function objSpriteMouth(textures: Texture[]) {
    return Sprite.from(textures[0])
        .mixin(mxnMouth)
        .step(self => {
            const index = Math.floor(textures.length * self.mxnMouth.agapeUnit);
            self.texture = textures[Math.max(0, Math.min(textures.length - 1, index))];
        });
}
