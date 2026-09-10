import { Container, DisplayObject } from "pixi.js";

export function mxnSerialize(obj: Container, source: mxnSerialize.Source) {
    const api = { source };

    return obj
        .merge({ mxnSerialize: api })
        .track(mxnSerialize);
}

mxnSerialize.createSource = function createSource<TFn extends (...args: any) => DisplayObject> (
    fn: TFn,
    ...args: Parameters<TFn>
): mxnSerialize.Source {
    return {
        id: fn.name,
        args,
    };
};

export namespace mxnSerialize {
    export type Type = ReturnType<typeof mxnSerialize>;
    export interface Source {
        id: string;
        args: any[];
    }
}
