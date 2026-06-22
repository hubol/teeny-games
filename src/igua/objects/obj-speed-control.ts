import { Graphics, Point } from "pixi.js";
import { objText } from "../../assets/fonts";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { PizzaPointer } from "../utils/pizza-pointer";

const consts = {
    trackRadius: 90,
};

const p = new Point();

export function objSpeedControl() {
    let thisPointer = Null<PointerListener.State>();

    const handleObj = new Graphics()
        .beginFill(0xa0a0a0)
        .drawRect(-20, -40, 40, 80)
        .at(consts.trackRadius / 2, 0);

    const api = {
        get speed() {
            const rawSpeed = (handleObj.x / consts.trackRadius) * 2;
            return Math.max(-2, Math.min(Math.abs(rawSpeed) < 0.2 ? 0 : rawSpeed, 2));
        },
    };

    return container(
        objText.XLargeIrregular("Speed!").anchored(0.5, 1),
        container(
            new Graphics()
                .beginFill(0x202020)
                .drawRect(-consts.trackRadius, -10, consts.trackRadius * 2, 20),
            handleObj,
        )
            .step(self => {
                if (thisPointer?.down) {
                    return;
                }
                const pointer = PizzaPointer.claim(self);
                if (pointer) {
                    thisPointer = pointer;
                }
            })
            .step(self => {
                if (!thisPointer) {
                    return;
                }

                const point = self.worldTransform.applyInverse(thisPointer, p);
                const x = point.x;
                handleObj.x = Math.max(-consts.trackRadius, Math.min(x, consts.trackRadius));
            })
            .at(0, 50),
    )
        .merge({ objSpeedControl: api });
}

export namespace objSpeedControl {
    export type Type = ReturnType<typeof objSpeedControl>;
}
