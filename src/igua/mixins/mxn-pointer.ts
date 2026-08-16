import { Container, DisplayObject } from "pixi.js";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { Instances } from "../../lib/game-engine/instances";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { Integer } from "../../lib/math/number-alias-types";
import { Null } from "../../lib/types/null";
import { StepOrder } from "../objects/step-order";
import { DollPointer } from "../utils/doll-pointer";
import { mxnFxDie } from "./fx/mxn-fx-die";

const SlocPointerClaimProcessor = new SceneLocal(() => {
    new Container()
        .named("SlocPointerClaimProcessor")
        .step(() => {
            const pointerObjs = Instances(mxnPointer).sort((a, b) => b.mxnPointer.priority - a.mxnPointer.priority);

            for (const pointerObj of pointerObjs) {
                if (pointerObj.mxnPointer.current || mxnFxDie.isDying(pointerObj)) {
                    continue;
                }

                const maybePointer = DollPointer.claim(pointerObj);
                if (maybePointer) {
                    pointerObj.mxnPointer.current = maybePointer;
                    pointerObj.dispatch("mxnPointer.claimed", maybePointer);
                }
            }
        }, StepOrder.PointerClaim)
        .show();
    return -1;
}, "SlocPointerClaimProcessor");

export function mxnPointer(obj: DisplayObject, priorityProvider: (obj: DisplayObject) => Integer) {
    SlocPointerClaimProcessor.value;
    let pointer = Null<PointerListener.State>();

    const api = {
        get current() {
            if (pointer?.down === false) {
                return null;
            }

            return pointer;
        },
        set current(value) {
            pointer = value;
        },
        get maybeCurrent() {
            return pointer;
        },
        get priority() {
            return priorityProvider(obj);
        },
    };

    return obj
        .merge({ mxnPointer: api })
        .dispatchesValue<"mxnPointer.claimed", PointerListener.State>()
        .track(mxnPointer);
}

export namespace mxnPointer {
    export type Type = ReturnType<typeof mxnPointer>;
}
