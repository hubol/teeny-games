import { Graphics } from "pixi.js";
import { renderer } from "../current-pixi-renderer";
import { Key, Pointer, scene } from "../globals";
import { objPepperoniContainer } from "../objects/obj-pepperoni-container";
import { objPizza } from "../objects/obj-pizza";
import { objSpeedControl } from "../objects/obj-speed-control";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x00ff00;

    objPepperoniContainer("Pepperoni")
        .at(40, 40)
        .show();

    objPepperoniContainer("Beef")
        .tinted(0x202020)
        .at(40, 220)
        .show();

    const speedControlObj = objSpeedControl()
        .at(1700, 100)
        .show();

    objPizza(speedControlObj)
        .at(renderer.width / 2, renderer.height / 2)
        .show();

    new Graphics()
        .step(self => {
            if (Key.justWentDown("KeyQ")) {
                Pointer.allowedType = Pointer.allowedType === "mouse" ? "touch" : "mouse";
            }

            self.visible = Pointer.allowedType === "mouse";

            self.clear().beginFill(0xff0000);
            for (const position of Pointer.states) {
                self.drawCircle(position.x, position.y, 4);
            }
        })
        .show();
}
