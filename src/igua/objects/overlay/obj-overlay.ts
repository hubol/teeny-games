import { container } from "../../../lib/pixi/container";

export function objOverlay() {
    const localObj = container();

    return container(localObj)
        .merge({ localObj });
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
