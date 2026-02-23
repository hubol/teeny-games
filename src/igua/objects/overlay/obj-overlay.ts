import { Graphics, Rectangle } from "pixi.js";
import { objText } from "../../../assets/fonts";
import { container } from "../../../lib/pixi/container";
import { mxnBoilSeed } from "../../mixins/mxn-boil-seed";
import { LocalInteractive } from "../../mixins/mxn-interactive";

export function objOverlay() {
    return container(
        objInteractiveOverlay(),
    );
}

const r = new Rectangle();

function objInteractiveOverlay() {
    const textObj = objText
        .XLargeIrregular("", { tint: 0xffffff })
        .anchored(0.5, 1)
        .mixin(mxnBoilSeed);
    const highlightObj = new Graphics();

    return container(
        highlightObj,
        textObj,
    )
        .step(self => {
            const focusedObj = LocalInteractive.value.focusedObj;
            self.visible = focusedObj !== null;
            if (!focusedObj) {
                return;
            }

            highlightObj.clear().lineStyle(3, 0xffffff, 1, 1);
            const bounds = focusedObj.getBounds(false, r);
            highlightObj.drawRoundedRect(bounds.x - 4, bounds.y - 4, bounds.width + 8, bounds.height + 8, 8);
            textObj.at(bounds.x + Math.round(bounds.width / 2), bounds.y - 10).text = focusedObj.mxnInteractive.text;
        });
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
