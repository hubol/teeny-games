import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { container } from "../../../lib/pixi/container";

export function objCharacterStopwatch() {
    const maskObj = new Graphics()
        .beginFill(0xff0000)
        .drawCircle(16, 21, 11);

    let fillUnit = 0;

    const fillObj = new Graphics()
        .at(16, 21)
        .angled(-90)
        .masked(maskObj);

    fillObj.alpha = 0.9;

    const api = {
        get fillUnit() {
            return fillUnit;
        },
        set fillUnit(value) {
            if (value === fillUnit) {
                return;
            }

            fillUnit = value;
            fillObj.clear();
            const max = value * 4;
            for (let i = 0; i < max; i += 1) {
                const f = Math.min(1, max - i);
                fillObj.beginFill(0xf05129);
                fillObj.moveTo(0, 0);
                const start = i * Math.PI / 2;
                fillObj.lineTo(Math.cos(start) * 60, Math.sin(start) * 60);
                const end = (i + f) * Math.PI / 2;
                fillObj.lineTo(Math.cos(end) * 60, Math.sin(end) * 60);
                fillObj.lineTo(0, 0);
                fillObj.endFill();
            }
        },
    };

    return container(
        Sprite.from(Tx.Characters.Stopwatch),
        maskObj,
        fillObj,
    )
        .merge({ objCharacterStopwatch: api });
}
