import { Graphics, Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Tx } from "../../assets/textures";
import { Jukebox } from "../core/igua-audio";
import { scene } from "../globals";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { objItem } from "../objects/obj-item";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";

export function scnMain() {
    Jukebox.play(Mzk.Mishang);
    const lvl = Lvl.Main();

    objMisha()
        .mixin(mxnMishaControlled)
        .at(250, 140)
        .zIndexed(999)
        .show();

    {
        lvl.ItemSkillet.mixin(mxnInteractive, { text: "Take skillet" });
    }

    {
        lvl.ItemWhiskyGlass.mixin(mxnInteractive, { text: "Take whisky glass" });
    }

    {
        objItem("Potato").at(50, 50).show();
    }
}
