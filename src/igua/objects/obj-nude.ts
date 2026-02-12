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
    const underwearBaseObj = objDestructibleSprite([underwearTx], 8);

    const maxUnderwearObjsCount = underwearBaseObj.children.length;

    const underwearObj = underwearBaseObj
        .collisionShape(CollisionShape.Children)
        .merge({ objUnderwear: { isConcealed: true, coverageUnit: 1 } })
        .step(self => {
            self.objUnderwear.coverageUnit = self.children.length / maxUnderwearObjsCount;
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

export type ObjNude = ReturnType<typeof objNude>;
