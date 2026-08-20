import { Instances } from "../../lib/game-engine/instances";
import { RgbInt } from "../../lib/math/number-alias-types";
import { VectorSimple } from "../../lib/math/vector-type";
import { objMarker } from "../objects/utils/obj-marker";

export namespace Search {
    export function findMarkers(tint: RgbInt): VectorSimple[] {
        return Instances(objMarker).filter(obj => obj.tint === tint);
    }
}
