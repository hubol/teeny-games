import { PizzaTopping } from "../../data/pizza-topping";

export function objFigureTopping(topping: PizzaTopping) {
    return topping.data.objFigure(topping.seed)
        .merge({ objFigureTopping: topping });
}
