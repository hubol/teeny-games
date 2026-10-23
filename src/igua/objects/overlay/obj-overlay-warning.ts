import { Tx } from "../../../assets/textures";
import { CountingLogTarget } from "../../../lib/game-engine/counting-log-target";
import { container } from "../../../lib/pixi/container";
import { renderer } from "../../current-pixi-renderer";
import { scene } from "../../globals";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txs = Tx.Overlay.WarningError.split({ count: 2 });

export function objOverlayWarning() {
    let acknowledgedWarningsCount = 0;
    let acknowledgedErrorsCount = 0;

    function getWarningsCount() {
        return CountingLogTarget.singleton.errorCounts.AssertFailed
            + CountingLogTarget.singleton.errorCounts.ContractViolated
            + CountingLogTarget.singleton.errorCounts.Misconfigured;
    }

    function getErrorsCount() {
        return CountingLogTarget.singleton.errorCounts.Unexpected
            + CountingLogTarget.singleton.errorCounts.Unhandled;
    }

    const f = Math.min(1, renderer.width / 1920);
    const m = Math.round(f * 8);

    return container(
        objIndexedSprite(txs)
            .at(m, m)
            .scaled(f, f)
            .step(self => {
                const hasWarnings = acknowledgedWarningsCount < getWarningsCount();
                const hasErrors = acknowledgedErrorsCount < getErrorsCount();
                const hasProblems = hasWarnings || hasErrors;
                self.visible = hasProblems;
                if (!hasProblems) {
                    return;
                }
                if (hasWarnings && hasErrors) {
                    self.textureIndex = scene.ticker.ticks % 120 < 60 ? 1 : 0;
                }
                else {
                    self.textureIndex = hasErrors ? 1 : 0;
                }
            }),
    )
        .step(self => {
            self.pivot.set(Math.sin(scene.ticker.ticks / 20), Math.cos(scene.ticker.ticks / 30));
        });
}
