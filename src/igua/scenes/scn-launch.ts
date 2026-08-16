import { objText } from "../../assets/fonts";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { renderer } from "../current-pixi-renderer";
import { sceneStack } from "../globals";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { scnDesigner } from "./scn-designer";

export function scnLaunch(dollData: objDollBase.Serialized) {
    objText.XLargeIrregular("Imagine a goofy launch scene here dude")
        .scaled(3, 3)
        .show();

    objDollBase.deserialize(dollData)
        .at(renderer.width / 2, renderer.height / 2)
        .scaled(1 / 3, 1 / 3)
        .coro(function* () {
            yield sleep(3000);
            sceneStack.replace(scnDesigner, {});
        })
        .show();
}
