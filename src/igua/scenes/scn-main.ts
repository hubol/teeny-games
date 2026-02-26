import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Jukebox } from "../core/igua-audio";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";

export function scnMain() {
    Jukebox.play(Mzk.Mishang);
    const lvl = Lvl.Main();

    objMisha()
        .mixin(mxnMishaControlled)
        .at(250, 140)
        .zIndexed(999)
        .show();
}
