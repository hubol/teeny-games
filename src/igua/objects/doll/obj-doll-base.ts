import { DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { Vector } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";
import { mxnSerialize } from "../../mixins/mxn-serialize";

export function objDollBase() {
    const api = {
        serialize(objs: DisplayObject[]): objDollBase.Serialized {
            const result: objDollBase.Serialized = {
                objects: [],
            };

            const offset = obj.vcpy().scale(-1);

            for (const serializeObj of objs) {
                if (!serializeObj.is(mxnSerialize)) {
                    continue;
                }

                result.objects.push({
                    position: serializeObj.vcpy().add(offset),
                    sourceFn: serializeObj.mxnSerialize.sourceFn,
                });
            }

            return result;
        },
    };

    const obj = container(
        Sprite.from(Tx.Doll.Base)
            .anchored(0.5, 0.5)
            .scaled(3, 3),
    );

    return obj
        .merge({ objDollBase: api });
}

objDollBase.deserialize = function deserialize (data: objDollBase.Serialized) {
    const baseObj = objDollBase();

    for (const object of data.objects) {
        baseObj.addChild(object.sourceFn().at(object.position));
    }

    return baseObj;
};

export namespace objDollBase {
    export interface Serialized {
        objects: Array<Serialized.Object>;
    }

    export namespace Serialized {
        export interface Object {
            sourceFn: () => DisplayObject;
            position: Vector;
        }
    }
}
