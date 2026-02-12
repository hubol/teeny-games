import { Sprite, Texture } from "pixi.js";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { objDestructibleSprite } from "./obj-destructible-sprite";

interface ObjNudeArgs {
    bodyTx: Texture;
    clothesTx: Texture[];
    underwearTx: Texture;
}

export function objNude({ bodyTx, clothesTx, underwearTx }: ObjNudeArgs) {
    const underwearObj = objDestructibleSprite([underwearTx], 8)
        .collisionShape(CollisionShape.Children)
        .merge({ objUnderwear: { isConcealed: true } })
        .step(self => {
            if (self.objUnderwear.isConcealed) {
                self.objUnderwear.isConcealed = Boolean(self.collidesOne(clothesObj.children));
            }
        });
    const clothesObj = objDestructibleSprite(clothesTx, 8);

    return container(
        Sprite.from(bodyTx),
        underwearObj,
        clothesObj,
    )
        .merge({ objNude: { underwearObj, clothesObj } })
        .track(objNude);
}
