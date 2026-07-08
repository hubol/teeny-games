import { Graphics, Point, RAD_TO_DEG, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Sound, SoundInstance } from "../../lib/game-engine/audio/sound";
import { Instances } from "../../lib/game-engine/instances";
import { factor, interpv } from "../../lib/game-engine/routines/interp";
import { vdeg, vrad } from "../../lib/math/angle";
import { cyclic } from "../../lib/math/number";
import { Integer, Seconds } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vdir, vlerp } from "../../lib/math/vector";
import { VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { Null } from "../../lib/types/null";
import { Undefined } from "../../lib/types/undefined";
import { DataInstruments } from "../data/data-instruments";
import { DataToppings } from "../data/data-toppings";
import { PizzaTopping } from "../data/pizza-topping";
import { objFace } from "../mixins/mxn-face";
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
    sequenceIndex: number;
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
        sequenceDataBuffer.sequenceIndex = cyclic(degrees, 0, 360);

        const scale = consts.radius.min + consts.radius.delta * sequenceDataBuffer.trackIndex;
        vdeg(270 - sequenceDataBuffer.sequenceIndex, p).scale(scale);

        return sequenceDataBuffer;
    }

    function submit(x: number, y: number, topping: PizzaTopping) {
        const data = toSequenceData(x, y, topping);

        if (!data) {
            return false;
        }

        if (
            toppingsObj.children.some(obj =>
                obj.objFigureTopping.attributes === topping.attributes
                && Math.abs(obj.objAttachedTopping.sequenceIndex - data.sequenceIndex) < 2
                && obj.objAttachedTopping.trackIndex === data.trackIndex
            )
        ) {
            return false;
        }

        const toppingObj = objAttachedTopping(topping, data.sequenceIndex, data.trackIndex)
            .at(data.point)
            .show(toppingsObj);

        toppingObj.angle = -toppingsObj.parent.angle;

        if (speedControlObj.objSpeedControl.speed === 0) {
            playSample(toppingObj, 0);
        }

        return true;
    }

    const toppingObjs = new Array<objAttachedTopping.Type>();

    return container(
        Sprite.from(Tx.Pizza.Mask)
            .at(0, 90)
            .anchored(0.5, 0.5)
            .tinted(0xC7A0FF)
            .scaled(1.8, 1.8),
        container(
            objPizzaCrust()
                .step(self =>
                    self.objPizzaCrust.showTracks = toppingsObj.children.length > 0 || Instances(objTopping).length > 0
                ),
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

                if (speedControlObj.objSpeedControl.speed === 0) {
                    return;
                }

                const delta = speedControlObj.objSpeedControl.speed;
                const absDelta = Math.abs(delta);
                self.angle += delta;
                const angle = self.angle;

                for (const toppingObj of toppingsObj.children) {
                    toppingObj.angle = -self.angle;
                    const sequenceDelta = cyclic(toppingObj.objAttachedTopping.sequenceIndex - angle, 0, 360);
                    if (sequenceDelta <= absDelta) {
                        playSample(toppingObj, (sequenceDelta / absDelta) * (1 / 60));
                    }
                }
            }),
    )
        .merge({ objPizza: api })
        .track(objPizza);
}

const cScaleIndexToMultiSampleKey = ["C0", "D0", "E0", "F0", "G0", "A0", "B0", "C1"] as const satisfies ReadonlyArray<
    keyof DataInstruments.Sample.Multi["sfxs"]
>;

const previousSoundInstances = new Map<DataToppings.Model, Array<SoundInstance>>();

function playSample(obj: objAttachedTopping.Type, when: Seconds) {
    const faceObj = Undefined(obj.findIs(objFace)[0]);

    if (faceObj?.objFace?.isSinging) {
        return;
    }

    const topping = obj.objFigureTopping;
    const sample = DataInstruments.getByIdLoose(topping.attributes.instrumentId).sample;
    const trackIndex = obj.objAttachedTopping.trackIndex;
    const cScaleIndex = trackScaleIndices[trackIndex] ?? trackScaleIndices[0];

    let sound = Null<Sound>();

    if (sample.kind === "multi") {
        const key = cScaleIndexToMultiSampleKey[cScaleIndex] ?? "C0";
        sound = sample.sfxs[key];
    }
    else {
        const rate = cScaleRates[cScaleIndex];
        sound = sample.sfx.rate(rate);
    }

    if (sound) {
        const instance = sound.gain(sample.gain).playInstance(when);
        if (!sample.polyphony) {
            if (!previousSoundInstances.has(topping.attributes)) {
                previousSoundInstances.set(topping.attributes, []);
            }
            const previousInstances = previousSoundInstances.get(topping.attributes)!;
            for (const previousInstance of previousInstances) {
                if (!previousInstance.ended) {
                    previousInstance.linearRamp("gain", 0, 0.1);
                }
            }
            previousInstances.length = 0;
            previousInstances.push(instance);
        }
    }

    faceObj?.objFace?.sing();
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

    const api = {
        showTracks: false,
    };

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
                .scaled(0, 0)
                .coro(function* (self) {
                    while (true) {
                        yield () => api.showTracks;
                        yield interpv(self.scale).factor(factor.sine).to(1, 1).over(300);
                        yield () => !api.showTracks;
                        yield interpv(self.scale).factor(factor.sine).to(0, 0).over(300);
                    }
                })
        ),
        objCutLines()
            .tinted(0xEAB29A)
            .scaled(consts.radius.max, consts.radius.max),
        doughMaskObj,
        Sprite.from(Tx.Pizza.Shading)
            .anchored(0.5, 0.5)
            .step(self => self.angle = -self.parent.parent.angle, 1)
            .masked(doughMaskObj),
    )
        .merge({ objPizzaCrust: api });
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
