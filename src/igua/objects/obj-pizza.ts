import { Graphics, Point, RAD_TO_DEG } from "pixi.js";
import { cyclic } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { vdir } from "../../lib/math/vector";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { DataToppings } from "../data/data-toppings";
import { objFigureTopping } from "./figures/obj-figure-topping";

const consts = {
    tracksCount: 8,
    radius: {
        min: 60,
        delta: 54,
        get max() {
            return consts.radius.min + consts.radius.delta * consts.tracksCount;
        },
    },
};

const c4Hz = 261.63;
const cScaleRates = [
    c4Hz,
    293.66,
    329.63,
    349.23,
    392.00,
    440.00,
    493.88,
    c4Hz * 2,
]
    .map(hz => hz / c4Hz);

const p = new Point();

export function objPizza() {
    const api = {
        submit,
    };

    const toppingsObj = container<objAttachedTopping.Type>()
        .step(self => {
            self.angle = (self.angle + 1) % 360;
            const angle = Math.round(self.angle);
            for (const toppingObj of toppingsObj.children) {
                if (toppingObj.objAttachedTopping.angle === angle) {
                    const sfx = DataToppings.getById(toppingObj.objFigureTopping.id).sfx;
                    const rate = cScaleRates[toppingObj.objAttachedTopping.trackIndex];
                    sfx.rate(rate).play();
                }
            }
        });

    function submit(x: number, y: number, id: DataToppings.Id) {
        p.set(x, y);
        toppingsObj.worldTransform.applyInverse(p, p);

        if (p.vlength > consts.radius.max) {
            return;
        }

        const angle = Math.round(cyclic((Math.PI / 2 - vdir(p)) * -RAD_TO_DEG, 0, 360));

        const trackIndex = Math.min(
            consts.tracksCount - 1,
            Math.round(Math.max(0, p.vlength - consts.radius.min) / consts.radius.delta),
        );

        p.vlength = consts.radius.min + consts.radius.delta * trackIndex;

        objAttachedTopping(id, angle, trackIndex).at(p).show(toppingsObj);
    }

    return container(
        objPizzaCrust(),
        toppingsObj,
    )
        .merge({ objPizza: api })
        .track(objPizza);
}

function objAttachedTopping(id: DataToppings.Id, angle: Integer, trackIndex: Integer) {
    return objFigureTopping(id)
        .merge({ objAttachedTopping: { angle, trackIndex } });
}

namespace objAttachedTopping {
    export type Type = ReturnType<typeof objAttachedTopping>;
}

function objPizzaCrust() {
    return container(
        new Graphics().beginFill(0xad7121)
            .drawCircle(0, 0, consts.radius.max),
        ...range(consts.tracksCount).map(i =>
            new Graphics()
                .lineStyle(4, 0x412c0c)
                .drawCircle(0, 0, consts.radius.min + consts.radius.delta * i)
        ),
    );
}
