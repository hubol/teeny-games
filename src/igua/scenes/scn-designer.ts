import { TilingSprite } from "pixi.js";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { scene, sceneStack } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { mxnFxDie } from "../mixins/fx/mxn-fx-die";
import { mxnPointer } from "../mixins/mxn-pointer";
import { mxnPointerDrag } from "../mixins/mxn-pointer-drag";
import { mxnSerialize } from "../mixins/mxn-serialize";
import { objDollArm } from "../objects/doll/obj-doll-arm";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { objDollButton } from "../objects/doll/obj-doll-button";
import { objDollEar } from "../objects/doll/obj-doll-ear";
import { objDollEye } from "../objects/doll/obj-doll-eye";
import { objDollMouth } from "../objects/doll/obj-doll-mouth";
import { objDollScrew } from "../objects/doll/obj-doll-screw";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { objOverlayGoButton } from "../objects/overlay/obj-overlay-go-button";
import { scnLaunch } from "./scn-launch";

const sourceFns = [
    objDollEye,
    objDollArm,
    objDollEar,
    objDollButton,
    objDollMouth,
    objDollScrew,
];

export function scnDesigner() {
    TilingSprite.from(NoAtlasTx.Designer.ConveyorBelt, { width: 256, height: 512 })
        .step(self => {
            self.tilePosition.y += 2 / 3;
        })
        .mixin(mxnFxBoilDisplacement, { rate: 0.05, scale: 50 })
        .scaled(3, 3)
        .zIndexed(-2)
        .show();

    const dollObj = objDollBase()
        .at(renderer.width / 2 + 200, renderer.height / 2)
        .show();

    scene.stage
        .coro(function* () {
            while (true) {
                const obj = Rng.item(sourceFns)();
                obj
                    .mixin(mxnDragPiece)
                    .zIndexed(-1)
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

    objOverlayGoButton()
        .zIndexed(99999)
        .at(1590, 800)
        .handles("mxnPointer.claimed", () => {
            const data = dollObj.objDollBase.serialize(
                getAttachedDollObjs()
                    .sort((a, b) => a.zIndex - b.zIndex),
            );

            sceneStack.replace(() => scnLaunch(data), {});
        })
        .step(self => {
            const target = getAttachedDollObjs().length >= 3 ? 1 : 0;
            self.objPuppetGoButton.visible = approachLinear(self.objPuppetGoButton.visible, target, 0.02);
        })
        .show();
}

let zIndexMax = 0;

function mxnDragPiece(obj: mxnSerialize.Type) {
    let isOnConveyorBelt = true;
    let lastEvaluatedPointer = Null<PointerListener.State>();

    const api = {
        get isOnConveyorBelt() {
            return isOnConveyorBelt;
        },
    };

    return obj
        .merge({ mxnDragPiece: api })
        .mixin(mxnPointer, (obj) => obj.zIndex)
        .mixin(mxnPointerDrag)
        .handles("mxnPointer.claimed", (self) => self.zIndex = ++zIndexMax)
        .track(mxnDragPiece)
        .step(self => {
            const maybeCurrent = self.mxnPointer.maybeCurrent;
            if (maybeCurrent && maybeCurrent.down === false && lastEvaluatedPointer !== maybeCurrent) {
                isOnConveyorBelt = maybeCurrent.x < 740
                    && !self.collidesOne(getAttachedDollObjs());
                lastEvaluatedPointer = maybeCurrent;
            }

            if (isOnConveyorBelt) {
                self.y += 2;
                if (self.y >= renderer.height + self.height && !mxnFxDie.isDying(self)) {
                    self.mixin(mxnFxDie);
                }
            }
        });
}

function getAttachedDollObjs() {
    return Instances(mxnDragPiece, obj => !obj.mxnDragPiece.isOnConveyorBelt);
}
