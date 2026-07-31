import { Sfx } from "../../../assets/sounds";
import { container } from "../../../lib/pixi/container";
import { PizzaToppingBanks } from "../../data/pizza-topping-banks";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";
import { objFigureToppingBanks } from "../figures/obj-figure-topping-banks";
import { objToolAlarm } from "./obj-tool-alarm";

export function objToolBankSwapper(banks: PizzaToppingBanks.Model) {
    return container(
        objFigureToppingBanks(banks),
        objToolAlarm(() => banks.unlockedCount > 1, 15)
            .handles("objToolAlarm:fire", () => {
                Sfx.Effects.Reset.play();
                banks.reset();
            }),
    )
        .mixin(mxnPointerPress)
        .handles("mxnPointerPress:pressed", (self) => {
            if (banks.unlockedCount === 0) {
                return;
            }

            self.play(Sfx.Tools.SwapBank.rate(0.9, 1.1));
            banks.swap();
        });
}
