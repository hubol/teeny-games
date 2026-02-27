import { DisplayObject } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Jukebox } from "../core/igua-audio";
import { mxnInteractive } from "../mixins/mxn-interactive";
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
        function mxnRecipeStep(obj: DisplayObject) {
            return obj
                .step(() => obj.visible = lvl.RecipeBookOpened.visible);
        }

        lvl.RecipeBookOpened.step(self => self.visible = lvl.RecipeBook.destroyed);
        lvl.RecipeBook
            .mixin(mxnInteractive, {
                text: "Open Recipe Book",
                interact: () => {
                    lvl.RecipeBook.destroy();
                },
            });

        lvl.StepPotatoGroup.mixin(mxnRecipeStep);
        lvl.StepCarrotGroup.mixin(mxnRecipeStep);
        lvl.StepOnionGroup.mixin(mxnRecipeStep);
        lvl.StepGarlicGroup.mixin(mxnRecipeStep);
        lvl.StepSaltGroup.mixin(mxnRecipeStep);
        lvl.StepPepperGroup.mixin(mxnRecipeStep);
        lvl.StepFlourGroup.mixin(mxnRecipeStep);
        lvl.StepCombinedGroup.mixin(mxnRecipeStep);
        lvl.StepOliveOilGroup.mixin(mxnRecipeStep);
        lvl.StepScoopedGroup.mixin(mxnRecipeStep);
        lvl.StepServedGroup.mixin(mxnRecipeStep);
    }
}
