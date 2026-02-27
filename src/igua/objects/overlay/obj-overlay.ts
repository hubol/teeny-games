import { Graphics, Rectangle, Sprite } from "pixi.js";
import { objText } from "../../../assets/fonts";
import { Sfx } from "../../../assets/sounds";
import { Tx } from "../../../assets/textures";
import { Environment } from "../../../lib/environment";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../../lib/math/number";
import { container } from "../../../lib/pixi/container";
import { renderer } from "../../current-pixi-renderer";
import { devUpdateOgmoProject } from "../../dev/dev-update-ogmo-project";
import { Key } from "../../globals";
import { mxnBoilDisplacement } from "../../mixins/mxn-boil-displacement";
import { mxnBoilSeed } from "../../mixins/mxn-boil-seed";
import { LocalInteractive, MxnInteractive } from "../../mixins/mxn-interactive";

export function objOverlay() {
    const errorsObj = container();

    const api = {
        showError(message: string) {
            errorsObj.coro(function* () {
                errorsObj.removeAllChildren();
                container(
                    Sprite.from(Tx.Ui.Error),
                    objText.XLargeIrregular(message, { align: "center", maxWidth: 386 })
                        .anchored(0.5, 0.5)
                        .at(248, 239),
                )
                    .coro(function* (self) {
                        yield sleep(1000);
                        self.destroy();
                    })
                    .show(errorsObj);
            });
        },
    };

    return container(
        objInteractiveOverlay(),
        errorsObj,
    )
        .coro(function* () {
            yield () => Environment.isDev && Key.isDown("ShiftLeft") && Key.justWentDown("KeyZ");
            setTimeout(devUpdateOgmoProject);
        })
        .merge(api);
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
            const bounds = focusedObj.mxnInteractive.boundsObj.getBounds(false, r);
            const center = bounds.getCenter();
            const wh = Math.round(bounds.width * scale * 0.5);
            const hh = Math.round(bounds.height * scale * 0.5);

            highlightObj.drawRoundedRect(center.x - wh - 4, center.y - hh - 4, wh * 2 + 8, hh * 2 + 8, 8);
            textObj.at(center.x, center.y - hh - 10);

            const targetText = getInteractiveText(focusedObj);

            if (textObj.text === targetText.substring(0, textObj.text.length)) {
                if (textObj.text.length !== targetText.length) {
                    if (textObj.text.length % 2 === 0) {
                        Sfx.Type.rate(1, 2).play();
                    }
                    textObj.text = targetText.substring(0, textObj.text.length + 1);
                }
            }
            else {
                textObj.text = "";
            }

            const textBounds = textObj.getBounds(false, r);
            if (textBounds.left < 0) {
                textObj.x -= textBounds.left;
            }
            else if (textBounds.right >= renderer.width) {
                textObj.x -= textBounds.right - renderer.width;
            }

            if (textBounds.top < 0) {
                textObj.y -= textBounds.top;
            }
            else if (textBounds.bottom >= renderer.height) {
                textObj.y -= textBounds.bottom - renderer.height;
            }
        });
}

function getInteractiveText(interactiveObj: MxnInteractive) {
    const text = interactiveObj.mxnInteractive.text;
    if (typeof text === "string") {
        return text;
    }

    return text(LocalInteractive.value.mishaObj?.objMisha?.heldItem?.ref ?? null);
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
