import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Environment } from "../../lib/environment";
import { Instances } from "../../lib/game-engine/instances";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { factor, interpv } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { DataToppings } from "../data/data-toppings";
import { Key, Pointer, scene } from "../globals";
import { objCharacterTuna } from "../objects/characters/obj-character-tuna";
import { objCondiment } from "../objects/obj-condiment";
import { objAttachedTopping, objPizza } from "../objects/obj-pizza";
import { objSpeedControl } from "../objects/obj-speed-control";
import { objToppingContainerPillar } from "../objects/obj-topping-container-pillar";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { objToolMagnet } from "../objects/tools/obj-tool-magnet";

export function scnPlaceholder() {
    Sprite.from(Tx.Background).at(-38, -16).show();

    const toppingIds: Array<DataToppings.Id> = [
        "Mushroom",
        "GreenPepper",
        "Tomato",
        "Onion",
    ];

    const toppingContainersObj = container().show();

    objToppingContainerPillar({
        topTint: 0xcf1406,
        wallTint: 0xe73f21,
        toppingProvider: () => toppingIds[0],
    })
        .at(130 + 130, 40 + 210)
        .show(toppingContainersObj);

    objToppingContainerPillar({
        topTint: 0xffc400,
        wallTint: 0xe7e421,
        toppingProvider: () => toppingIds[1],
    })
        .at(130 + 70, 40 + 500)
        .show(toppingContainersObj);

    objToppingContainerPillar({
        topTint: 0x0bb343,
        wallTint: 0x28e431,
        toppingProvider: () => toppingIds[2],
    })
        .at(130 + 90, 40 + 730)
        .show(toppingContainersObj);

    objToppingContainerPillar({
        topTint: 0x0694cc,
        wallTint: 0x5dbbe0,
        toppingProvider: () => toppingIds[3],
    })
        .at(130 + 155, 40 + 995)
        .show(toppingContainersObj);

    const speedControlObj = objSpeedControl()
        .at(1750, 280)
        .show();

    const pizzaObj = objPizza(speedControlObj)
        .at(renderer.width / 2, renderer.height / 2)
        .show();

    Pointer.allowedType = (Environment.isDev || !Environment.isElectron) ? "any" : "touch";

    objOverlayCursor()
        .zIndexed(999999)
        .show();

    const condimentsDrawerObj = container(
        Sprite.from(Tx.Condiments.Drawer).scaled(2, 2),
    )
        .at(1400, 800)
        .coro(function* (self) {
            const enabledPosition = self.vcpy();
            const disabledPosition = enabledPosition.vcpy();
            disabledPosition.x = renderer.width + self.width;

            self.at(disabledPosition);

            while (true) {
                yield onPrimitiveMutate(() => pizzaObj.objPizza.playedSequencedSamplesCount);
                yield holdf(
                    () => pizzaObj.objPizza.attachedToppingsCount >= 5 && speedControlObj.objSpeedControl.speed > 0,
                    120,
                );
                yield interpv(self).factor(factor.sine).to(enabledPosition).over(500);
                yield () => !pizzaObj.objPizza.areAnyToppingsAttached && !pizzaObj.objPizza.areAnyToppingsBeingDragged;
                yield interpv(self).factor(factor.sine).to(disabledPosition).over(500);
            }
        })
        .show();

    objCondiment("Parmesan")
        .at(150, 200)
        .show(condimentsDrawerObj);

    objToolMagnet()
        .at(1880, 700)
        .coro(function* (self) {
            while (true) {
                yield () => pizzaObj.objPizza.attachedToppingsCount >= 5;
                if (speedControlObj.objSpeedControl.speed !== 0) {
                    yield onPrimitiveMutate(() => pizzaObj.objPizza.playedSequencedSamplesCount);
                }
                self.mxnTool.isEnabled = true;
                yield () => !pizzaObj.objPizza.areAnyToppingsAttached && !pizzaObj.objPizza.areAnyToppingsBeingDragged;
                self.mxnTool.isEnabled = false;
            }
        })
        .show();

    scene.stage
        .coro(function* () {
            while (true) {
                yield* Coro.race([
                    holdf(
                        () => speedControlObj.objSpeedControl.speed !== 0 && Instances(objAttachedTopping).length > 0,
                        Rng.int(60 * 60, 90 * 60),
                    ),
                    () => Key.justWentDown("KeyT"),
                ]);
                const tunaObj = objCharacterTuna()
                    .at(2000, 700)
                    .show();
                yield () => tunaObj.destroyed;
            }
        });
}
