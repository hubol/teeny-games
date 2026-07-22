import { Coro } from "../../lib/game-engine/routines/coro";
import { interpv } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { RgbInt } from "../../lib/math/number-alias-types";
import { container } from "../../lib/pixi/container";
import { DataToppings } from "../data/data-toppings";
import { objCylinder } from "./obj-cylinder";
import { objToppingContainer } from "./obj-topping-container";

export function objToppingContainerPillar(args: objToppingContainerPillar.Args) {
    return container(
        objCylinder({
            radius: 40,
            width: 400,
            topTint: args.topTint,
            wallTint: args.wallTint,
        }),
    )
        .coro(function* (self) {
            while (true) {
                const containerObj = objToppingContainer(args.toppingProvider())
                    .scaled(0, 0)
                    .show(self);

                yield* Coro.all([
                    onPrimitiveMutate(() => args.toppingProvider()),
                    interpv(containerObj.scale).steps(4).to(1, 1).over(250),
                ]);

                containerObj.destroy();
            }
        });
}

namespace objToppingContainerPillar {
    export interface Args {
        wallTint: RgbInt;
        topTint: RgbInt;
        toppingProvider: () => DataToppings.Id;
    }
}
