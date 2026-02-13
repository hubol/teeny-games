import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { objDestructibleSprite } from "./obj-destructible-sprite";

interface ObjNudeArgs {
    bodyObj: DisplayObject;
    clothesTxs: Texture[];
    underwearTxs: Texture[];
    genitalCoveringTx: Texture;
}

export function objNude({ bodyObj, clothesTxs, genitalCoveringTx, underwearTxs }: ObjNudeArgs) {
    const strippableObjs = new Array<Container>();

    const genitalCoveringBaseObj = objDestructibleSprite([genitalCoveringTx], 8);

    const maxUnderwearObjsCount = genitalCoveringBaseObj.children.length;

    const underwearObjs = underwearTxs.map(tx => objDestructibleSprite([tx], 8));

    const genitalCoveringObj = genitalCoveringBaseObj
        .collisionShape(CollisionShape.Children)
        .merge({ objGenitalCovering: { coverageUnit: 1 } })
        .step(self => self.objGenitalCovering.coverageUnit = self.children.length / maxUnderwearObjsCount);

    underwearObjs.push(genitalCoveringObj);

    const clothesObj = objDestructibleSprite(clothesTxs, 8);

    return container(
        bodyObj,
        ...underwearObjs,
        clothesObj,
    )
        .step(() => {
            strippableObjs.length = 0;
            strippableObjs.push(clothesObj);
            for (const underwearObj of underwearObjs) {
                if (!underwearObj.collidesOne(clothesObj.children)) {
                    strippableObjs.push(underwearObj);
                }
            }
        })
        .merge({
            objNude: {
                get genitalCoverageUnit() {
                    return genitalCoveringObj.objGenitalCovering.coverageUnit;
                },
                strippableObjs: strippableObjs as ReadonlyArray<Container>,
            },
        })
        .track(objNude);
}

export type ObjNude = ReturnType<typeof objNude>;
