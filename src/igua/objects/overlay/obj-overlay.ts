import { Container } from "pixi.js";

export function objOverlay() {
    return new Container();
}

export type ObjOverlay = ReturnType<typeof objOverlay>;
