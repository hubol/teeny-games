import { DataCondiments } from "../data/data-condiments";
import { objFace } from "../mixins/mxn-face";
import { mxnPointerPress } from "../mixins/mxn-pointer-press";
import { objFigureCondiment } from "./figures/obj-figure-condiment";

export function objCondiment(id: DataCondiments.Id) {
    return objFigureCondiment(id)
        .scaled(2, 2)
        .mixin(mxnPointerPress)
        .handles("mxnPointerPress:pressed", (self) => {
            self.findIs(objFace).last?.objFace?.sing?.();
            self.play(self.objFigureCondiment.data.sfx);
        });
}
