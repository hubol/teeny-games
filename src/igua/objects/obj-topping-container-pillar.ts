import { Coro } from "../../lib/game-engine/routines/coro";
import { interpv } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { RgbInt } from "../../lib/math/number-alias-types";
import { container } from "../../lib/pixi/container";
import { DataToppings } from "../data/data-toppings";
import { objCylinder } from "./obj-cylinder";
import { objToppingContainer } from "./obj-topping-container";

export function objToppingContainerPillar(args: objToppingContainerPillar.Args) {
    const api = {
        toppingId: args.defaultToppingId,
    };

    return container(
        objCylinder({
            radius: 40,
            width: 400,
            topTint: args.topTint,
            wallTint: args.wallTint,
        }),
    )
        .merge({ objToppingContainerPillar: api })
        .coro(function* (self) {
            while (true) {
                const containerObj = objToppingContainer(api.toppingId)
                    .scaled(0, 0)
                    .show(self);

                yield* Coro.all([
                    onPrimitiveMutate(() => api.toppingId),
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
        defaultToppingId: DataToppings.Id;
    }
}
