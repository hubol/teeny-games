import { Graphics, Point } from "pixi.js";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { DataToppings } from "../data/data-toppings";
import { objFigureTopping } from "./figures/obj-figure-topping";

const consts = {
    tracksCount: 9,
    radius: {
        min: 60,
        delta: 40,
        get max() {
            return consts.radius.min + consts.radius.delta * consts.tracksCount;
        },
    },
};

const p = new Point();

export function objPizza() {
    const api = {
        submit,
    };

    const toppingsObj = container()
        .step(self => self.angle += 1);

    function submit(x: number, y: number, id: DataToppings.Id) {
        p.set(x, y);
        toppingsObj.worldTransform.applyInverse(p, p);

        if (p.vlength > consts.radius.max) {
            return;
        }

        const trackIndex = Math.min(
            consts.tracksCount - 1,
            Math.round(Math.max(0, p.vlength - consts.radius.min) / consts.radius.delta),
        );

        p.vlength = consts.radius.min + consts.radius.delta * trackIndex;

        objFigureTopping(id).at(p).show(toppingsObj);
    }

    return container(
        objPizzaCrust(),
        toppingsObj,
    )
        .merge({ objPizza: api })
        .track(objPizza);
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
