import { DisplayObject, Graphics, LINE_CAP, Point, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { Instances } from "../../lib/game-engine/instances";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { factor, interpc, interpv, interpvr } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Unit } from "../../lib/math/number-alias-types";
import { vdir } from "../../lib/math/vector";
import { Vector, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { Mouse, scene } from "../globals";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { LocalInteractive, mxnInteractive } from "../mixins/mxn-interactive";
import { mxnItem } from "../mixins/mxn-item";
import { Item } from "./data-item";
import { objItem } from "./obj-item";
import { StepOrder } from "./step-order";

const [
    txMishaBody,
    txMishaLegLeft,
    txMishaLegRight,
    txMishaFace,
    txMishaFaceAgape,
] = Tx.Character.Misha.split({ width: 76 });

const p = new Point();

export function objMisha() {
    const heldItem = { ref: Null<Item>() };
    const api = {
        agapeUnit: 0 as Unit,
        lookPriorityVector: [vnew(1, 0)],
        handRelativePositionVector: vnew(),
        pedometer: 0,
        get pointerObj() {
            return pointerObj;
        },
        get heldItem() {
            return heldItem;
        },
    };

    function getLookVector() {
        for (let i = api.lookPriorityVector.length - 1; i >= 0; i--) {
            const vector = api.lookPriorityVector[i];
            if (vector) {
                return vector;
            }
        }

        return api.lookPriorityVector[0];
    }

    const legLeftObj = Sprite.from(txMishaLegLeft)
        .mixin(mxnPlayFootstepSfx, Sfx.Step0);
    const legRightObj = Sprite.from(txMishaLegRight)
        .mixin(mxnPlayFootstepSfx, Sfx.Step1);

    const legsObj = container(legLeftObj, legRightObj);

    const handObj = Sprite.from(Tx.Character.MishaHand);
    const pointerObj = new Graphics()
        .beginFill(0xff0000)
        .drawRect(-2, -2, 4, 4)
        .at(16, 2)
        .invisible()
        .show(handObj);

    const heldItemObj = container().mixin(mxnItem, api.heldItem, [0.5, 0.5]);

    return container(
        Sprite.from(txMishaBody),
        legsObj,
        Sprite.from(txMishaFace)
            .step(self => {
                self.texture = api.agapeUnit >= 1 ? txMishaFaceAgape : txMishaFace;
                self.position.at(getLookVector()).scale(12, 7);
            }),
        handObj
            .pivoted(17, 0)
            .step(self => {
                self.at(api.handRelativePositionVector);
                if (api.handRelativePositionVector.x !== 0) {
                    self.scale.x = Math.sign(api.handRelativePositionVector.x);
                }
                self.rotation = Math.PI / 2 - Math.round(vdir(api.handRelativePositionVector) * 4 / Math.PI) * Math.PI
                        / 4;
                self.texture = api.heldItem.ref ? Tx.Character.MishaHandOpened : Tx.Character.MishaHand;
            }, 2),
        new Graphics()
            .step(self => {
                handObj.transform.updateLocalTransform();
                const palmPosition = handObj.localTransform.apply(p.at(24, 30), p);
                heldItemObj.at(palmPosition);
                const wristPosition = handObj.localTransform.apply(p.at(23, 45), p);

                self
                    .clear()
                    .lineStyle({ cap: LINE_CAP.ROUND, width: 10, color: 0x00AEEF })
                    .moveTo(21, 57)
                    .quadraticCurveTo(
                        Math.round(wristPosition.x / (3 * 16)) * 16,
                        Math.round(wristPosition.y / ((api.handRelativePositionVector.y < 0 ? -8 : 2) * 16)) * 16,
                        wristPosition.x,
                        wristPosition.y,
                    );
            }, 2),
        heldItemObj,
    )
        .pivoted(35, 80)
        .merge({ objMisha: api })
        .step(self => {
            const f = api.pedometer === 0 ? 0 : 1;

            legLeftObj.pivot.y = approachLinear(
                legLeftObj.pivot.y,
                f * Math.round((Math.sin((api.pedometer / 15) * Math.PI) + 1) * 4),
                1,
            );

            legLeftObj.pivot.x = Math.round(legLeftObj.pivot.y / 3);

            legRightObj.pivot.y = approachLinear(
                legRightObj.pivot.y,
                f * Math.round((Math.sin((1 + api.pedometer / 15) * Math.PI) + 1) * 4),
                1,
            );

            legRightObj.pivot.x = Math.round(legRightObj.pivot.y / -3);

            legsObj.pivot.x = Math.round(getLookVector().x * 2);
        }, 1);
}

function mxnPlayFootstepSfx(obj: DisplayObject, sound: Sound) {
    return obj
        .coro(function* () {
            while (true) {
                yield () => obj.pivot.y > 0;
                yield () => obj.pivot.y === 0;
                obj.play(sound.rate(1, 1.2));
            }
        });
}

export type ObjMisha = ReturnType<typeof objMisha>;

export function mxnMishaControlled(mishaObj: ObjMisha, mode: "default" | "always_walk" = "default") {
    LocalInteractive.value.mishaObj = mishaObj;

    let targetPosition = Null<Vector>();

    Sprite.from(Tx.Ui.Target)
        .anchored(0.5, 1)
        .scaled(0, 0)
        .zIndexed(998)
        .coro(function* (self) {
            while (true) {
                yield holdf(() => Boolean(targetPosition), 3);
                yield interpv(self.scale).steps(3).to(1, 1).over(300);
                yield () => !targetPosition;
                yield interpv(self.scale).steps(3).to(0, 0).over(300);
            }
        })
        .step(self => {
            if (targetPosition) {
                self.at(targetPosition);
            }
        })
        .show();

    const mouseObj = new Graphics()
        .beginFill(0xff0000)
        .drawRect(-4, -4, 8, 8)
        .invisible()
        .show();

    return mishaObj
        .step(() => {
            const lookVector = mishaObj.objMisha.lookPriorityVector[0]
                .at(Mouse)
                .add(scene.camera)
                .add(mishaObj, -1);
            lookVector.vlength = Math.min(1, lookVector.vlength / 16);
            mishaObj.objMisha.handRelativePositionVector
                .at(Mouse)
                .add(mishaObj, -1)
                .add(mishaObj.pivot)
                .add(scene.camera);
        }, StepOrder.Camera)
        .coro(function* () {
            const padding = 10;

            while (true) {
                yield () => Mouse.justWentDown;
                yield () => !Mouse.isDown;

                if (
                    Mouse.x < -padding
                    || Mouse.y < -padding
                    || Mouse.x > renderer.width + padding
                    || Mouse.y > renderer.height + padding
                ) {
                    continue;
                }

                const maybeTargetPosition = vnew(Mouse).add(scene.camera);

                if (LocalInteractive.value.focusedObj) {
                    targetPosition = null;
                    LocalInteractive.value.focusedObj.mxnInteractive.interact(mishaObj.objMisha.heldItem);
                }
                else if (mishaObj.objMisha.heldItem.ref) {
                    objItem(mishaObj.objMisha.heldItem.ref, [0.5, 0.5])
                        .at(scene.camera)
                        .add(Mouse)
                        .show();
                    mishaObj.objMisha.heldItem.ref = null;
                }
                else {
                    targetPosition = maybeTargetPosition;
                }

                if (mode === "always_walk") {
                    targetPosition = maybeTargetPosition;
                }
            }
        }, -1)
        .coro(function* () {
            while (true) {
                yield () => Boolean(targetPosition);
                const position = targetPosition!;
                targetPosition = null;
                const stepObj = container()
                    .step(() => mishaObj.objMisha.pedometer += 1)
                    .show();
                const targetObj = Sprite.from(Tx.Ui.Target)
                    .anchored(0.5, 1)
                    .at(position)
                    .tinted(0x00AEEF)
                    .coro(function* (self) {
                        while (true) {
                            yield sleep(400);
                            yield interpc(self, "tint").steps(2).to(0xFFFFFF).over(200);
                            yield sleep(100);
                            yield interpc(self, "tint").steps(2).to(0x00AEEF).over(200);
                            yield sleep(100);
                        }
                    })
                    .coro(function* (self) {
                        while (true) {
                            yield interpvr(self.pivot).to(0, 10).over(300);
                            yield interpvr(self.pivot).to(0, 0).over(300);
                        }
                    })
                    .zIndexed(998)
                    .show();
                yield interpvr(mishaObj).to(position).by(3);
                targetObj
                    .coro(function* () {
                        yield interpv(targetObj.scale).steps(3).to(0, 0).over(300);
                        targetObj.destroy();
                    });
                stepObj.destroy();
                mishaObj.objMisha.pedometer = 0;
            }
        }, -1)
        .step(() => {
            mouseObj.at(scene.camera).add(Mouse);
            const collidedObj = mouseObj
                .collidesOne(Instances(mxnInteractive, obj => obj.mxnInteractive.enabled));
            LocalInteractive.value.focusedObj = collidedObj;
        });
}
