import { container } from "../../../lib/pixi/container";
import { objOverlayWarning } from "./obj-overlay-warning";

export function objOverlay() {
    return container(
        objOverlayWarning().at(20, 20),
    );
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
