import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnFxBoilDisplacement } from "../../mixins/fx/mxn-fx-boil-displacement";

const [txAura, txBody, txFace] = Tx.Overlay.GoButton.split({ count: 3, trimFrame: true });

export function objOverlayGoButton() {
    const bodyObj = Sprite.from(txBody); // .trimmed();

    return container(
        Sprite.from(txAura)
            .mixin(mxnFxBoilDisplacement),
        bodyObj,
        Sprite.from(txFace).mixin(mxnFxBoil, "pivot"),
    )
        .scaled(2, 2)
        .collisionShape(CollisionShape.DisplayObjects, [bodyObj]);
}
