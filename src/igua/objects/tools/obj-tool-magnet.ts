import { Instances } from "../../../lib/game-engine/instances";
import { approachLinear, nlerp } from "../../../lib/math/number";
import { moveTowards } from "../../../lib/math/vector";
import { vnew } from "../../../lib/math/vector-type";
import { mxnTool } from "../../mixins/mxn-tool";
import { objCharacterMagnet } from "../characters/obj-character-magnet";
import { objAttachedTopping } from "../obj-pizza";
import { objTopping } from "../obj-topping";

const v = vnew();

export function objToolMagnet() {
    const toppingPointers = new Array<objTopping.Pointer>();
    let attractUnit = 0;

    return objCharacterMagnet()
        .mixin(mxnTool)
        .step(self => {
            self.objCharacterMagnet.isSparking = self.mxnTool.isDown;

            if (self.mxnTool.isDown) {
                for (const obj of Instances(objAttachedTopping)) {
                    const { x, y } = obj.getWorldPosition();
                    const pointer = { x, y, down: true };
                    objTopping(obj.objFigureTopping, pointer)
                        .at(pointer)
                        .show();
                    toppingPointers.push(pointer);
                    obj.destroy();
                }

                attractUnit = approachLinear(attractUnit, 1, 1 / 120);

                const attractLengthNumerator = nlerp(500, 10_000, attractUnit);

                for (const pointer of toppingPointers) {
                    const length = v.at(self).add(pointer, -1).vlength + 1;
                    const attractBonus = Math.min(12, attractLengthNumerator / length);
                    moveTowards(pointer, self, attractBonus);
                }
            }
            else {
                attractUnit = 0;
                for (const pointer of toppingPointers) {
                    pointer.down = false;
                }

                toppingPointers.length = 0;
            }
        });
}
