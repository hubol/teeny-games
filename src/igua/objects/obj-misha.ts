import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
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

export function objMisha() {
    const api = {
        agapeUnit: 0 as Unit,
        lookPriorityVector: [vnew(1, 0)],
        handRelativePositionVector: vnew(),
    };

    const legLeftObj = Sprite.from(txMishaLegLeft);
    const legRightObj = Sprite.from(txMishaLegRight);

    const wristObj = container();

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
        container(
            Sprite.from(Tx.Character.MishaHand)
                .pivoted(17, 0),
            wristObj,
        )
            .step(self => {
                self.at(api.handRelativePositionVector);
                if (api.handRelativePositionVector.x !== 0) {
                    self.scale.x = Math.sign(api.handRelativePositionVector.x);
                }
                self.rotation = Math.PI / 2 - Math.round(vdir(api.handRelativePositionVector) * 4 / Math.PI) * Math.PI
                        / 4;
            }),
    )
        .pivoted(35, 80)
        .merge({ objMisha: api });
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
        });
}
