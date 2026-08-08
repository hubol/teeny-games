import { Instances } from "../../lib/game-engine/instances";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interpv } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { RgbInt } from "../../lib/math/number-alias-types";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { DataToppings } from "../data/data-toppings";
import { objCylinder } from "./obj-cylinder";
import { objToppingContainer } from "./obj-topping-container";

export function objToppingContainerPillar(args: objToppingContainerPillar.Args) {
    const api = {
        containerObj: Null<objToppingContainer.Type>(),
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
                const containerObj = objToppingContainer(args.toppingProvider())
                    .scaled(0, 0)
                    .show(self);

                api.containerObj = containerObj;

                yield* Coro.all([
                    onPrimitiveMutate(() => args.toppingProvider()),
                    interpv(containerObj.scale).steps(4).to(1, 1).over(250),
                ]);

                containerObj.destroy();
            }
        })
        .track(objToppingContainerPillar);
}

namespace objToppingContainerPillar {
    export interface Args {
        wallTint: RgbInt;
        topTint: RgbInt;
        toppingProvider: () => DataToppings.Id;
    }
}

objToppingContainerPillar.getActiveTopping = function getActiveTopping () {
    let tick = Number.MIN_SAFE_INTEGER;
    let toppingId = Null<DataToppings.Id>();

    for (const pillarObj of Instances(objToppingContainerPillar)) {
        const containerApi = pillarObj.objToppingContainerPillar.containerObj?.objToppingContainer;

        if (!containerApi || !containerApi.activeSinceTick) {
            continue;
        }

        if (containerApi.activeSinceTick > tick) {
            tick = containerApi.activeSinceTick;
            toppingId = containerApi.toppingId;
        }
    }

    return toppingId;
};
