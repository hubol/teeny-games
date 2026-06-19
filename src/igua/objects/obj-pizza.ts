import { Graphics, Point, RAD_TO_DEG, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { cyclic } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { vdir } from "../../lib/math/vector";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { mxnFace } from "../mixins/mxn-face";
import { objFigureTopping } from "./figures/obj-figure-topping";
import { objSpeedControl } from "./obj-speed-control";

const consts = {
    tracksCount: 8,
    radius: {
        min: 120,
        delta: 50,
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

export function objPizza(speedControlObj: objSpeedControl.Type) {
    const api = {
        submit,
    };

    let position = 0;

    const toppingsObj = container<objAttachedTopping.Type>();

    function submit(x: number, y: number, topping: PizzaTopping) {
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

        objAttachedTopping(topping, angle, trackIndex).at(p).show(toppingsObj);
    }

    return container(
        objPizzaCrust(),
        toppingsObj,
    )
        .step(self => {
            position += speedControlObj.objSpeedControl.speed;

            let iterations = 0;
            const delta = Math.sign(position);

            while (position <= -1) {
                iterations++;
                position++;
            }

            while (position >= 1) {
                iterations++;
                position--;
            }

            for (let i = 0; i < iterations; i++) {
                self.angle = cyclic(self.angle + delta, 0, 360);
                const angle = Math.round(self.angle);
                for (const toppingObj of toppingsObj.children) {
                    toppingObj.angle = -self.angle;
                    if (toppingObj.objAttachedTopping.angle === angle) {
                        playSample(toppingObj.objFigureTopping, toppingObj.objAttachedTopping.trackIndex);
                        if (toppingObj.is(mxnFace)) {
                            toppingObj.mxnFace.sing();
                        }
                    }
                }
            }
        })
        .merge({ objPizza: api })
        .track(objPizza);
}

const trackIndexToMultiSampleKey = ["C0", "D0", "E0", "F0", "G0", "A0", "B0", "C1"] as const satisfies ReadonlyArray<
    keyof DataToppings.Sample.Multi["sfxs"]
>;

function playSample(topping: PizzaTopping, trackIndex: Integer) {
    if (topping.attributes.sample.kind === "multi") {
        const key = trackIndexToMultiSampleKey[trackIndex] ?? "C0";
        topping.attributes.sample.sfxs[key].play();
    }
    else {
        const rate = cScaleRates[trackIndex];
        topping.attributes.sample.sfx.rate(rate).play();
    }
}

function objAttachedTopping(topping: PizzaTopping, angle: Integer, trackIndex: Integer) {
    return objFigureTopping(topping)
        .merge({ objAttachedTopping: { angle, trackIndex } });
}

namespace objAttachedTopping {
    export type Type = ReturnType<typeof objAttachedTopping>;
}

function objPizzaCrust() {
    const linesScale = consts.radius.max / 440;
    return container(
        new Graphics().beginFill(0xad7121)
            .drawCircle(0, 0, consts.radius.max),
        Sprite.from(Tx.Pizza.CutLines)
            .anchored(0.5, 0.5)
            .tinted(0x725029)
            .scaled(linesScale, linesScale),
        ...range(consts.tracksCount).map(i =>
            new Graphics()
                .lineStyle(4, 0x412c0c)
                .drawCircle(0, 0, consts.radius.min + consts.radius.delta * i)
        ),
    );
}
