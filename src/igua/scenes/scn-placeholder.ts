import { Graphics } from "pixi.js";
import { renderer } from "../current-pixi-renderer";
import { Pointer, scene } from "../globals";
import { objPepperoniContainer } from "../objects/obj-pepperoni-container";
import { objPizza } from "../objects/obj-pizza";
import { objSpeedControl } from "../objects/obj-speed-control";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x00ff00;

    objPepperoniContainer()
        .at(40, 40)
        .show();

    objPizza()
        .at(renderer.width / 2, renderer.height / 2)
        .show();

    objSpeedControl()
        .at(1700, 100)
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
