import { Graphics } from "pixi.js";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";

const consts = {
    tracksCount: 9,
    radius: {
        min: 60,
        delta: 40,
    },
};

export function objPizza() {
    return container(
        objPizzaCrust(),
    );
}

function objPizzaCrust() {
    return container(
        new Graphics().beginFill(0xad7121)
            .drawCircle(0, 0, consts.radius.min + consts.radius.delta * consts.tracksCount),
        ...range(consts.tracksCount).map(i =>
            new Graphics()
                .lineStyle(4, 0x412c0c)
                .drawCircle(0, 0, consts.radius.min + consts.radius.delta * i)
        ),
    );
}
