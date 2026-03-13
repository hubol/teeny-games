import { Graphics } from "pixi.js";
import { Pointer, scene } from "../globals";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x00ff00;

    new Graphics()
        .step(self => {
            self.clear().beginFill(0xff0000);
            for (const position of Pointer.positions) {
                self.drawCircle(position.x, position.y, 4);
            }
        })
        .show();
}
