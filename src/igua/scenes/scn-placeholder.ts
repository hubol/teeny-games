import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { Key, Pointer, scene } from "../globals";
import { objCharacterTuna } from "../objects/characters/obj-character-tuna";
import { objCylinder } from "../objects/obj-cylinder";
import { objPizza } from "../objects/obj-pizza";
import { objSpeedControl } from "../objects/obj-speed-control";
import { objToppingContainer } from "../objects/obj-topping-container";
import { objToolMagnet } from "../objects/tools/obj-tool-magnet";

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x00ff00;

    Sprite.from(Tx.Background).show();

    const toppingContainersObj = container().show();

    objCylinder({
        radius: 40,
        width: 400,
        topTint: 0xcf1406,
        wallTint: 0xe73f21,
    })
        .at(130 + 130, 40 + 210)
        .show(toppingContainersObj);

    objCylinder({
        radius: 40,
        width: 400,
        topTint: 0xffc400,
        wallTint: 0xe7e421,
    })
        .at(130 + 70, 40 + 500)
        .show(toppingContainersObj);

    objCylinder({
        radius: 40,
        width: 400,
        topTint: 0x0bb343,
        wallTint: 0x28e431,
    })
        .at(130 + 90, 40 + 730)
        .show(toppingContainersObj);

    objCylinder({
        radius: 40,
        width: 400,
        topTint: 0x0694cc,
        wallTint: 0x5dbbe0,
    })
        .at(130 + 155, 40 + 995)
        .show(toppingContainersObj);

    objToppingContainer("Mushroom")
        .at(130, 40)
        .show(toppingContainersObj);

    objToppingContainer("GreenPepper")
        .at(90, 270 + 30)
        .show(toppingContainersObj);

    objToppingContainer("Tomato")
        .at(80, 270 + 270 + 60)
        .show(toppingContainersObj);

    objToppingContainer("Onion")
        .at(160, 770 + 70)
        .show(toppingContainersObj);

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
        .zIndexed(999999)
        .show();

    objToolMagnet()
        .at(1850, 950)
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
