import { Graphics, LINE_CAP, Point, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Unit } from "../../lib/math/number-alias-types";
import { vdir } from "../../lib/math/vector";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Mouse } from "../globals";

const [
    txMishaBody,
    txMishaLegLeft,
    txMishaLegRight,
    txMishaFace,
    txMishaFaceAgape,
] = Tx.Character.Misha.split({ width: 76 });

const p = new Point();

export function objMisha() {
    const api = {
        agapeUnit: 0 as Unit,
        lookPriorityVector: [vnew(1, 0)],
        handRelativePositionVector: vnew(),
        pedometer: 0,
    };

    const legLeftObj = Sprite.from(txMishaLegLeft);
    const legRightObj = Sprite.from(txMishaLegRight);

    const handObj = Sprite.from(Tx.Character.MishaHand);

    return container(
        Sprite.from(txMishaBody),
        legLeftObj,
        legRightObj,
        Sprite.from(txMishaFace)
            .step(self => {
                self.texture = api.agapeUnit >= 1 ? txMishaFaceAgape : txMishaFace;
                for (let i = api.lookPriorityVector.length - 1; i >= 0; i--) {
                    const vector = api.lookPriorityVector[i];
                    if (vector) {
                        self.position.at(vector).scale(12, 7);
                        break;
                    }
                }
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
            }),
        new Graphics()
            .step(self => {
                handObj.transform.updateLocalTransform();
                const { x, y } = handObj.localTransform.apply(p.at(23, 45), p);

                self
                    .clear()
                    .lineStyle({ cap: LINE_CAP.ROUND, width: 10, color: 0x00AEEF })
                    .moveTo(21, 57)
                    .quadraticCurveTo(
                        Math.round(x / (3 * 16)) * 16,
                        Math.round(y / ((api.handRelativePositionVector.y < 0 ? -8 : 2) * 16)) * 16,
                        x,
                        y,
                    );
            }),
    )
        .pivoted(35, 80)
        .merge({ objMisha: api })
        .step(self => {
            self.pivot.y = 80 + Math.round(Math.sin((api.pedometer / 15) * Math.PI));

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
        });
}

type ObjMisha = ReturnType<typeof objMisha>;

export function mxnMishaControlled(mishaObj: ObjMisha) {
    return mishaObj
        .step(() => {
            const lookVector = mishaObj.objMisha.lookPriorityVector[0].at(Mouse).add(mishaObj, -1);
            lookVector.vlength = Math.min(1, lookVector.vlength / 16);
            mishaObj.objMisha.handRelativePositionVector
                .at(Mouse)
                .add(mishaObj, -1)
                .add(mishaObj.pivot);
        }, -1)
        .coro(function* () {
            while (true) {
                const stepObj = container()
                    .step(() => mishaObj.objMisha.pedometer += 1)
                    .show();
                yield sleep(2000);
                stepObj.destroy();
                mishaObj.objMisha.pedometer = 0;
                yield sleep(1000);
            }
        });
}
