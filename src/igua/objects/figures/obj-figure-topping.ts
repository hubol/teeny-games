import { DataToppings } from "../../data/data-toppings";

export function objFigureTopping(id: DataToppings.Id) {
    return DataToppings.getById(id).objFigure();
}
