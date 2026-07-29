import { Graphics, Point, RAD_TO_DEG, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { factor, interp, interpv } from "../../lib/game-engine/routines/interp";
import { vdeg, vrad } from "../../lib/math/angle";
import { approachLinear, cyclic } from "../../lib/math/number";
import { Integer, Seconds } from "../../lib/math/number-alias-types";
import { PseudoRng, Rng } from "../../lib/math/rng";
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
import { PizzaSamples } from "../utils/pizza-samples";
import { objCharacterRunner } from "./characters/obj-character-runner";
import { objFigureTopping } from "./figures/obj-figure-topping";
import { objFeatureFlags } from "./obj-feature-flags";
import { objNailedString } from "./obj-nailed-string";
import { objSpeedControl } from "./obj-speed-control";
import { objTopping } from "./obj-topping";

const consts = {
    tracksCount: PizzaSamples.tracksCount,
    radius: {
        min: 170,
        delta: 90,
        get max() {
            return consts.radius.min + consts.radius.delta * consts.tracksCount;
        },
        forTrack(index: Integer) {
            return consts.radius.min + consts.radius.delta * index;
        },
    },
};

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
        get areAnyToppingsBeingDragged() {
            return areAnyToppingsBeingDragged();
        },
        get areAnyToppingsAttached() {
            return areAnyToppingsAttached();
        },
        get attachedToppingsCount() {
            return toppingsObj.children.length;
        },
        playedSequencedSamplesCount: 0,
        getSequencedPosition,
        submit,
        getToppingCount(id: DataToppings.Id) {
            let count = 0;
            for (let i = 0; i < toppingsObj.children.length; i++) {
                if (toppingsObj.children[i].objFigureTopping.data.id === id) {
                    count++;
                }
            }

            return count;
        },
        sauceCheeseUnit: 0,
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
        const degrees = topping.data.transformSequenceDegrees(rawDegrees, sequenceDataBuffer.trackIndex);
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
                obj.objFigureTopping.data === topping.data
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

    const characterRunnerObj = objCharacterRunner().scaled(2, 2);

    const crustObj = objPizzaCrust();
    const nailedStringObj = objNailedString(consts.radius.max + 45, characterRunnerObj);

    let lastStepTime = Null<number>();
    let dispatchSequence16 = false;

    return container(
        Sprite.from(Tx.Pizza.Mask)
            .at(0, 90)
            .anchored(0.5, 0.5)
            .tinted(0xC7A0FF)
            .scaled(1.8, 1.8)
            .zIndexed(-99999),
        container(
            crustObj,
            toppingsObj,
        )
            .step(self => {
                dispatchSequence16 = false;
                toppingObjs.length = 0;
                toppingObjs.push(...toppingsObj.children);

                for (let i = toppingObjs.length - 1; i >= 0; i--) {
                    const toppingObj = toppingObjs[i];
                    const pointer = PizzaPointer.claim(toppingObj);
                    if (pointer) {
                        objTopping(toppingObj.objFigureTopping, pointer, "player")
                            .at(self.getWorldPosition())
                            .show();
                        toppingObj.destroy();
                    }
                }

                if (speedControlObj.objSpeedControl.speed === 0 || nailedStringObj.objNailedString.visibleUnit < 1) {
                    return;
                }

                const timeFactor = lastStepTime === null
                    ? 1
                    : Math.min(15, (performance.now() - lastStepTime) / (1000 / 60));

                const delta = -speedControlObj.objSpeedControl.speed * timeFactor;
                const absDelta = Math.abs(delta);

                const rotatingObj: { angle: number } = objFeatureFlags.singleton.isEnabled("PizzaSpin")
                    ? self
                    : nailedStringObj.objNailedString;

                const nonRotatingObj = rotatingObj === self ? nailedStringObj.objNailedString : self;

                nonRotatingObj.angle = 0;
                rotatingObj.angle += delta;
                const angle = rotatingObj.angle;

                for (const toppingObj of toppingsObj.children) {
                    toppingObj.angle = -self.angle;
                    const sequenceDelta = cyclic(toppingObj.objAttachedTopping.sequenceIndex - angle, 0, 360);
                    if (sequenceDelta <= absDelta) {
                        playSample(toppingObj, (sequenceDelta / absDelta) * (1 / 60));
                        const strumPosition = consts.radius.forTrack(toppingObj.objAttachedTopping.trackIndex);
                        nailedStringObj.objNailedString.strum(strumPosition);
                        api.playedSequencedSamplesCount++;
                    }
                }

                for (const sequenceDegrees16 of DataToppings.sequenceDegrees16) {
                    const sequenceDelta = cyclic(sequenceDegrees16 - angle, 0, 360);
                    if (sequenceDelta <= absDelta) {
                        dispatchSequence16 = true;
                        break;
                    }
                }
            }),
        nailedStringObj,
        characterRunnerObj,
    )
        .autoSorted()
        .step(() => {
            lastStepTime = performance.now();
            crustObj.objPizzaCrust.showTracks = areAnyToppingsAttached() || areAnyToppingsBeingDragged();
        })
        .coro(function* () {
            while (true) {
                yield areAnyToppingsAttached;
                yield interp(nailedStringObj.objNailedString, "visibleUnit")
                    .factor(factor.sine)
                    .to(1)
                    .over(900);
                yield () => !areAnyToppingsAttached() && !areAnyToppingsBeingDragged();
                yield interp(nailedStringObj.objNailedString, "visibleUnit")
                    .factor(factor.sine)
                    .to(0)
                    .over(700);
            }
        })
        .dispatches<"objPizza:sequence16">()
        .step(self => {
            if (dispatchSequence16) {
                self.dispatch("objPizza:sequence16");
            }
        })
        .step(() => {
            crustObj.objPizzaCrust.pizzaSauceCheeseObj.objPizzaSauceCheese.visibleUnit = api.sauceCheeseUnit;
        })
        .merge({ objPizza: api })
        .track(objPizza);

    function areAnyToppingsBeingDragged(): boolean {
        return Instances(objTopping).length > 0;
    }

    function areAnyToppingsAttached() {
        return toppingsObj.children.length > 0;
    }
}

