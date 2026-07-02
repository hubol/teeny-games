import { DisplayObject, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { mxnFxBoil } from "../mixins/fx/mxn-fx-boil";
import { mxnFxFlipH } from "../mixins/fx/mxn-fx-flip-h";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objTopping } from "./obj-topping";

export function objToppingContainer(toppingId: DataToppings.Id) {
    const speed = vnew();
    const figureObj = objFigureToppingContainer(toppingId);
    return container(figureObj)
        .step(self => {
            const pointer = PizzaPointer.claim(self);
            if (pointer) {
                if (self.pivot.y <= 20) {
                    speed.y = -4;
                }
                figureObj.objFigureToppingContainer.happyStepsCount = 10;
                if (CtxLastToppingContainer.value.obj !== self) {
                    const sound = Sfx.Dialog.Toppings[toppingId];
                    sound?.rate(0.9, 1.1)?.play();
                    CtxLastToppingContainer.value.obj = self;
                }
                objTopping(PizzaTopping.create(toppingId), pointer).show();
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

function objFigureToppingContainer(toppingId: DataToppings.Id) {
    const api = {
        happyStepsCount: 0,
    };

    const obj = container()
        .merge({ objFigureToppingContainer: api })
        .step(() => api.happyStepsCount--);

    if (toppingId in Tx.Containers && toppingId in Tx.Containers.Happy) {
        const txs = Tx.Containers[toppingId].split({ count: 2 });
        const happyTxs = Tx.Containers.Happy[toppingId].split({ count: 2 });

        container(
            Sprite.from(txs[0])
                .step(self => self.texture = api.happyStepsCount <= 0 ? txs[0] : happyTxs[0]),
            Sprite.from(txs[1])
                .mixin(mxnFxBoil, "position")
                .step(self => self.texture = api.happyStepsCount <= 0 ? txs[1] : happyTxs[1]),
        )
            .scaled(2, 2)
            .show(obj);
    }
    else {
        Sprite.from(Tx.Containers.Pepperoni)
            .mixin(mxnFxFlipH)
            .show(obj);
    }

    return obj;
}

const CtxLastToppingContainer = new SceneLocal(
    () => ({ obj: Null<DisplayObject>() }),
    "CtxLastToppingContainer",
);
