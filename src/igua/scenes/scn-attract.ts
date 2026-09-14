import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objFxStar } from "../objects/fx/obj-fx-star";
import { Search } from "../utils/search";

export function scnAttract() {
    const lvl = Lvl.Attract();

    Search.findMarkers(0xb7ace2)
        .forEach(position => objFxStar().at(position).zIndexed(-999).show());

    lvl.TitleGroup.children.forEach(obj =>
        obj
            .mixin(mxnFxBoilDisplacement, { rate: 0.1, scale: 5 })
            .step(self => self.angle += 0.1)
    );
}
