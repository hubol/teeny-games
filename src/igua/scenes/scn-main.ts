import { Graphics, Sprite } from "pixi.js";
import { Mzk } from "../../assets/music";
import { Tx } from "../../assets/textures";
import { Jukebox } from "../core/igua-audio";
import { scene } from "../globals";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";

export function scnMain() {
    Jukebox.play(Mzk.Mishang);
    scene.style.backgroundTint = 0x280284;

    objMisha()
        .mixin(mxnMishaControlled)
        .at(250, 140)
        .zIndexed(999)
        .show();

    Sprite.from(Tx.Item.Skillet)
        .at(300, 100)
        .mixin(mxnInteractive, { text: "Take skillet" })
        .show();
}
