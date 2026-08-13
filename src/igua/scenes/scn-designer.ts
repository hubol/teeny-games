import { DisplayObject, Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
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
        .at(renderer.width / 2 + 200, renderer.height / 2)
        .show();

    scene.stage
        .coro(function* () {
            while (true) {
                const obj = Rng.item(sourceFns)();
                obj
                    .mixin(mxnDragPiece)
                    .at(obj.width + Rng.int(50, 300), -obj.height)
                    .show();

                obj.alpha = 0;
                yield interp(obj, "alpha").to(1).over(200);
                yield sleep(1000);
            }
        });

    objOverlayCursor()
        .zIndexed(999999)
        .show();
}

function mxnDragPiece(obj: mxnSerialize.Type) {
    let isOnConveyorBelt = true;
    let isDying = false;
    let pointer = Null<PointerListener.State>();
    const pointerOffset = vnew();

    return obj
        .track(mxnDragPiece)
        .step(self => {
            if (isDying) {
                return;
            }
            if (!pointer || !pointer.down) {
                pointer = DollPointer.claim(self);
                if (pointer) {
                    pointerOffset.at(self).add(pointer, -1);
                    isOnConveyorBelt = false;
                }
                else if (isOnConveyorBelt) {
                    self.y += 2;
                    if (self.y >= renderer.height + self.height) {
                        isDying = true;
                        self
                            .coro(function* () {
                                yield interp(self, "alpha").to(0).over(200);
                            });
                        return;
                    }
                }
            }
            else {
                self.at(pointer).add(pointerOffset);
            }
        });
}
