import { Instances } from "../../lib/game-engine/instances";
import { renderer } from "../current-pixi-renderer";
import { DataCondiments } from "../data/data-condiments";
import { objFace } from "../mixins/mxn-face";
import { mxnPointerPress } from "../mixins/mxn-pointer-press";
import { objFigureCondiment } from "./figures/obj-figure-condiment";
import { objFxCondimentDrip } from "./fx/obj-fx-condiment-drip";
import { objPizza } from "./obj-pizza";

export function objCondiment(id: DataCondiments.Id) {
    return objFigureCondiment(id)
        .scaled(2, 2)
        .mixin(mxnPointerPress)
        .handles("mxnPointerPress:pressed", (self) => {
            self.findIs(objFace).last?.objFace?.sing?.();
            self.play(self.objFigureCondiment.data.sfx);

            objFxCondimentDrip.objBurst(id)
                .at(Instances(objPizza)[0])
                .add(0, -renderer.height)
                .show();
        });
}
