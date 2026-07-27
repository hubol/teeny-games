import { Sfx } from "../../../assets/sounds";
import { PizzaToppingBanks } from "../../data/pizza-topping-banks";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";
import { objFigureToppingBanks } from "../figures/obj-figure-topping-banks";

export function objToolBankSwapper(banks: PizzaToppingBanks.Model) {
    return objFigureToppingBanks(banks)
        .mixin(mxnPointerPress)
        .handles("mxnPointerPress:pressed", (self) => {
            if (banks.unlockedCount === 0) {
                return;
            }

            self.play(Sfx.Tools.SwapBank.rate(0.9, 1.1));
            banks.swap();
        });
}
