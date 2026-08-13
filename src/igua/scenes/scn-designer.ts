import { TilingSprite } from "pixi.js";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { Key, scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { mxnSerialize } from "../mixins/mxn-serialize";
import { objDollArm } from "../objects/doll/obj-doll-arm";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { objDollButton } from "../objects/doll/obj-doll-button";
import { objDollEar } from "../objects/doll/obj-doll-ear";
import { objDollEye } from "../objects/doll/obj-doll-eye";
import { objDollMouth } from "../objects/doll/obj-doll-mouth";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { DollPointer } from "../utils/doll-pointer";

const sourceFns = [
    objDollEye,
    objDollArm,
    objDollEar,
    objDollButton,
    objDollMouth,
];

export function scnDesigner() {
    TilingSprite.from(NoAtlasTx.Designer.ConveyorBelt, { width: 256, height: 512 })
        .step(self => {
            self.tilePosition.y += 2 / 3;
        })
        .mixin(mxnFxBoilDisplacement, { rate: 0.05, scale: 50 })
        .scaled(3, 3)
        .show();

    objDollBase()
        .at(renderer.width / 2 + 200, renderer.height / 2)
        .step(self => {
            // TODO
            if (Key.justWentDown("KeyS")) {
                const data = self.objDollBase.serialize(
                    Instances(mxnDragPiece, obj => !obj.mxnDragPiece.isOnConveyorBelt),
                );

                objDollBase.deserialize(data)
                    .at(0, 0)
                    .scaled(0.5, 0.5)
                    .step(self => self.add(1, 1))
                    .show();
            }
        })
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

    const api = {
        get isOnConveyorBelt() {
            return isOnConveyorBelt;
        },
    };

    return obj
        .merge({ mxnDragPiece: api })
        .track(mxnDragPiece)
        .step(self => {
            if (isDying) {
                return;
            }

            if (pointer?.down === false && pointer.x < 740) {
                isOnConveyorBelt = true;
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
