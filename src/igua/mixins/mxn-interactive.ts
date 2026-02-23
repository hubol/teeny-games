import { DisplayObject } from "pixi.js";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { Null } from "../../lib/types/null";

interface MxnInteractiveApi {
    enabled: boolean;
    text: string;
}

export const LocalInteractive = new SceneLocal(() => ({
    focusedObj: Null<MxnInteractive>(),
}), "LocalInteractive");

export function mxnInteractive(obj: DisplayObject, partialApi: Partial<MxnInteractiveApi> = {}) {
    if (partialApi.enabled === undefined) {
        partialApi.enabled = true;
    }
    if (partialApi.text === undefined) {
        partialApi.text = "";
    }
    const api = partialApi as MxnInteractiveApi;

    return obj
        .merge({ mxnInteractive: api })
        .track(mxnInteractive);
}

type MxnInteractive = ReturnType<typeof mxnInteractive>;
