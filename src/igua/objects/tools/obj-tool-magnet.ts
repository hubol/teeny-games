import { Instances } from "../../../lib/game-engine/instances";
import { approachLinear, nlerp } from "../../../lib/math/number";
import { moveTowards } from "../../../lib/math/vector";
import { vnew } from "../../../lib/math/vector-type";
import { DataToppings } from "../../data/data-toppings";
import { mxnTool } from "../../mixins/mxn-tool";
import { objCharacterMagnet } from "../characters/obj-character-magnet";
import { objAttachedTopping } from "../obj-pizza";
import { objTopping } from "../obj-topping";
import { objToppingContainerPillar } from "../obj-topping-container-pillar";

const v = vnew();

export function objToolMagnet() {
    const toppingPointers = new Array<objTopping.Pointer>();
    let attractUnit = 0;

    return objCharacterMagnet()
        .mixin(mxnTool)
        .step(self => {
            self.objCharacterMagnet.isSparking = self.mxnTool.isDown;

            if (self.mxnTool.isDown) {
                const filterToppingId = objToppingContainerPillar.getActiveTopping();
                self.objCharacterMagnet.tint = filterToppingId ? DataToppings.getById(filterToppingId).tint : null;

                for (const obj of Instances(objAttachedTopping)) {
                    if (filterToppingId && obj.objFigureTopping.data.id !== filterToppingId) {
                        continue;
                    }
                    const { x, y } = obj.getWorldPosition();
                    const pointer = { x, y, down: true };
                    objTopping(obj.objFigureTopping, pointer, "tool")
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
                    const targetPosition = v.at(self).add(-60, -60);
                    moveTowards(pointer, targetPosition, attractBonus);
                }
            }
            else {
                self.objCharacterMagnet.tint = null;
                attractUnit = 0;
                for (const pointer of toppingPointers) {
                    pointer.down = false;
                }

                toppingPointers.length = 0;
            }
        });
}
