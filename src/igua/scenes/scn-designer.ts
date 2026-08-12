import { Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Rng } from "../../lib/math/rng";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { DollPointer } from "../utils/doll-pointer";

export function scnDesigner() {
    Sprite.from(Tx.Doll.Base)
        .anchored(0.5, 0.5)
        .scaled(3, 3)
        .at(renderer.width / 2, renderer.height / 2)
        .show();

    for (let i = 0; i < 32; i++) {
        objDragPiece()
            .at(Rng.int(renderer.width), Rng.int(renderer.height))
            .show();
    }
}

function objDragPiece(tx = Tx.Doll.Eye0) {
    let pointer = Null<PointerListener.State>();

    return Sprite.from(tx)
        .anchored(0.5, 0.5)
        .scaled(3, 3)
        .step(self => {
            if (!pointer) {
                pointer = DollPointer.claim(self);
            }
            else {
                self.at(pointer);
            }
        });
}
