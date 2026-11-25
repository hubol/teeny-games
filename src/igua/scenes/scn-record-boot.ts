import { objText } from "../../assets/fonts";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Key, layers, scene, sceneStack } from "../globals";
import { scnColorTest } from "./scn-color-test";

export function scnRecordBoot() {
    scene.style.backgroundTint = 0x808080;

    objText.Large("5", { tint: 0xffffff })
        .step(self => {
            if (Key.isDown("Space")) {
                self.destroy();
            }
        })
        .coro(function* (self) {
            for (let i = 5; i >= 1; i--) {
                self.text = String(i);
                yield sleep(1000);
            }

            layers.overlay.objOverlay.screenObj.visible = false;
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnColorTest, {}));
        })
        .at(600, 100)
        .show();
}
