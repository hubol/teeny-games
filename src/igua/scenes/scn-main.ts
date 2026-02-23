import { Graphics } from "pixi.js";
import { scene } from "../globals";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";

export function scnMain() {
    scene.style.backgroundTint = 0x280284;

    objMisha()
        .mixin(mxnMishaControlled)
        .at(250, 140)
        .show();
}
