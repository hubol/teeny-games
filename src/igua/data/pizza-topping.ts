import { Integer } from "../../lib/math/number-alias-types";
import { DataToppings } from "./data-toppings";

export interface PizzaTopping {
    attributes: DataToppings.Model;
    seed: Integer;
}

let seed = 0;

export namespace PizzaTopping {
    export function create(id: DataToppings.Id): PizzaTopping {
        return {
            attributes: DataToppings.getByIdLoose(id),
            seed: seed++,
        };
    }
}
