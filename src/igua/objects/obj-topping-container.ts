import { DisplayObject, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { Null } from "../../lib/types/null";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { mxnFxFlipH } from "../mixins/fx/mxn-fx-flip-h";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objTopping } from "./obj-topping";

export function objToppingContainer(toppingId: DataToppings.Id) {
    return Sprite.from(Tx.Containers.Pepperoni)
        .mixin(mxnFxFlipH)
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

const CtxLastToppingContainer = new SceneLocal(
    () => ({ obj: Null<DisplayObject>() }),
    "CtxLastToppingContainer",
);
