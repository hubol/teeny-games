import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { PointerListener } from "../../lib/browser/pointer-listener";

export function objPepperoni(pointer: PointerListener.State) {
    return Sprite.from(Tx.Toppings.Pepperoni)
        .anchored(0.5, 0.5)
        .step(self => self.at(pointer))
        .at(pointer);
}
