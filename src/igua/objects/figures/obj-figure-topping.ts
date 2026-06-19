import { PizzaTopping } from "../../data/pizza-topping";

export function objFigureTopping(topping: PizzaTopping) {
    return topping.attributes.objFigure(topping.seed)
        .merge({ objFigureTopping: topping });
}
