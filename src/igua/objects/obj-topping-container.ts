import { DisplayObject, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { mxnFxBoil } from "../mixins/fx/mxn-fx-boil";
import { mxnFxFlipH } from "../mixins/fx/mxn-fx-flip-h";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objTopping } from "./obj-topping";

export function objToppingContainer(toppingId: DataToppings.Id) {
    return objFigureToppingContainer(toppingId)
        .step(self => {
            const pointer = PizzaPointer.claim(self);
            if (pointer) {
                if (CtxLastToppingContainer.value.obj !== self) {
                    const sound = Sfx.Dialog.Toppings[toppingId];
                    sound?.rate(0.9, 1.1)?.play();
                    CtxLastToppingContainer.value.obj = self;
                }
                objTopping(PizzaTopping.create(toppingId), pointer).show();
            }
        });
}

function objFigureToppingContainer(toppingId: DataToppings.Id) {
    if (toppingId in Tx.Containers) {
        const txs = Tx.Containers[toppingId].split({ count: 2 });

        return container(
            Sprite.from(txs[0]),
            Sprite.from(txs[1]).mixin(mxnFxBoil, "position"),
        )
            .scaled(2, 2);
    }

    return Sprite.from(Tx.Containers.Pepperoni)
        .mixin(mxnFxFlipH);
}

const CtxLastToppingContainer = new SceneLocal(
    () => ({ obj: Null<DisplayObject>() }),
    "CtxLastToppingContainer",
);
