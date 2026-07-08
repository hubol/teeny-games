import { Instances } from "../../../lib/game-engine/instances";
import { moveTowards } from "../../../lib/math/vector";
import { mxnTool } from "../../mixins/mxn-tool";
import { objCharacterMagnet } from "../characters/obj-character-magnet";
import { objAttachedTopping } from "../obj-pizza";
import { objTopping } from "../obj-topping";

export function objToolMagnet() {
    const toppingPointers = new Array<objTopping.Pointer>();

    return objCharacterMagnet()
        .mixin(mxnTool)
        .step(self => {
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

                for (const pointer of toppingPointers) {
                    moveTowards(pointer, self, 10);
                }
            }
            else {
                for (const pointer of toppingPointers) {
                    pointer.down = false;
                }

                toppingPointers.length = 0;
            }
        });
}
