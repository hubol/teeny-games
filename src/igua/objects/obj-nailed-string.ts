import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { nlerp } from "../../lib/math/number";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { mxnFxBoil } from "../mixins/fx/mxn-fx-boil";

export function objNailedString(length: number) {
    const api = {
        visibleUnit: 0,
    };

    const gfx = new Graphics();

    const [centerNailObj, farNailObj] = range(2).map(() =>
        Sprite.from(Tx.Pizza.Nail)
            .mixin(mxnFxBoil, "position")
            .pivoted(10, 15)
            .scaled(2, 2)
    );

    return container(
        farNailObj,
        gfx,
        centerNailObj,
    )
        .merge({ objNailedString: api })
        .step(self => {
            self.pivot.y = (1 - api.visibleUnit) * (length * 1.2);
            centerNailObj.y = nlerp(-100, 0, api.visibleUnit);
            farNailObj.y = nlerp(-100, -length, api.visibleUnit);
            gfx.clear().lineStyle(5, 0xffffff).moveTo(0, -8).lineTo(0, -length - 6);
        });
}
