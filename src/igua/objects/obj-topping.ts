import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { DataToppings } from "../data/data-toppings";
import { objFigureTopping } from "./figures/obj-figure-topping";
import { objPizza } from "./obj-pizza";

export function objTopping(id: DataToppings.Id, pointer: PointerListener.State) {
    return objFigureTopping(id)
        .step(self => {
            self.at(pointer);

            if (!pointer.down) {
                const pizzaObj = self.collidesOne(Instances(objPizza));
                if (!pizzaObj) {
                    return;
                }
                pizzaObj.objPizza.submit(self.x, self.y, self.objFigureTopping.id);
                self.destroy();
            }
        })
        .at(pointer);
}
