import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txsPeteWalk = Tx.Characters.Pete.Walk.split({ count: 3 });

export function objCharacterPeteWalk() {
    let pedometer = 0;

    const api = {
        walkSpeed: 0,
    };

    return objIndexedSprite(txsPeteWalk)
        .merge({ objCharacterPeteWalk: api })
        .anchored(0.5, 1)
        .scaled(1.4, 1.4)
        .mixin(mxnFxBoil, "pivot")
        .step(self => {
            const walkSign = Math.sign(api.walkSpeed);
            if (walkSign !== 0) {
                self.scale.x = Math.abs(self.scale.x) * walkSign;
                pedometer += Math.abs(api.walkSpeed);
                self.textureIndex = 1 + Math.floor((pedometer / 30) % 2);
            }
            else {
                pedometer = 0;
                self.textureIndex = 0;
            }
        });
}
