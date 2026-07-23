import { Sprite } from "pixi.js";
import { container } from "../../../lib/pixi/container";
import { DataCondiments } from "../../data/data-condiments";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { objFace } from "../../mixins/mxn-face";

export function objFigureCondiment(id: DataCondiments.Id) {
    const data = DataCondiments.getById(id);

    const faceObj = objFace(data.faceTxs);
    return container(
        Sprite.from(data.bodyTxs[0])
            .step(self => self.texture = data.bodyTxs[faceObj.objFace.isSinging ? 1 : 0]),
        faceObj
            .mixin(mxnFxBoil, "position"),
    )
        .merge({ objFigureCondiment: { data } })
        .pivoted(data.pivot);
}
