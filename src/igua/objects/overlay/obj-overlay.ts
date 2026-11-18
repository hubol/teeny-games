import { Graphics } from "pixi.js";
import { onMutate } from "../../../lib/game-engine/routines/on-mutate";
import { Toast } from "../../../lib/game-engine/toast";
import { container } from "../../../lib/pixi/container";
import { renderer } from "../../current-pixi-renderer";
import { Key } from "../../globals";
import { mxnActionRepeater } from "../../mixins/mxn-action-repeater";
import { objOverlayWarning } from "./obj-overlay-warning";

export function objOverlay() {
    return container(
        objOverlayWarning(),
        objScreen(),
    );
}

function objScreen() {
    const height = renderer.height - 36;
    const width = Math.round((4 / 3) * height);

    const config = {
        left: Math.round((renderer.width - width) / 2),
        top: Math.round((renderer.height - height) / 2),
        right: Math.round((renderer.width + width) / 2),
        bottom: Math.round((renderer.height + height) / 2),
        radius: 99,
    };

    return new Graphics()
        .mixin(mxnActionRepeater, ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"])
        .step((self) => {
            let x = 0;
            let y = 0;

            if (self.mxnActionRepeater.justWentDown("ArrowUp")) {
                y -= 1;
            }
            if (self.mxnActionRepeater.justWentDown("ArrowDown")) {
                y += 1;
            }
            if (self.mxnActionRepeater.justWentDown("ArrowLeft")) {
                x -= 1;
            }
            if (self.mxnActionRepeater.justWentDown("ArrowRight")) {
                x += 1;
            }

            if (Key.isDown("KeyT")) {
                config.left += x;
                config.right += x;
                config.top += y;
                config.bottom += y;
            }
            else if (Key.isDown("KeyR")) {
                config.radius += x + y;
            }
            else if (Key.isDown("KeyW")) {
                config.top += y;
            }
            else if (Key.isDown("KeyS")) {
                config.bottom += y;
            }
            else if (Key.isDown("KeyA")) {
                config.left += x;
            }
            else if (Key.isDown("KeyD")) {
                config.right += x;
            }

            if (Key.isDown("ControlLeft") && Key.justWentDown("KeyC")) {
                const configText = JSON.stringify(config);
                console.log(configText);
                setTimeout(async () => {
                    await navigator.clipboard.writeText(configText);
                    Toast.info("Copied", "Copied calibration to keyboard");
                });
            }
        })
        .coro(function* (self) {
            while (true) {
                self
                    .clear()
                    .beginFill(0x000000)
                    .drawRect(0, 0, renderer.width, renderer.height)
                    .beginHole()
                    .drawRoundedRect(
                        config.left,
                        config.top,
                        config.right - config.left,
                        config.bottom - config.top,
                        config.radius,
                    );
                yield onMutate(config);
            }
        });
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
