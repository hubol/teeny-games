import { Sfx } from "../../../assets/sounds";
import { container } from "../../../lib/pixi/container";
import { PizzaToppingBanks } from "../../data/pizza-topping-banks";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";
import { PizzaPointer } from "../../utils/pizza-pointer";
import { objCharacterStopwatch } from "../characters/obj-character-stopwatch";
import { objFigureToppingBanks } from "../figures/obj-figure-topping-banks";

export function objToolBankSwapper(banks: PizzaToppingBanks.Model) {
    const stopwatchObj = objCharacterStopwatch()
        .mixin(mxnFxBoil, "position");

    return container(
        objFigureToppingBanks(banks),
        stopwatchObj,
    )
        .mixin(mxnPointerPress)
        .handles("mxnPointerPress:pressed", (self) => {
            if (banks.unlockedCount === 0) {
                return;
            }

            self.play(Sfx.Tools.SwapBank.rate(0.9, 1.1));
            banks.swap();
        })
        .step(() => {
            const timeout = PizzaPointer.getTicksSinceDown() / (15 * 60);
            stopwatchObj.visible = banks.unlockedCount > 1 && timeout >= 1;
            if (timeout >= 1) {
                stopwatchObj.objCharacterStopwatch.fillUnit = Math.max(0, Math.min(1, 1 - (timeout - 1)));
            }

            if (banks.unlockedCount > 1 && timeout >= 2) {
                Sfx.Effects.Reset.play();
                banks.reset();
            }
        });
}
