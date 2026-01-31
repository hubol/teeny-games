import { Graphics } from "pixi.js";
import { container } from "../../lib/pixi/container";
import { StepOrder } from "./step-order";

export function objActiveIndicator() {
    const api = {
        isFilling: true,
        fillUnit: 0,
        tint: 0xffffff,
    };

    const ringObj = new Graphics().lineStyle(3, 0xffffff, 1, 1).drawCircle(0, 0, 16);
    const fillObj = new Graphics().beginFill(0xffffff).drawCircle(0, 0, 16);
    const maskObj = new Graphics().beginFill(0xffffff).drawRect(-19, -19, 38, 38);

    return container(
        ringObj,
        fillObj,
        maskObj,
    )
        .merge({ objActiveIndicator: api })
        .step((self) => {
            ringObj.tint = api.tint;
            fillObj.tint = api.tint;
            self.mask = api.isFilling ? null : maskObj;
            maskObj.visible = !api.isFilling;
            fillObj.scale.set(api.isFilling ? Math.floor(api.fillUnit * 16) / 16 : 1);
            maskObj.y = api.isFilling ? 0 : Math.round((1 - api.fillUnit) * maskObj.height);
        }, StepOrder.BeforeCamera);
}
