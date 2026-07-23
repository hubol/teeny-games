import { Graphics, Sprite } from "pixi.js";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { DataCondiments } from "../../data/data-condiments";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { objFace } from "../../mixins/mxn-face";

export function objFigureCondiment(id: DataCondiments.Id) {
    const data = DataCondiments.getById(id);

    const collisionObj = new Graphics()
        .beginFill(0xff0000)
        .at(data.pivot)
        .drawRect(
            -Math.floor(data.collisionDimensions.x / 2),
            -data.collisionDimensions.y,
            data.collisionDimensions.x,
            data.collisionDimensions.y,
        )
        .invisible();

    const faceObj = objFace(data.faceTxs);
    return container(
        Sprite.from(data.bodyTxs[0])
            .step(self => self.texture = data.bodyTxs[faceObj.objFace.isSinging ? 1 : 0]),
        faceObj
            .mixin(mxnFxBoil, "position"),
        collisionObj,
    )
        .collisionShape(CollisionShape.DisplayObjects, [collisionObj])
        .merge({ objFigureCondiment: { data } })
        .pivoted(data.pivot);
}
