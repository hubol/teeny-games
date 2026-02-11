import { Sprite, Texture } from "pixi.js";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { objDestructibleSprite } from "./obj-destructible-sprite";

export function objNude(textures: Texture[]) {
    const underwearObj = objDestructibleSprite(textures[1], 8)
        .collisionShape(CollisionShape.Children)
        .merge({ objUnderwear: { isConcealed: true } })
        .step(self => {
            if (self.objUnderwear.isConcealed) {
                self.objUnderwear.isConcealed = Boolean(self.collidesOne(clothesObj.children));
            }
        });
    const clothesObj = objDestructibleSprite(textures[2], 8);

    return container(
        Sprite.from(textures[0]),
        underwearObj,
        clothesObj,
    )
        .merge({ objNude: { underwearObj, clothesObj } })
        .track(objNude);
}
