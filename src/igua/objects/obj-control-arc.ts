import { Graphics, LINE_CAP, Point } from "pixi.js";
import { ToRad } from "../../lib/math/angle";
import { nlerp } from "../../lib/math/number";
import { RgbInt, Unit } from "../../lib/math/number-alias-types";
import { VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { mxnPointerClaim } from "../mixins/mxn-pointer-claim";

const p = new Point();
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
        .mixin(mxnPointerClaim)
        .at(getPosition(value))
        .step(self => {
            if (!self.mxnPointerClaim.pointer) {
                return;
            }

            self.at(self.parent.worldTransform.applyInverse(self.mxnPointerClaim.pointer, p));
            self.position.vlength = args.radius;
        });

    const trackObj = new Graphics()
        .lineStyle({ width: 20, color: args.trackTint, cap: LINE_CAP.ROUND });

    for (let f = 0; f < 1; f += 0.01) {
        const position = getPosition(f);
        trackObj[f === 0 ? "moveTo" : "lineTo"](position.x, position.y);
    }

    const containerObj = container(
        trackObj,
        handleObj,
    );

    return containerObj
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
