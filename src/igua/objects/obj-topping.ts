import { Graphics } from "pixi.js";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { container } from "../../lib/pixi/container";
import { PizzaTopping } from "../data/pizza-topping";
import { objFigureTopping } from "./figures/obj-figure-topping";
import { objFxHeartBurst } from "./fx/obj-fx-heart-burst";
import { objPizza } from "./obj-pizza";

export function objTopping(topping: PizzaTopping, pointer: objTopping.Pointer) {
    const figureToppingObj = objFigureTopping(topping);
    const graphics = new Graphics();

    return container(
        figureToppingObj,
        graphics,
    )
        .step(self => {
            self.at(pointer);

            const pizzaObj = figureToppingObj.collidesOne(Instances(objPizza));
            graphics.clear();

            if (!pointer.down) {
                const burst = !pizzaObj?.objPizza?.submit(self.x, self.y, figureToppingObj.objFigureTopping) ?? true;

                if (burst) {
                    objFxHeartBurst()
                        .tinted(topping.attributes.tint)
                        .at(self)
                        .show();
                }
                self.destroy();
            }
            else if (pizzaObj) {
                const position = pizzaObj.objPizza.getSequencedPosition(
                    self.x,
                    self.y,
                    figureToppingObj.objFigureTopping,
                );
                if (!position) {
                    return;
                }
                graphics
                    .beginFill(0xffffff)
                    .drawCircle(position.x - self.x, position.y - self.y, 8);
            }
        })
        .track(objTopping)
        .at(pointer);
}

export namespace objTopping {
    export type Pointer = Pick<PointerListener.State, "x" | "y" | "down">;
}
