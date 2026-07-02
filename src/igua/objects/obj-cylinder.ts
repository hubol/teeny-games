import { Graphics } from "pixi.js";
import { Integer, RgbInt } from "../../lib/math/number-alias-types";
import { renderer } from "../current-pixi-renderer";

export function objCylinder(args: objCylinder.Args) {
    return new Graphics()
        .beginFill(args.wallTint)
        .drawRect(-args.width / 2, 0, args.width, renderer.height)
        .beginFill(args.topTint)
        .drawEllipse(0, 0, args.width / 2, args.radius);
}

namespace objCylinder {
    export interface Args {
        width: Integer;
        radius: Integer;
        topTint: RgbInt;
        wallTint: RgbInt;
    }
}
