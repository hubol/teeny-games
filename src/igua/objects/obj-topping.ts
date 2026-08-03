import { Graphics } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { container } from "../../lib/pixi/container";
import { PizzaTopping } from "../data/pizza-topping";
import { objFigureTopping } from "./figures/obj-figure-topping";
import { objFxHeartBurst } from "./fx/obj-fx-heart-burst";
import { objPizza } from "./obj-pizza";

export function objTopping(topping: PizzaTopping, pointer: objTopping.Pointer, createdBy: objTopping.CreatedBy) {
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
                    self.play(Sfx.Effects.Destroy.rate(0.8, 1.7));
                    objFxHeartBurst()
                        .tinted(topping.data.tint)
                        .at(self)
                        .show();
                }
                else {
                    self.play(topping.data.sfx.place);
                }
                self.destroy();
            }
            else if (pizzaObj) {
                const position = pizzaObj.objPizza.getSequencedWorldPosition.fromWorldPosition(
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
        .coro(function* (self) {
            if (createdBy === "player") {
                self.play(topping.data.sfx.pick);
            }
        })
        .track(objTopping)
        .at(pointer);
}

export namespace objTopping {
    export type Pointer = Pick<PointerListener.State, "x" | "y" | "down">;
    export type CreatedBy = "player" | "tool";
}
