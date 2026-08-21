import { DisplayObject } from "pixi.js";

export function mxnCameraSubject(obj: DisplayObject) {
    return obj
        .track(mxnCameraSubject);
}
