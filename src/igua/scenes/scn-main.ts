import { Graphics } from "pixi.js";
import { container } from "../../lib/pixi/container";
import { XbrFilter } from "../filters/xbr-filter";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objCharacterCritter } from "../objects/character/obj-character-critter";

export function scnMain() {
    // scene.style.backgroundTint = 0x808080;

    new Graphics()
        .beginFill(0x808080)
        .drawRect(0, 0, 2000, 2000)
        .show();

    const critterObj = container()
        .mixin(mxnFxBoilDisplacement)
        .at(180, 100)
        .show();

    objCharacterCritter(objCharacterCritter.createArgs())
        .scaled(3, 3)
        .show(critterObj);
}
