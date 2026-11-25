import { objText } from "../../assets/fonts";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { sceneStack } from "../globals";
import { scnColorTest } from "./scn-color-test";

export function scnRecordBoot() {
    objText.Large("5", { tint: 0xffffff })
        .coro(function* (self) {
            for (let i = 5; i >= 1; i--) {
                self.text = String(i);
                yield sleep(1000);
            }

            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnColorTest, {}));
        })
        .at(600, 100)
        .show();
}
