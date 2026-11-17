import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { scene, sceneStack } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { scnMain } from "./scn-main";

export function scnColorTest() {
    const lvl = Lvl.ColorTest();
    lvl.FxColorTest.mixin(mxnFxBoilDisplacement, { rate: 0.07, scale: 10 });

    scene.stage
        .coro(function* () {
            yield sleep(2000);
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnMain, {}));
        });
}
