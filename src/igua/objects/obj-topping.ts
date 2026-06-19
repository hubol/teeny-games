import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { PizzaTopping } from "../data/pizza-topping";
import { objFigureTopping } from "./figures/obj-figure-topping";
import { objPizza } from "./obj-pizza";

export function objTopping(topping: PizzaTopping, pointer: PointerListener.State) {
    return objFigureTopping(topping)
        .step(self => {
            self.at(pointer);

            if (!pointer.down) {
                const pizzaObj = self.collidesOne(Instances(objPizza));
                if (!pizzaObj) {
                    return;
                }
                pizzaObj.objPizza.submit(self.x, self.y, self.objFigureTopping);
                self.destroy();
            }
        })
        .at(pointer);
}
