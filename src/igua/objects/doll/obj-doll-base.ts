import { DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { VectorSimple } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";
import { mxnSerialize } from "../../mixins/mxn-serialize";
import { DataDollBodyParts } from "./data-doll-body-parts";

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

                const { x, y } = serializeObj.vcpy().add(offset);

                result.objects.push({
                    position: { x, y },
                    source: serializeObj.mxnSerialize.source,
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
        const fn = DataDollBodyParts.findById(object.source.id);
        const displayObject = fn(...object.source.args);
        baseObj.addChild(displayObject.at(object.position));
    }

    return baseObj;
};

export namespace objDollBase {
    export interface Serialized {
        objects: Array<Serialized.Object>;
    }

    export namespace Serialized {
        export interface Object {
            source: mxnSerialize.Source;
            position: VectorSimple;
        }
    }
}
