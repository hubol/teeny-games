import { DisplayObject } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Jukebox } from "../core/igua-audio";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { objAidar } from "../objects/obj-aidar";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";

export function scnMain() {
    Jukebox.play(Mzk.Mishang);
    const lvl = Lvl.Main();

    objMisha()
        .mixin(mxnMishaControlled)
        .at(lvl.PlayerStartMarker)
        .zIndexed(999)
        .show();

    {
        lvl.RecipeBookOpened.step(self => self.visible = lvl.RecipeBook.destroyed);
        lvl.RecipeBook
            .mixin(mxnInteractive, {
                text: "Open Recipe Book",
                interact: () => {
                    lvl.RecipeBook.destroy();
                },
            });
    }

    {
        objAidar()
            .at(lvl.AidarMarker)
            .show();
    }
}
