import { DisplayObject } from "pixi.js";

export function mxnCollectible(obj: DisplayObject) {
    return obj
        .dispatches<"collectible:collect">()
        .track(mxnCollectible);
}

export type MxnCollectible = ReturnType<typeof mxnCollectible>;
