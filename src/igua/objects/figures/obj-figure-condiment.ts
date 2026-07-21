import { Sprite } from "pixi.js";
import { container } from "../../../lib/pixi/container";
import { DataCondiments } from "../../data/data-condiments";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { objFace } from "../../mixins/mxn-face";

export function objFigureCondiment(id: DataCondiments.Id) {
    const data = DataCondiments.getById(id);

    return container(
        Sprite.from(data.bodyTx),
        objFace(data.faceTxs)
            .mixin(mxnFxBoil, "position"),
    )
        .merge({ objFigureCondiment: { data } })
        .pivoted(data.pivot);
}
