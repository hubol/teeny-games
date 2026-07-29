import { Graphics, LINE_CAP } from "pixi.js";
import { ToRad } from "../../lib/math/angle";
import { nlerp } from "../../lib/math/number";
import { RgbInt, Unit } from "../../lib/math/number-alias-types";
import { VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";

const v = vnew();

export function objControlArc(args: objControlArc.Args) {
    function getPosition(f: Unit): VectorSimple {
        const radians = nlerp(args.startDegrees, args.endDegrees, f) * ToRad;
        return v.at(Math.cos(radians), Math.sin(radians)).scale(args.radius);
    }

    let value = 0.5;

    const api = {
        get value() {
            return value;
        },
    };

    const handleObj = new Graphics()
        .beginFill(args.handleTint)
        .drawCircle(0, 0, 25)
        .at(getPosition(value));

    const trackObj = new Graphics()
        .lineStyle({ width: 20, color: args.trackTint, cap: LINE_CAP.ROUND });

    for (let f = 0; f < 1; f += 0.01) {
        const position = getPosition(f);
        trackObj[f === 0 ? "moveTo" : "lineTo"](position.x, position.y);
    }

    return container(
        trackObj,
        handleObj,
    )
        .merge({ objControlArc: api });
}

namespace objControlArc {
    export interface Args {
        radius: number;
        startDegrees: number;
        endDegrees: number;
        trackTint: RgbInt;
        handleTint: RgbInt;
    }
}
