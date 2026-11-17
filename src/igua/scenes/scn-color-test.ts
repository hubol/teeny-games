import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Sfx } from "../../assets/sounds";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { IguaAudio } from "../core/igua-audio";
import { scene, sceneStack } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { scnMain } from "./scn-main";

export function scnColorTest() {
    IguaAudio.sfxDelayFeedback = 0;
    const lvl = Lvl.ColorTest();
    lvl.FxColorTest.mixin(mxnFxBoilDisplacement, { rate: 0.07, scale: 10 });

    scene.stage
        .coro(function* () {
            const sfx = Sfx.Fx.Interrupt.rate(0.8, 2).playInstance();
            const sfxObj = container()
                .coro(function* () {
                    while (true) {
                        const s = Rng.intc(1, 4) * 0.125;
                        if (Rng.float() > 0.2) {
                            sfx.linearRamp("rate", Rng.float(0.8, 2), s);
                        }
                        yield sleep(s * 1000);
                    }
                })
                .show();
            yield sleep(2000);
            sfx.linearRamp("gain", 0, 0.2);
            sfxObj.destroy();
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnMain, {}));
        });
}
