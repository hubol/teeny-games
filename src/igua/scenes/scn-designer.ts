import { Container, Rectangle, TilingSprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { Sfx } from "../../assets/sounds";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { Coro } from "../../lib/game-engine/routines/coro";
import { factor, interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
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
import { objDollHair } from "../objects/doll/obj-doll-hair";
import { objDollMouth } from "../objects/doll/obj-doll-mouth";
import { objDollScrew } from "../objects/doll/obj-doll-screw";
import { objFxGhostBurst } from "../objects/fx/obj-fx-ghost-burst";
import { objFxStar } from "../objects/fx/obj-fx-star";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { objOverlayGoButton } from "../objects/overlay/obj-overlay-go-button";
import { Search } from "../utils/search";
import { scnLaunch } from "./scn-launch";
import { scnSkate } from "./scn-skate";

const sourceFns = [
    objDollArm,
    objDollButton,
    objDollEar,
    objDollEye,
    objDollHair,
    objDollMouth,
    objDollScrew,
];

const r = new Rectangle();

export function scnDesigner() {
    const lvl = Lvl.Designer();
    let isExiting = false;

    Search.findMarkers(0xb7ace2)
        .forEach(position => objFxStar().at(position).show());

    TilingSprite.from(NoAtlasTx.Designer.ConveyorBelt, { width: 256, height: 512 })
        .step(self => {
            self.tilePosition.y += 2 / 3;
        })
        .mixin(mxnFxBoilDisplacement, { rate: 0.05, scale: 50 })
        .scaled(3, 3)
        .zIndexed(-2)
        .show();

    const dollObj = objDollBase()
        .at(renderer.width / 2 + 200, renderer.height / 2);

    const dollContainerObj = container(dollObj)
        .coro(function* (self) {
            lvl.Shadow.alpha = 0;

            self.y = -1080;

            yield* Coro.all([
                interpvr(self).factor(factor.sine).to(0, 0).over(1000),
                interp(lvl.Shadow, "alpha").steps(4).to(1).over(1000),
            ]);

            const bobbingObj = container()
                .step(() => {
                    self.y = Math.round(Math.sin(scene.ticker.ticks / 60 * Math.PI) * 6);
                    lvl.Shadow.scale.set(self.y > 0 ? 3.2 : 3);
                })
                .show(self);

            yield () => isExiting;

            bobbingObj.destroy();
            yield* Coro.all([
                interpvr(self).factor(factor.sine).to(0, -1540).over(1000),
                interp(lvl.Shadow, "alpha").steps(4).to(0).over(1000),
            ]);
        })
        .show();

    const draggingObj = container()
        .show();

    scene.stage
        .coro(function* () {
            Sfx.Designer.Begin.play();
            while (true) {
                for (const sourceFn of Rng.shuffle(sourceFns)) {
                    if (isExiting) {
                        return;
                    }
                    const obj = sourceFn();
                    obj
                        .mixin(mxnDragPiece, dollContainerObj, draggingObj)
                        .zIndexed(-1)
                        .at(obj.width + Rng.int(50, 300), -obj.height)
                        .show();

                    const bounds = obj.getBounds(false, r);

                    if (bounds.x < 0) {
                        obj.x += -bounds.x;
                    }

                    obj.alpha = 0;
                    yield interp(obj, "alpha").to(1).over(200);
                    yield sleep(1000);
                }
            }
        });

    objOverlayCursor()
        .zIndexed(999999)
        .show();

    objOverlayGoButton()
        .zIndexed(99999)
        .at(1590, 800)
        .handles("mxnPointer.claimed", (self) => {
            const data = dollObj.objDollBase.serialize(
                getAttachedDollObjs()
                    .sort((a, b) => a.zIndex - b.zIndex),
            );

            Sfx.Designer.PressGo.play();
            Sfx.Designer.Transition.play();

            objFxGhostBurst()
                .at(self)
                .add(-38, -44)
                .show();

            isExiting = true;
            self.destroy();

            scene.stage.coro(function* () {
                yield sleep(1000);
                sceneStack.replace(() => scnSkate(data), {});
            });
        })
        .step(self => {
            const target = getAttachedDollObjs().length >= 3 ? 1 : 0;
            self.objPuppetGoButton.visible = approachLinear(self.objPuppetGoButton.visible, target, 0.02);
        })
        .show();
}

let zIndexMax = 0;

const manipulateSfxs = Object.values(Sfx.Manipulate);

function getManipulateSfx() {
    return Rng.item(manipulateSfxs).rate(Rng.float(0.6, 1));
}

function mxnDragPiece(obj: mxnSerialize.Type, dollObj: Container, draggingObj: Container) {
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
        .handles("mxnPointer.claimed", (self) => {
            self.zIndex = ++zIndexMax;
            self.play(getManipulateSfx());
        })
        .track(mxnDragPiece)
        .step(self => {
            const maybeCurrent = self.mxnPointer.maybeCurrent;
            if (maybeCurrent?.down) {
                self.setParent(draggingObj);
            }
            else if (maybeCurrent && maybeCurrent.down === false && lastEvaluatedPointer !== maybeCurrent) {
                self.play(getManipulateSfx());
                isOnConveyorBelt = maybeCurrent.x < 740
                    && !self.collidesOne(getAttachedDollObjs());
                lastEvaluatedPointer = maybeCurrent;
                self.setParent(isOnConveyorBelt ? scene.stage : dollObj);
                if (self.parent !== scene.stage) {
                    self.add(self.parent, -1);
                }
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
