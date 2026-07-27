import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Environment } from "../../lib/environment";
import { Instances } from "../../lib/game-engine/instances";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { factor, interpv } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { DataToppings } from "../data/data-toppings";
import { Key, Pointer, scene } from "../globals";
import { mxnFxBoil } from "../mixins/fx/mxn-fx-boil";
import { objCharacterMystery } from "../objects/characters/obj-character-mystery";
import { objCharacterTuna } from "../objects/characters/obj-character-tuna";
import { objCondiment } from "../objects/obj-condiment";
import { objFeatureFlags } from "../objects/obj-feature-flags";
import { objAttachedTopping, objPizza } from "../objects/obj-pizza";
import { objSpeedControl } from "../objects/obj-speed-control";
import { objToppingContainerPillar } from "../objects/obj-topping-container-pillar";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { objToolMagnet } from "../objects/tools/obj-tool-magnet";

export function scnMain() {
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
                yield* Coro.race([
                    Coro.chain([
                        onPrimitiveMutate(() => pizzaObj.objPizza.playedSequencedSamplesCount),
                        holdf(
                            () =>
                                pizzaObj.objPizza.attachedToppingsCount >= 5
                                && speedControlObj.objSpeedControl.speed > 0,
                            120,
                        ),
                    ]),
                    () => objFeatureFlags.singleton.isEnabled("ForceCondiments"),
                ]);
                yield interpv(self).factor(factor.sine).to(enabledPosition).over(500);
                yield () =>
                    !pizzaObj.objPizza.areAnyToppingsAttached
                    && !pizzaObj.objPizza.areAnyToppingsBeingDragged
                    && !objFeatureFlags.singleton.isEnabled("ForceCondiments");
                yield interpv(self).factor(factor.sine).to(disabledPosition).over(500);
            }
        })
        .show();

    objCondiment("Parmesan")
        .at(130, 200)
        .show(condimentsDrawerObj);

    objCondiment("HotSauce")
        .at(250, 200)
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

    scene.stage
        .coro(function* () {
            const defaultToppingIds = [...toppingIds];

            while (true) {
                yield () => objFeatureFlags.singleton.isEnabled("Sweetzza");
                toppingIds[0] = "Pineapple";
                toppingIds[1] = "MandarinOrange";
                toppingIds[2] = "Kiwi";
                toppingIds[3] = "Strawberry";
                yield () => !objFeatureFlags.singleton.isEnabled("Sweetzza");
                toppingIds.length = 0;
                toppingIds.push(...defaultToppingIds);
            }
        });

    // Number of lid colors in the grocery store: 7 (Black, White, Green, Yellow, Orange, Red, Blue)
    // Number of smoothie types in the farmers market: 2
    // Not counting sauce and cheese, the number of topping buckets in pizzeria: 11 (Feta, Pepperoni, Sausage, Ham, Onion, Tomato, Green Pepper, Pineapple, Mandarin Orange, Mushroom, Anchovy)
    // Number of race track lanes in Notion of Motion: 6

    const mysteryRevealConditions = new Array<{ toppingId: DataToppings.Id; count: Integer }>(
        {
            toppingId: "Tomato",
            count: 11,
        },
        {
            toppingId: "Onion",
            count: 6,
        },
        {
            toppingId: "Mushroom",
            count: 2,
        },
        {
            toppingId: "GreenPepper",
            count: 7,
        },
    );

    objCharacterMystery()
        .at(1412, 102)
        .step(self => {
            self.objCharacterMystery.isRevealed = mysteryRevealConditions
                .every(({ count, toppingId }) => pizzaObj.objPizza.getToppingCount(toppingId) === count);
        })
        .show();
}
