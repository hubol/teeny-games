import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Sfx } from "../../assets/sounds";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { ForceTintFilter } from "../../lib/pixi/filters/force-tint-filter";
import { scene, sceneStack } from "../globals";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";
import { scnMain } from "./scn-main";

export function scnTitle() {
    const lvl = Lvl.Title();

    const mishaObj = objMisha()
        .mixin(mxnMishaControlled, "always_walk")
        .at(lvl.PlayerStartMarker)
        .zIndexed(999)
        .show();

    let going = false;

    lvl.TitleLetsGo
        .mixin(mxnInteractive, {
            text: "OK!",
            get enabled() {
                return !going;
            },
            interact: () => going = true,
        });

    scene.stage
        .coro(function* () {
            yield () => going;
            Sfx.Yo.play();
            const filter = new ForceTintFilter(scene.style.backgroundTint, 0);
            scene.stage.filtered(filter);
            yield interp(filter, "factor").steps(5).to(1).over(1000);
            yield sleep(250);
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnMain, { useGameplay: false }));
        });
}
