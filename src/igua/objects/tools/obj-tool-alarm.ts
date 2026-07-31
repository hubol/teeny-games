import { Seconds } from "../../../lib/math/number-alias-types";
import { container } from "../../../lib/pixi/container";
import { scene } from "../../globals";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { PizzaPointer } from "../../utils/pizza-pointer";
import { objCharacterStopwatch } from "../characters/obj-character-stopwatch";

export function objToolAlarm(condition: () => boolean, halfTimeoutSeconds: Seconds) {
    let lastFiredTick = -999;
    const stopwatchObj = objCharacterStopwatch();

    return container(
        stopwatchObj
            .mixin(mxnFxBoil, "position"),
    )
        .dispatches<"objToolAlarm:fire">()
        .step((self) => {
            if (!condition()) {
                stopwatchObj.visible = false;
                return;
            }

            const referenceTickDuration = Math.min(
                scene.ticker.ticks - lastFiredTick,
                PizzaPointer.getTicksSinceDown(),
            );
            const timeout = referenceTickDuration / (halfTimeoutSeconds * 60);
            stopwatchObj.visible = timeout >= 1;
            if (timeout >= 1) {
                stopwatchObj.objCharacterStopwatch.fillUnit = Math.max(0, Math.min(1, 1 - (timeout - 1)));
            }

            if (timeout >= 2) {
                lastFiredTick = scene.ticker.ticks;
                self.dispatch("objToolAlarm:fire");
            }
        });
}
