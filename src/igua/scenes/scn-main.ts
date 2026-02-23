import { Graphics } from "pixi.js";
import { Mzk } from "../../assets/music";
import { Jukebox } from "../core/igua-audio";
import { scene } from "../globals";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";

export function scnMain() {
    Jukebox.play(Mzk.Mishang);
    scene.style.backgroundTint = 0x280284;

    objMisha()
        .mixin(mxnMishaControlled)
        .at(250, 140)
        .show();
}
