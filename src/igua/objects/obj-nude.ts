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

    const api = {
        isStrippable: true,
        get genitalCoverageUnit() {
            return genitalCoveringObj.objGenitalCovering.coverageUnit;
        },
        strippableObjs: strippableObjs as ReadonlyArray<Container>,
        peekLayer: "top" as ObjNude.PeekLayer,
    };

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
        container(...underwearObjs)
            .step(self => self.visible = api.peekLayer !== "nude"),
        clothesObj
            .step(self => self.visible = api.peekLayer === "top"),
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
        .merge({ objNude: api })
        .track(objNude);
}

export type ObjNude = ReturnType<typeof objNude>;

export namespace ObjNude {
    export type PeekLayer = "top" | "underwear" | "nude";
}
