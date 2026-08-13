import { DisplayObject, Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Rng } from "../../lib/math/rng";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { objDollEye } from "../objects/doll/obj-doll-eye";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { DollPointer } from "../utils/doll-pointer";

export function scnDesigner() {
    Sprite.from(Tx.Doll.Base)
        .anchored(0.5, 0.5)
        .scaled(3, 3)
        .at(renderer.width / 2, renderer.height / 2)
        .show();

    for (let i = 0; i < 32; i++) {
        objDollEye()
            .mixin(mxnDragPiece, objDollEye)
            .at(Rng.int(renderer.width), Rng.int(renderer.height))
            .show();
    }

    objOverlayCursor()
        .zIndexed(999999)
        .show();
}

function mxnDragPiece(obj: DisplayObject, sourceFn: () => DisplayObject) {
    let pointer = Null<PointerListener.State>();

    const api = {
        sourceFn,
    };

    return obj
        .merge({ mxnDragPiece: api })
        .track(mxnDragPiece)
        .step(self => {
            if (!pointer || !pointer.down) {
                pointer = DollPointer.claim(self);
            }
            else {
                self.at(pointer);
            }
        });
}
