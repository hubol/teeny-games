import { interp } from "../../lib/game-engine/routines/interp";
import { container } from "../../lib/pixi/container";
import { MxnCollectible } from "../mixins/mxn-collectible";
import { objActiveIndicator } from "./obj-active-indicator";

export function objLibrarySpawn(mode: "default" | "disappears_fast", collectibleObj: MxnCollectible) {
    const indicatorObj = objActiveIndicator().scaled(1.25, 1.25);

    if (mode === "disappears_fast") {
        indicatorObj.objActiveIndicator.tint = 0xff0000;
    }

    return container(
        indicatorObj,
    )
        .coro(function* (self) {
            yield interp(indicatorObj.objActiveIndicator, "fillUnit").to(1).over(mode === "default" ? 1000 : 2000);
            collectibleObj.show(self);
            indicatorObj.objActiveIndicator.isFilling = false;
            yield interp(indicatorObj.objActiveIndicator, "fillUnit").to(0).over(mode === "default" ? 1000 : 500);
            self.destroy();
        });
}
