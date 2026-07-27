import { Integer } from "../../lib/math/number-alias-types";
import { DataToppings } from "./data-toppings";

export interface PizzaTopping {
    data: DataToppings.Model.Loose;
    seed: Integer;
}

let seed = 0;

export namespace PizzaTopping {
    export function create(id: DataToppings.Id): PizzaTopping {
        return {
            data: DataToppings.getByIdLoose(id),
            seed: seed++,
        };
    }
}
