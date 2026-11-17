import { Graphics } from "pixi.js";
import { container } from "../../../lib/pixi/container";
import { renderer } from "../../current-pixi-renderer";
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

    return new Graphics()
        .beginFill(0x000000)
        .drawRect(0, 0, renderer.width, renderer.height)
        .beginHole()
        .drawRoundedRect(renderer.width / 2 - width / 2, renderer.height / 2 - height / 2, width, height, 99);
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
