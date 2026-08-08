import { DisplayObject } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { scene } from "../globals";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objFigureToppingContainer } from "./figures/obj-figure-topping-container";
import { objAnnouncer } from "./obj-announcer";
import { objTopping } from "./obj-topping";

export function objToppingContainer(toppingId: DataToppings.Id) {
    const speed = vnew();
    const figureObj = objFigureToppingContainer(toppingId);

    let toppingObj = Null<DisplayObject>();
    let toppingObjCreatedAtTick = -999;

    const api = {
        toppingId,
        get activeSinceTick() {
            if (!toppingObj || toppingObj.destroyed) {
                return null;
            }

            return toppingObjCreatedAtTick;
        },
    };

    return container(figureObj)
        .merge({ objToppingContainer: api })
        .step(self => {
            const pointer = PizzaPointer.claim(self);
            if (pointer) {
                if (self.pivot.y <= 20) {
                    speed.y = -4;
                }
                figureObj.objFigureToppingContainer.happyStepsCount = 10;
                if (CtxLastToppingContainer.value.obj !== self) {
                    const sound = Sfx.Dialog.Toppings[toppingId];
                    if (sound) {
                        objAnnouncer.singleton.announce(sound);
                    }

                    CtxLastToppingContainer.value.obj = self;
                }
                toppingObj = objTopping(PizzaTopping.create(toppingId), pointer, "player").show();
                toppingObjCreatedAtTick = scene.ticker.ticks;
            }

            self.pivot.add(speed, -1);
            if (self.pivot.y <= 0) {
                self.pivot.y = 0;
                speed.y = 0;
            }
            else {
                speed.add(0, 0.4);
            }
        });
}

export namespace objToppingContainer {
    export type Type = ReturnType<typeof objToppingContainer>;
}

const CtxLastToppingContainer = new SceneLocal(
    () => ({ obj: Null<DisplayObject>() }),
    "CtxLastToppingContainer",
);
