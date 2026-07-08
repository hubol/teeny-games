import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";

const txsMagnet = Tx.Characters.Magnet.split({ count: 2 });

export function objCharacterMagnet() {
    return container(
        ...txsMagnet.map(tx =>
            Sprite.from(tx)
                .anchored(0.5, 0.5)
                .scaled(3, 3)
                .mixin(mxnFxBoil, "position")
        ),
    );
}
