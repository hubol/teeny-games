import { Tx } from "../../../assets/textures";
import { scene } from "../../globals";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";
import { IcmLogTarget } from "../../utils/icm-log-target";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txs = Tx.Overlay.WarningError.split({ count: 2 });

export function objOverlayWarning() {
    let acknowledgedWarningsCount = 0;
    let acknowledgedErrorsCount = 0;

    function getWarningsCount() {
        return IcmLogTarget.singleton.errorCounts.AssertFailed
            + IcmLogTarget.singleton.errorCounts.ContractViolated
            + IcmLogTarget.singleton.errorCounts.Misconfigured;
    }

    function getErrorsCount() {
        return IcmLogTarget.singleton.errorCounts.Unexpected
            + IcmLogTarget.singleton.errorCounts.Unhandled;
    }

    return objIndexedSprite(txs)
        .mixin(mxnFxBoil, "pivot")
        .mixin(mxnPointerPress)
        .handles("mxnPointerPress:pressed", () => {
            acknowledgedWarningsCount = getWarningsCount();
            acknowledgedErrorsCount = getErrorsCount();
        })
        .step(self => {
            const hasWarnings = acknowledgedWarningsCount < getWarningsCount();
            const hasErrors = acknowledgedErrorsCount < getErrorsCount();
            const hasProblems = hasWarnings || hasErrors;
            self.visible = hasProblems;
            self.mxnPointerPress.canPress = hasProblems;
            if (!hasProblems) {
                return;
            }
            if (hasWarnings && hasErrors) {
                self.textureIndex = scene.ticker.ticks % 120 < 60 ? 1 : 0;
            }
            else {
                self.textureIndex = hasErrors ? 1 : 0;
            }
        });
}
