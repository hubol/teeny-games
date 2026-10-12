import { objText } from "../../assets/fonts";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { sceneStack } from "../globals";
import { scnPlaceholder } from "./scn-placeholder";

export function scnBoot() {
    objText.Large("")
        .coro(function* (self) {
            for (let i = 5; i > 0; i--) {
                self.text = String(i);
                yield sleep(1000);
            }
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnPlaceholder, { useGameplay: true }));
        })
        .show();
}
