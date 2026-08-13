import { DisplayObject, Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { mxnSerialize } from "../mixins/mxn-serialize";
import { objDollArm } from "../objects/doll/obj-doll-arm";
import { objDollEye } from "../objects/doll/obj-doll-eye";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { DollPointer } from "../utils/doll-pointer";

const sourceFns = [
    objDollEye,
    objDollArm,
];

export function scnDesigner() {
    Sprite.from(Tx.Doll.Base)
        .anchored(0.5, 0.5)
        .scaled(3, 3)
        .at(renderer.width / 2, renderer.height / 2)
        .show();

    for (let i = 0; i < 32; i++) {
        Rng.item(sourceFns)()
            .mixin(mxnDragPiece)
            .at(Rng.int(renderer.width), Rng.int(renderer.height))
            .show();
    }

    objOverlayCursor()
        .zIndexed(999999)
        .show();
}

function mxnDragPiece(obj: mxnSerialize.Type) {
    let pointer = Null<PointerListener.State>();
    const pointerOffset = vnew();

    return obj
        .track(mxnDragPiece)
        .step(self => {
            if (!pointer || !pointer.down) {
                pointer = DollPointer.claim(self);
                if (pointer) {
                    pointerOffset.at(self).add(pointer, -1);
                }
            }
            else {
                self.at(pointer).add(pointerOffset);
            }
        });
}
