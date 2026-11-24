import { ColorSource, DisplayObject, Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { interpc } from "../../lib/game-engine/routines/interp";
import { Rng } from "../../lib/math/rng";
import { AdjustColor } from "../../lib/pixi/adjust-color";
import { container } from "../../lib/pixi/container";
import { XbrFilter } from "../filters/xbr-filter";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objCharacterCritter } from "../objects/character/obj-character-critter";

export function scnMain() {
    // scene.style.backgroundTint = 0x808080;

    new Graphics()
        .beginFill(0xffffff)
        .drawRect(0, 0, 2000, 2000)
        .mixin(mxnFxRngTint)
        .show();

    Sprite.from(Tx.Grass)
        .mixin(mxnFxRngTint)
        .mixin(mxnFxBoilDisplacement)
        .show();

    const critterObj = container()
        .mixin(mxnFxBoilDisplacement)
        .at(180, 100)
        .show();

    objCharacterCritter(objCharacterCritter.createArgs())
        .scaled(3, 3)
        .show(critterObj);
}

function mxnFxRngTint(obj: DisplayObject & { tint: ColorSource }) {
    return obj
        .coro(function* (self) {
            function createTint() {
                return AdjustColor.hsv(Rng.float(360), Rng.float(50, 70), Rng.float(80, 90)).toPixi();
            }

            self.tint = createTint();

            while (true) {
                yield interpc(self, "tint").to(createTint()).over(Rng.int(5000, 10000));
            }
        });
}
