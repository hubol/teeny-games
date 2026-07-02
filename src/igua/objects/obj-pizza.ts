import { BLEND_MODES, Graphics, Point, RAD_TO_DEG, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Sound, SoundInstance } from "../../lib/game-engine/audio/sound";
import { vdeg, vrad } from "../../lib/math/angle";
import { cyclic } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vdir, vlerp } from "../../lib/math/vector";
import { VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { Null } from "../../lib/types/null";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { mxnFace, objFace } from "../mixins/mxn-face";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objFigureTopping } from "./figures/obj-figure-topping";
import { objSpeedControl } from "./obj-speed-control";
import { objTopping } from "./obj-topping";

const trackScaleIndices = [
    0,
    2,
    4,
    7,
];

const consts = {
    tracksCount: trackScaleIndices.length,
    radius: {
        min: 170,
        delta: 90,
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

interface SequenceData {
    sequenceIndex: Integer;
    trackIndex: Integer;
    point: Point;
}

const sequenceDataBuffer: SequenceData = {
    sequenceIndex: 0,
    trackIndex: 0,
    point: new Point(),
};

const v = vnew();

export function objPizza(speedControlObj: objSpeedControl.Type) {
    const api = {
        getSequencedPosition,
        submit,
    };

    let position = 0;

    const toppingsObj = container<objAttachedTopping.Type>();

    function getSequencedPosition(x: number, y: number, topping: PizzaTopping): VectorSimple | null {
        const data = toSequenceData(x, y, topping);

        if (!data) {
            return null;
        }

        toppingsObj.parent.worldTransform.apply(data.point, data.point);
        return v.at(data.point);
    }

    function toSequenceData(x: number, y: number, topping: PizzaTopping): SequenceData | null {
        const p = sequenceDataBuffer.point;
        p.set(x, y);
        toppingsObj.worldTransform.applyInverse(p, p);
        if (p.vlength > consts.radius.max || p.vlength < consts.radius.min - consts.radius.delta) {
            return null;
        }

        sequenceDataBuffer.trackIndex = Math.min(
            consts.tracksCount - 1,
            Math.round(Math.max(0, p.vlength - consts.radius.min) / consts.radius.delta),
        );

        const rawDegrees = (Math.PI / 2 - vdir(p)) * -RAD_TO_DEG;
        const degrees = topping.attributes.transformSequenceDegrees(rawDegrees, sequenceDataBuffer.trackIndex);
        sequenceDataBuffer.sequenceIndex = Math.floor(cyclic(degrees, 0, 360));

        const scale = consts.radius.min + consts.radius.delta * sequenceDataBuffer.trackIndex;
        vdeg(270 - sequenceDataBuffer.sequenceIndex, p).scale(scale);

        return sequenceDataBuffer;
    }

    function submit(x: number, y: number, topping: PizzaTopping) {
        const data = toSequenceData(x, y, topping);

        if (!data) {
            return;
        }

        if (
            toppingsObj.children.some(obj =>
                obj.objFigureTopping.attributes === topping.attributes
                && obj.objAttachedTopping.sequenceIndex === data.sequenceIndex
                && obj.objAttachedTopping.trackIndex === data.trackIndex
            )
        ) {
            return;
        }

        const toppingObj = objAttachedTopping(topping, data.sequenceIndex, data.trackIndex)
            .at(data.point)
            .show(toppingsObj);

        toppingObj.angle = -toppingsObj.parent.angle;

        if (speedControlObj.objSpeedControl.speed === 0) {
            playSample(toppingObj);
        }
    }

    const toppingObjs = new Array<objAttachedTopping.Type>();

    return container(
        Sprite.from(Tx.Pizza.Mask)
            .at(0, 90)
            .anchored(0.5, 0.5)
            .tinted(0xC7A0FF)
            .scaled(1.8, 1.8),
        container(
            objPizzaCrust(),
            toppingsObj,
        )
            .step(self => {
                toppingObjs.length = 0;
                toppingObjs.push(...toppingsObj.children);

                for (let i = toppingObjs.length - 1; i >= 0; i--) {
                    const toppingObj = toppingObjs[i];
                    const pointer = PizzaPointer.claim(toppingObj);
                    if (pointer) {
                        objTopping(toppingObj.objFigureTopping, pointer)
                            .at(self.getWorldPosition())
                            .show();
                        toppingObj.destroy();
                    }
                }

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
                        if (toppingObj.objAttachedTopping.sequenceIndex === angle) {
                            playSample(toppingObj);
                        }
                    }
                }
            }),
    )
        .merge({ objPizza: api })
        .track(objPizza);
}

