import { DisplayObject } from "pixi.js";
import { StepOrder } from "../objects/step-order";

interface MxnClampPositionArgs {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
}

export function mxnClampPosition(obj: DisplayObject, args: MxnClampPositionArgs) {
    return obj
        .step(() => {
            obj.x = Math.max(args.xmin, Math.min(obj.x, args.xmax));
            obj.y = Math.max(args.ymin, Math.min(obj.y, args.ymax));
        }, StepOrder.BeforeCamera);
}
