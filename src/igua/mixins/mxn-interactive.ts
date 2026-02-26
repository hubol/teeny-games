import { DisplayObject } from "pixi.js";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { Null } from "../../lib/types/null";
import { Item } from "../objects/data-item";
import { ObjMisha } from "../objects/obj-misha";

interface MxnInteractiveApi {
    enabled: boolean;
    text: string | ((heldItem: Item | null) => string);
    interact: (heldItem: { ref: Item | null }) => void;
}

export const LocalInteractive = new SceneLocal(() => ({
    focusedObj: Null<MxnInteractive>(),
    mishaObj: Null<ObjMisha>(),
}), "LocalInteractive");

export function mxnInteractive(obj: DisplayObject, partialApi: Partial<MxnInteractiveApi> = {}) {
    if (partialApi.enabled === undefined) {
        partialApi.enabled = true;
    }
    if (partialApi.text === undefined) {
        partialApi.text = "";
    }
    if (partialApi.interact === undefined) {
        partialApi.interact = () => {};
    }
    const api = partialApi as MxnInteractiveApi;

    return obj
        .merge({ mxnInteractive: api })
        .track(mxnInteractive);
}

export type MxnInteractive = ReturnType<typeof mxnInteractive>;
