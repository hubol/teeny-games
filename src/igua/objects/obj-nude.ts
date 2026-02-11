import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { objDestructibleSprite } from "./obj-destructible-sprite";

const txsFag = Tx.Nudes.DemoFag.split({ count: 3 });

export function objNude() {
    const underwearObj = objDestructibleSprite(txsFag[1], 8)
        .collisionShape(CollisionShape.Children)
        .merge({ objUnderwear: { isConcealed: true } })
        .step(self => {
            if (self.objUnderwear.isConcealed) {
                self.objUnderwear.isConcealed = Boolean(self.collidesOne(clothesObj.children));
            }
        });
    const clothesObj = objDestructibleSprite(txsFag[2], 8);

    return container(
        Sprite.from(txsFag[0]),
        underwearObj,
        clothesObj,
    )
        .merge({ objNude: { underwearObj, clothesObj } })
        .track(objNude);
}
