import { DisplayObject } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Sfx } from "../../assets/sounds";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { Instances } from "../../lib/game-engine/instances";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { ForceTintFilter } from "../../lib/pixi/filters/force-tint-filter";
import { Jukebox } from "../core/igua-audio";
import { Key, scene, sceneStack } from "../globals";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { mxnItemStorage } from "../mixins/mxn-item-storage";
import { DataItem } from "../objects/data-item";
import { ItemRef } from "../objects/item-ref";
import { objAidar } from "../objects/obj-aidar";
import { objItem } from "../objects/obj-item";
import { mxnMishaControlled, objMisha } from "../objects/obj-misha";
import { objMarker } from "../objects/utils/obj-marker";
import { scnEnding } from "./scn-ending";

export function scnMain() {
    Jukebox.play(Mzk.Mishang);
    const lvl = Lvl.Main();

    const mishaObj = objMisha()
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
                    Sfx.OpenBook.play();
                    lvl.RecipeBook.destroy();
                },
            });
    }

    {
        objAidar()
            .at(lvl.AidarMarker)
            .show();
    }

    {
        const cookingObj = lvl.WorldTextCooking
            .mixin(mxnBoilPivot);

        const latkePositions = Instances(objMarker, obj => obj.tint === 0xff0000).map(obj => obj.vcpy());
        let nextLatkePositionIndex = 0;

        function getSkilletItem() {
            return lvl.SkilletItem.objItem.item as { ref: InstanceType<typeof DataItem.Manifest.Skillet> };
        }

        lvl.SkilletItem
            .step(() => {
                const item = getSkilletItem();

                cookingObj.visible = item.ref.state.remainingLatkes > 0;

                if (item.ref.state.remainingLatkes <= 0) {
                    return;
                }
            })
            .coro(function* () {
                while (true) {
                    yield () => getSkilletItem().ref.state.remainingLatkes > 0;
                    yield sleep(2000);
                    getSkilletItem().ref = new DataItem.Manifest.Skillet(getSkilletItem().ref.cook());
                    objItem("Latke").at(latkePositions[(nextLatkePositionIndex++) % latkePositions.length]).show();
                }
            });
    }

    {
        const whiskyObj0 = lvl.WhiskyRegion0
            .mixin(
                mxnItemStorage<typeof DataItem.Manifest.WhiskyGlass>,
                {
                    Item: DataItem.Manifest.WhiskyGlass,
                    filter: (item) => item.state.filled ? true : "Needs whisky",
                    text: "Whisky for Hubol",
                },
            );

        const whiskyObj1 = lvl.WhiskyRegion1
            .mixin(
                mxnItemStorage<typeof DataItem.Manifest.WhiskyGlass>,
                {
                    Item: DataItem.Manifest.WhiskyGlass,
                    filter: (item) => item.state.filled ? true : "Needs whisky",
                    text: "Whisky for Misha",
                },
            );

        const platterObj = lvl.PlatterRegion
            .mixin(
                mxnItemStorage<typeof DataItem.Manifest.ServingPlatter>,
                {
                    Item: DataItem.Manifest.ServingPlatter,
                    filter: (item) => item.state.latkes >= 9 ? true : "Needs more latkes",
                    text: "Latkes go here",
                },
            );

        const storageObjs = [whiskyObj0, whiskyObj1, platterObj];

        scene.stage
            .coro(function* () {
                yield () => storageObjs.every(obj => obj.mxnItemStorage.isStored);

                const glowObjs = [...storageObjs, mishaObj];

                for (const obj of glowObjs) {
                    const filter = new ForceTintFilter(0xffffff, 0);
                    obj.filtered(filter);
                    yield interp(filter, "factor").steps(4).to(1).over(500);
                }

                yield sleep(1000);

                throw new EscapeTickerAndExecute(() => sceneStack.replace(scnEnding, { useGameplay: false }));
            });
    }
}
