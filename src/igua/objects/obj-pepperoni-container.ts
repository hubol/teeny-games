import { Rectangle, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { mxnFxFlipH } from "../mixins/fx/mxn-fx-flip-h";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objTopping } from "./obj-topping";

const r = new Rectangle();

export function objPepperoniContainer(toppingId: DataToppings.Id) {
    return Sprite.from(Tx.Containers.Pepperoni)
        .mixin(mxnFxFlipH)
        .step(self => {
            const pointer = PizzaPointer.claim(self);
            if (pointer) {
                objTopping(PizzaTopping.create(toppingId), pointer).show();
            }
        });
}
