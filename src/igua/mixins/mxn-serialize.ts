import { DisplayObject } from "pixi.js";

export function mxnSerialize(obj: DisplayObject, sourceFn: () => DisplayObject) {
    const api = { sourceFn };

    return obj
        .merge({ mxnSerialize: api });
}

export namespace mxnSerialize {
    export type Type = ReturnType<typeof mxnSerialize>;
}
