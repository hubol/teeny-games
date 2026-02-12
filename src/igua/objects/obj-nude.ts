import { DisplayObject, Sprite, Texture } from "pixi.js";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { objDestructibleSprite } from "./obj-destructible-sprite";

interface ObjNudeArgs {
    bodyObj: DisplayObject;
    clothesTx: Texture[];
    underwearTx: Texture;
}

export function objNude({ bodyObj, clothesTx, underwearTx }: ObjNudeArgs) {
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
        bodyObj,
        underwearObj,
        clothesObj,
    )
        .merge({ objNude: { underwearObj, clothesObj } })
        .track(objNude);
}
