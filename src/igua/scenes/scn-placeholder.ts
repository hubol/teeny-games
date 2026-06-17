import { Graphics } from "pixi.js";
import { Pointer, scene } from "../globals";
import { objPepperoniContainer } from "../objects/obj-pepperoni-container";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x00ff00;

    objPepperoniContainer()
        .at(40, 40)
        .show();

    // new Graphics()
    //     .step(self => {
    //         self.clear().beginFill(0xff0000);
    //         for (const position of Pointer.states) {
    //             self.drawCircle(position.x, position.y, 4);
    //         }
    //     })
    //     .show();
}
