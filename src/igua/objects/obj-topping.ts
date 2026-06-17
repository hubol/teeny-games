import { PointerListener } from "../../lib/browser/pointer-listener";
import { DataToppings } from "../data/data-toppings";
import { objFigureTopping } from "./figures/obj-figure-topping";

export function objTopping(id: DataToppings.Id, pointer: PointerListener.State) {
    return objFigureTopping(id)
        .step(self => self.at(pointer))
        .at(pointer);
}
