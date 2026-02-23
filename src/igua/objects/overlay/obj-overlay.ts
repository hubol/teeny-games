import { Graphics, Rectangle } from "pixi.js";
import { objText } from "../../../assets/fonts";
import { approachLinear } from "../../../lib/math/number";
import { container } from "../../../lib/pixi/container";
import { mxnBoilDisplacement } from "../../mixins/mxn-boil-displacement";
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
    const highlightObj = new Graphics()
        .mixin(mxnBoilDisplacement, { rate: 0.2, scale: 4 });

    let scale = 0;

    return container(
        highlightObj,
        textObj,
    )
        .step(self => {
            const focusedObj = LocalInteractive.value.focusedObj;
            self.visible = focusedObj !== null;
            if (!focusedObj) {
                textObj.text = "";
                scale = 0;
                return;
            }

            scale = approachLinear(scale, 1, 0.05);

            highlightObj.clear().lineStyle(3, 0xffffff, 1, 1);
            const bounds = focusedObj.getBounds(false, r);
            const center = bounds.getCenter();
            const wh = Math.round(bounds.width * scale * 0.5);
            const hh = Math.round(bounds.height * scale * 0.5);

            highlightObj.drawRoundedRect(center.x - wh - 4, center.y - hh - 4, wh * 2 + 8, hh * 2 + 8, 8);
            textObj.at(center.x, center.y - hh - 10);

            const targetText = focusedObj.mxnInteractive.text;

            if (textObj.text === targetText.substring(0, textObj.text.length)) {
                textObj.text = targetText.substring(0, textObj.text.length + 1);
            }
            else {
                textObj.text = "";
            }
        });
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
