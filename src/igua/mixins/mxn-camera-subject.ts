import { DisplayObject } from "pixi.js";

export function mxnCameraSubject(obj: DisplayObject) {
    const api = {
        isEnabled: true,
    };

    return obj
        .merge({ mxnCameraSubject: api })
        .track(mxnCameraSubject);
}
