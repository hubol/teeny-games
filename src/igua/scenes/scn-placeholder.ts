import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { renderer } from "../current-pixi-renderer";
import { Key, Pointer, scene } from "../globals";
import { objCharacterTuna } from "../objects/characters/obj-character-tuna";
import { objPizza } from "../objects/obj-pizza";
import { objSpeedControl } from "../objects/obj-speed-control";
import { objToppingContainer } from "../objects/obj-topping-container";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x00ff00;

    Sprite.from(Tx.Background).show();

    objToppingContainer("Pepperoni")
        .at(40, 40)
        .show();

    objToppingContainer("Pineapple")
        .tinted(0x202020)
        .at(40, 220)
        .show();

    objToppingContainer("Tomato")
        .tinted(0xff0000)
        .at(40, 220 + 180)
        .show();

    objToppingContainer("CanadianBacon")
        .tinted(0xff4080)
        .at(40, 220 + 180 + 180)
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

    scene.stage
        .coro(function* () {
            while (true) {
                yield* Coro.race([
                    holdf(() => speedControlObj.objSpeedControl.speed !== 0, Rng.int(30 * 60, 60 * 60)),
                    () => Key.justWentDown("KeyT"),
                ]);
                const tunaObj = objCharacterTuna()
                    .at(2000, 500)
                    .show();
                yield () => tunaObj.destroyed;
            }
        });
}
