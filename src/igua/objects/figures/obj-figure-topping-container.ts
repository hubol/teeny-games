import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { container } from "../../../lib/pixi/container";
import { DataToppings } from "../../data/data-toppings";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnFxFlipH } from "../../mixins/fx/mxn-fx-flip-h";

export function objFigureToppingContainer(toppingId: DataToppings.Id) {
    const api = {
        happyStepsCount: 0,
    };

    const obj = container()
        .merge({ objFigureToppingContainer: api })
        .step(() => api.happyStepsCount--);

    if (toppingId in Tx.Containers && toppingId in Tx.Containers.Happy) {
        // @ts-expect-error Why didn't previous check work nerd
        const txs = Tx.Containers[toppingId].split({ count: 2 });
        // @ts-expect-error See above
        const happyTxs = Tx.Containers.Happy[toppingId].split({ count: 2 });

        container(
            Sprite.from(txs[0])
                .step(self => self.texture = api.happyStepsCount <= 0 ? txs[0] : happyTxs[0]),
            Sprite.from(txs[1])
                .mixin(mxnFxBoil, "position")
                .step(self => self.texture = api.happyStepsCount <= 0 ? txs[1] : happyTxs[1]),
        )
            .pivoted(DataToppings.getById(toppingId).containerPivot)
            .scaled(2, 2)
            .show(obj);
    }
    else {
        Sprite.from(Tx.Containers.Pepperoni)
            .mixin(mxnFxFlipH)
            .show(obj);
    }

    return obj;
}