function playSample(obj: objAttachedTopping.Type, when: Seconds) {
    const faceObj = Undefined(obj.findIs(objFace)[0]);

    if (faceObj?.objFace?.isSinging) {
        return;
    }

    const topping = obj.objFigureTopping;
    const sample = DataInstruments.getByIdLoose(topping.data.instrumentId).sample;
    const trackIndex = obj.objAttachedTopping.trackIndex;

    PizzaSamples.play(sample, trackIndex, when, topping.data);

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
    0x4b70e7,
    0x5de094,
    0xf5e76c,
    0xf07da9,
];

function objPizzaCrust() {
    const pizzaObjScale = consts.radius.max / Tx.Pizza.Dough.width * 2;

    function objDough() {
        return Sprite.from(Tx.Pizza.Dough)
            .anchored(0.5, 0.5)
            .scaled(pizzaObjScale, pizzaObjScale);
    }

    const doughMaskObj = objDough();
    const pizzaSauceCheeseObj = objPizzaSauceCheese();

    const api = {
        showTracks: false,
        pizzaSauceCheeseObj,
    };

    return container(
        new Graphics().beginFill(0xF7D0BE)
            .drawCircle(0, 0, consts.radius.max),
        objDough(),
        pizzaSauceCheeseObj,
        ...range(consts.tracksCount).map(i =>
            new Graphics()
                .lineStyle(40, trackTints[i])
                .drawCircle(0, 0, consts.radius.forTrack(i))
                .scaled(0, 0)
                .coro(function* (self) {
                    self.alpha = 0.9;
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

function objPizzaSauceCheese() {
    const p = new PseudoRng(240);

    let visibleUnit = 0;

    const api = {
        get visibleUnit() {
            return visibleUnit;
        },
        set visibleUnit(value) {
            if (value === visibleUnit) {
                return;
            }

            visibleUnit = value;

            const threshold = (obj.children.length - 2) * value;
            for (let i = 0; i < obj.children.length; i++) {
                const child = obj.children[i];
                const previousVisible = child.visible;
                child.visible = i < threshold;
                if (!previousVisible && child.visible) {
                    child.pivot.y = Rng.float(10, 40);
                }
            }
        },
    };

    const obj = container(
        ...range(200).map(() =>
            container(
                Sprite.from(Tx.Pizza.Sauce)
                    .anchored(0.5, 0.5)
                    .angled(Rng.int(4) * 90)
                    .scaled(2, 2),
            )
                .at(p.vunit(), Rng.float(30, 450))
                .invisible()
        ),
        ...range(200).map(() =>
            container(
                Sprite.from(Tx.Pizza.Cheese)
                    .anchored(0.5, 0.5)
                    .angled(Rng.int(4) * 90)
                    .scaled(2, 2),
            )
                .at(p.vunit(), Rng.float(30, 450))
                .invisible()
        ),
    )
        .step(self => {
            for (const child of self.children) {
                if (child.visible && child.pivot.y !== 0) {
                    child.pivot.y = approachLinear(child.pivot.y * 0.9, 0, 2 + Rng.float(3));
                }
            }
        });

    return obj
        .merge({ objPizzaSauceCheese: api });
}
