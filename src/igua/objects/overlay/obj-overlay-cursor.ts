import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { approachLinear } from "../../../lib/math/number";
import { vequals } from "../../../lib/math/vector";
import { vnew } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";
import { Pointer } from "../../globals";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";

export function objOverlayCursor() {
    let sinceLastCursorStepsCount = 999;
    let alpha = 0;
    let isPointerDown = false;
    const previous = vnew();
    const cursorObj = Sprite.from(Tx.Overlay.Cursor);

    return container(
        cursorObj
            .scaled(1.67, 1.67)
            .pivoted(41, 9),
    )
        .mixin(mxnFxBoil, "pivot")
        .step((self) => {
            isPointerDown = false;
            for (const pointer of Pointer.states) {
                if (pointer.type === "mouse") {
                    isPointerDown ||= pointer.down;
                    previous.at(self);
                    self.at(pointer.x + pointer.width / 2, pointer.y + pointer.height / 2).vround();
                    if (!vequals(previous, self)) {
                        sinceLastCursorStepsCount = 0;
                        return;
                    }
                }
            }
            sinceLastCursorStepsCount++;
        })
        .step(self => {
            cursorObj.texture = isPointerDown ? Tx.Overlay.CursorDown : Tx.Overlay.Cursor;
            const target = sinceLastCursorStepsCount < 180 ? 1 : 0;
            alpha = approachLinear(alpha, target, target > 0 ? 0.2 : 0.0175);
            self.alpha = Math.round(alpha * 5) / 5;
        });
}
