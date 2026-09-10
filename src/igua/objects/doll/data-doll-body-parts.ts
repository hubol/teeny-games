import { DisplayObject, Sprite, Texture } from "pixi.js";
import { objDollArm } from "./obj-doll-arm";
import { objDollButton } from "./obj-doll-button";
import { objDollEar } from "./obj-doll-ear";
import { objDollEye } from "./obj-doll-eye";
import { objDollHair } from "./obj-doll-hair";
import { objDollLeg } from "./obj-doll-leg";
import { objDollMouth } from "./obj-doll-mouth";
import { objDollScrew } from "./obj-doll-screw";

export namespace DataDollBodyParts {
    const manifest = [
        objDollArm,
        objDollButton,
        objDollEar,
        objDollEye,
        objDollHair,
        objDollLeg,
        objDollMouth,
        objDollScrew,
    ];

    type Fn = (...args: any[]) => DisplayObject;

    const manifestById = manifest.reduce((object, fn) => {
        object[fn.name] = fn;
        return object;
    }, {} as Record<string, Fn>);

    const fallbackFn: Fn = () => Sprite.from(Texture.EMPTY);

    export function getManifestCopy() {
        return [...manifest];
    }

    export function findById(id: string) {
        return manifestById[id] ?? fallbackFn;
    }
}