const cScaleIndexToMultiSampleKey = ["C0", "D0", "E0", "F0", "G0", "A0", "B0", "C1"] as const satisfies ReadonlyArray<
    keyof DataToppings.Sample.Multi["sfxs"]
>;

const previousSoundInstances = new Map<DataToppings.Model, Array<SoundInstance>>();

function playSample(obj: objAttachedTopping.Type) {
    const topping = obj.objFigureTopping;
    const trackIndex = obj.objAttachedTopping.trackIndex;
    const cScaleIndex = trackScaleIndices[trackIndex] ?? trackScaleIndices[0];

    let sound = Null<Sound>();

    if (topping.attributes.sample.kind === "multi") {
        const key = cScaleIndexToMultiSampleKey[cScaleIndex] ?? "C0";
        sound = topping.attributes.sample.sfxs[key];
    }
    else {
        const rate = cScaleRates[cScaleIndex];
        sound = topping.attributes.sample.sfx.rate(rate);
    }

    if (sound) {
        const instance = sound.gain(topping.attributes.sample.gain).playInstance();
        if (!topping.attributes.sample.polyphony) {
            if (!previousSoundInstances.has(topping.attributes)) {
                previousSoundInstances.set(topping.attributes, []);
            }
            const previousInstances = previousSoundInstances.get(topping.attributes)!;
            for (const previousInstance of previousInstances) {
                previousInstance.linearRamp("gain", 0, 0.1);
            }
            previousInstances.length = 0;
            previousInstances.push(instance);
        }
    }

    obj.findIs(objFace)[0]?.objFace?.sing();
}

export function objAttachedTopping(topping: PizzaTopping, sequenceIndex: Integer, trackIndex: Integer) {
    return objFigureTopping(topping)
        .merge({ objAttachedTopping: { sequenceIndex, trackIndex } })
        .track(objAttachedTopping);
}

namespace objAttachedTopping {
    export type Type = ReturnType<typeof objAttachedTopping>;
}

const trackTints = [
    0x2552e6,
    0x25e675,
    0xe6d325,
    0xe23678,
];

function objPizzaCrust() {
    const pizzaObjScale = consts.radius.max / Tx.Pizza.Dough.width * 2;

    function objDough() {
        return Sprite.from(Tx.Pizza.Dough)
            .anchored(0.5, 0.5)
            .scaled(pizzaObjScale, pizzaObjScale);
    }

    const doughMaskObj = objDough();

    return container(
        new Graphics().beginFill(0xF7D0BE)
            .drawCircle(0, 0, consts.radius.max),
        objDough(),
        ...range(consts.tracksCount).map(i =>
            new Graphics()
                .lineStyle(40, trackTints[i])
                .drawCircle(0, 0, consts.radius.min + consts.radius.delta * i)
                .step(self => self.alpha = 0.6)
        ),
        objCutLines()
            .tinted(0xEAB29A)
            .scaled(consts.radius.max, consts.radius.max),
        doughMaskObj,
        Sprite.from(Tx.Pizza.Shading)
            .anchored(0.5, 0.5)
            .step(self => self.angle = -self.parent.parent.angle)
            .masked(doughMaskObj),
    );
}

function objCutLines() {
    const gfx = new Graphics()
        .lineStyle(0.01, 0xffffff);

    const count = 2;
    for (let i = 0; i < count; i++) {
        const radians = Math.PI * (i / count);
        const start = vrad(radians);
        const end = start.vcpy().scale(-1);

        gfx
            .moveTo(start.x, start.y);

        for (let f = 0; f <= 1.01; f += 0.02) {
            const position = vlerp(start.vcpy(), end, f);
            position.add(Rng.vunit(), 0.003);
            gfx.lineTo(position.x, position.y);
        }
    }

    return gfx;
}
