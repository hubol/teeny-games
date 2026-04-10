import { DisplayObject } from "pixi.js";

export function mxnMouth(obj: DisplayObject) {
    return obj
        .merge({ mxnMouth: { agapeUnit: 0 } });
}
