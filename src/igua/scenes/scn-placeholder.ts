import { Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { UserMediaTexture } from "../../lib/game-engine/user-media-texture";
import { ForceTintFilter } from "../../lib/pixi/filters/force-tint-filter";
import { renderer } from "../current-pixi-renderer";
import { Key } from "../globals";
import { mxnActionRepeater } from "../mixins/mxn-action-repeater";

export function scnPlaceholder() {
    const lvl = Lvl.Placeholder();
    lvl.Block.step(self => {
        if (Key.isDown("ArrowUp")) {
            self.y -= 3;
        }
    });

    objText.Large("Yoooooooo!").show();

    objText.Medium("Asdf")
        .mixin(mxnActionRepeater, ["KeyP"])
        .step(self => {
            if (self.mxnActionRepeater.justWentDown("KeyP")) {
                self.text += "P";
            }
        })
        .at(100, 100)
        .show();

    new Graphics().beginFill(0x000000).drawCircle(0, 0, 3).show(lvl.Group1);
    lvl.Group1.step(self => self.angle += 1);

    const filter = new ForceTintFilter(0xf00000);
    lvl.Group1.filters = [filter];

    lvl.Group1.coro(function* () {
        while (true) {
            yield sleep(333);
            yield interp(filter, "factor").to(0).over(1000);
            yield interp(filter, "factor").to(1).over(1000);
        }
    });

    UserMediaTexture
        .load()
        .then(tx => {
            const scale = renderer.height / tx.height;
            Sprite.from(tx)
                .anchored(0.5, 0.5)
                .at(renderer.width / 2, renderer.height / 2)
                .scaled(-scale, scale)
                .show();
        });
}
