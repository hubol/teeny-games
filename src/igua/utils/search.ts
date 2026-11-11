import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Instances } from "../../lib/game-engine/instances";
import { RgbInt } from "../../lib/math/number-alias-types";
import { distance } from "../../lib/math/vector";
import { Null } from "../../lib/types/null";
import { objMarker } from "../objects/utils/obj-marker";
import { OgmoFactory } from "../ogmo/factory";

export namespace Search {
    export function findDecals(tx: Texture, ...txs: Texture[]): Sprite[] {
        const txsSet = new Set([tx, ...txs]);
        return Instances(OgmoFactory.createDecal).filter(obj => txsSet.has(obj.texture));
    }

    export function findMarkers(tint: RgbInt): Container[] {
        return Instances(objMarker).filter(obj => obj.tint === tint);
    }

    export function findClosest<TObj extends DisplayObject>(obj: DisplayObject, targetObjs: TObj[]): TObj | null {
        let minimumDistance = Number.MAX_SAFE_INTEGER;
        let closestObj = Null<TObj>();

        for (const targetObj of targetObjs) {
            const targetDistance = distance(obj, targetObj);
            if (targetDistance < minimumDistance) {
                minimumDistance = targetDistance;
                closestObj = targetObj;
            }
        }

        return closestObj;
    }
}
