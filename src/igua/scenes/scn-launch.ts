import { objText } from "../../assets/fonts";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { renderer } from "../current-pixi-renderer";
import { sceneStack } from "../globals";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { scnDesigner } from "./scn-designer";

export function scnLaunch(dollData: objDollBase.Serialized = { objects: [] }) {
    objText.XLargeIrregular("Imagine a goofy launch scene here dude")
        .scaled(3, 3)
        .zIndexed(2)
        .show();

    objDollBase.deserialize(dollData)
        .at(-100, renderer.height + 100)
        .scaled(1 / 3, 1 / 3)
        .step(self => self.angle = self.x / 2)
        .coro(function* (self) {
            yield interpvr(self).factor(factor.sine).to(renderer.width + 100, -100).over(10_000);
            sceneStack.replace(scnDesigner, {});
        })
        .coro(function* () {
            yield sleep(4000);
            sceneStack.replace(scnDesigner, {});
        })
        .show();
}
