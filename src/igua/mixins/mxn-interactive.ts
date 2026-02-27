import { DisplayObject } from "pixi.js";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { Null } from "../../lib/types/null";
import { Item } from "../objects/data-item";
import { ObjMisha } from "../objects/obj-misha";

interface MxnInteractiveApi {
    enabled: boolean;
    text: string | ((heldItem: Item | null) => string);
    interact: (heldItem: { ref: Item | null }) => void;
    boundsObj: DisplayObject;
}

export const LocalInteractive = new SceneLocal(() => {
    let focusedObj = Null<MxnInteractive>();

    return ({
        get focusedObj() {
            if (!focusedObj) {
                return focusedObj;
            }
            return focusedObj.mxnInteractive.enabled ? focusedObj : null;
        },
        set focusedObj(value: typeof focusedObj) {
            focusedObj = value;
        },
        mishaObj: Null<ObjMisha>(),
    });
}, "LocalInteractive");

export function mxnInteractive(obj: DisplayObject, partialApi: Partial<MxnInteractiveApi> = {}) {
    if (partialApi.enabled === undefined) {
        partialApi.enabled = true;
    }
    if (partialApi.text === undefined) {
        partialApi.text = "";
    }
    if (!partialApi.interact) {
        partialApi.interact = () => {};
    }
    if (!partialApi.boundsObj) {
        partialApi.boundsObj = obj;
    }
    const api = partialApi as MxnInteractiveApi;

    return obj
        .merge({ mxnInteractive: api })
        .track(mxnInteractive);
}

export type MxnInteractive = ReturnType<typeof mxnInteractive>;
