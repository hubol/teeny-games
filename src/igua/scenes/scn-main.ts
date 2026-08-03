import { Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { factor, interpv } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { approachLinear, nlerp } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { DataToppings } from "../data/data-toppings";
import { PizzaToppingBanks } from "../data/pizza-topping-banks";
import { scene } from "../globals";
import { objCharacterMystery } from "../objects/characters/obj-character-mystery";
import { objCharacterWarning } from "../objects/characters/obj-character-warning";
import { objAnnouncer } from "../objects/obj-announcer";
import { objCondiment } from "../objects/obj-condiment";
import { objControlArc } from "../objects/obj-control-arc";
import { objFeatureFlags } from "../objects/obj-feature-flags";
import { objPizza } from "../objects/obj-pizza";
import { objSpeedControl } from "../objects/obj-speed-control";
import { objToppingContainerPillar } from "../objects/obj-topping-container-pillar";
import { objVisitors } from "../objects/obj-visitors";
import { objOverlayCursor } from "../objects/overlay/obj-overlay-cursor";
import { objToolBankSwapper } from "../objects/tools/obj-tool-bank-swapper";
import { objToolMagnet } from "../objects/tools/obj-tool-magnet";
import { PizzaSamples } from "../utils/pizza-samples";

export function scnMain() {
    Sprite.from(Tx.Background)
        .at(-38, -16)
        .zIndexed(-999)
        .show();

    objCharacterWarning()
        .at(20, 20)
        .show();

    const banks = PizzaToppingBanks.create();

    const toppingContainersObj = container().show();

    objToppingContainerPillar({
        topTint: 0xcf1406,
        wallTint: 0xe73f21,
        toppingProvider: () => banks.current[0],
    })
        .at(130 + 130, 40 + 210)
        .show(toppingContainersObj);

    objToppingContainerPillar({
        topTint: 0xffc400,
        wallTint: 0xe7e421,
        toppingProvider: () => banks.current[1],
    })
        .at(130 + 70, 40 + 500)
        .show(toppingContainersObj);

    objToppingContainerPillar({
        topTint: 0x0bb343,
        wallTint: 0x28e431,
        toppingProvider: () => banks.current[2],
    })
        .at(130 + 90, 40 + 730)
        .show(toppingContainersObj);

    objToppingContainerPillar({
        topTint: 0x0694cc,
        wallTint: 0x5dbbe0,
        toppingProvider: () => banks.current[3],
    })
        .at(130 + 155, 40 + 995)
        .show(toppingContainersObj);

    const speedControlObj = objSpeedControl()
        .at(1750, 280)
        .show();

    const pizzaObj = objPizza(speedControlObj)
        .at(renderer.width / 2, renderer.height / 2)
        .show();

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
        .at(120, 200)
        .show(condimentsDrawerObj);

    objCondiment("HotSauce")
        .at(360, 200)
        .show(condimentsDrawerObj);

    objCondiment("Ranch")
        .at(250, 200)
        .show(condimentsDrawerObj);

    objCondiment("Oregano")
        .at(458, 200)
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

    objVisitors()
        .show();

    scene.stage
        .coro(function* () {
            while (true) {
                yield () => objFeatureFlags.singleton.isEnabled("Sweetzza");
                banks.unlock("Sweetzza");
                banks.swapTo("Sweetzza");
                yield () => !objFeatureFlags.singleton.isEnabled("Sweetzza");
                banks.swapTo("Default");
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
            self.objCharacterMystery.isRevealed = !banks.isUnlocked("Sweetzza") && mysteryRevealConditions
                .every(({ count, toppingId }) => pizzaObj.objPizza.getToppingCount(toppingId) === count);
        })
        .handles("objCharacterMystery:pressed", () => {
            if (banks.unlock("Sweetzza")) {
                Sfx.Effects.Unlock.play();
                objAnnouncer.singleton.announce(Sfx.Dialog.Events.NewToppingsUnlocked);
            }
            banks.swapTo("Sweetzza");
        })
        .show();

    objToolBankSwapper(banks)
        .at(515, 100)
        .show();

    objControlArc({
        startDegrees: -20,
        endDegrees: 50,
        radius: 630,
        handleTint: 0x23B686,
        trackTint: 0x780AFF,
        defaultValue: 0,
    })
        .coro(function* (self) {
            function playSample() {
                const rawRate = nlerp(0.5, 2, self.objControlArc.value);
                const rate = PizzaSamples.getNearestCScaleRate(rawRate);
                console.log(rate);
                self.play(Sfx.Samples.Wah.rate(rate));
            }

            pizzaObj.handles("objPizza:sequence16", () => {
                if (self.objControlArc.isBeingHandled) {
                    playSample();
                }
            });

            self.step(() => {
                pizzaObj.objPizza.sauceCheeseUnit = approachLinear(
                    pizzaObj.objPizza.sauceCheeseUnit,
                    self.objControlArc.value,
                    0.1,
                );

                if (
                    self.objControlArc.isBeingHandled
                    && (speedControlObj.objSpeedControl.speed === 0 || !pizzaObj.objPizza.areAnyToppingsAttached)
                    && scene.ticker.ticks % 15 === 0
                ) {
                    playSample();
                }
            });
        })
        .at(pizzaObj)
        .zIndexed(-1)
        .show();
}
