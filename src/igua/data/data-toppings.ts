import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Tx } from "../../assets/textures";
import { DegreesFloat, Integer, RgbInt } from "../../lib/math/number-alias-types";
import { VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { objFace } from "../mixins/mxn-face";
import { DataInstruments } from "./data-instruments";
import { DataLib } from "./data-lib";
import { DataToppingsSfx } from "./data-toppings-sfx";

// Increase tuner fish interval
// sustained notes (e.g. bass)
// synth sounds
// intentionally feed tuner fish??

const txsPepperoni = [Tx.Toppings.Pepperoni0, Tx.Toppings.Pepperoni1, Tx.Toppings.Pepperoni2];
const txsPineapple = [Tx.Toppings.Pineapple0, Tx.Toppings.Pineapple1];
const txsTomato = Tx.Toppings.Pixel.Tomato.split({ count: 1 });
const txsMushroom = Tx.Toppings.Pixel.Mushroom.split({ count: 1 });
const txsGreenPepper = Tx.Toppings.Pixel.GreenPepper.split({ count: 1 });
const txsOnion = Tx.Toppings.Pixel.Onion.split({ count: 1 });

const txsTomatoFace = Tx.Faces.Pixel.Tomato.split({ count: 3 });
const txsMushroomFace = Tx.Faces.Pixel.Mushroom.split({ count: 2 });
const txsGreenPepperFace = Tx.Faces.Pixel.GreenPepper.split({ count: 2 });
const txsOnionFace = Tx.Faces.Pixel.Onion.split({ count: 2 });

const toppingScale = vnew(1.3, 1.3);

export namespace DataToppings {
    export interface Model {
        objFigure: (seed: Integer) => Container;
        instrumentId: DataInstruments.Id;
        sfx: DataToppingsSfx.Model;
        transformSequenceDegrees: (sequenceFloat: DegreesFloat, trackIndex: Integer) => DegreesFloat;
        tint: RgbInt;
        containerPivot: VectorSimple;
    }

    const transformSequenceDegrees: Model["transformSequenceDegrees"] = (degrees) => degrees;

    export const { manifest, getById } = DataLib.create(
        "DataToppings",
        {
            Mushroom: {
                objFigure: function objMushroomTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsMushroom,
                        80,
                        objFace(txsMushroomFace),
                    );
                },
                instrumentId: "SynthPad0",
                sfx: DataToppingsSfx.create(99),
                transformSequenceDegrees,
                tint: 0xD1BFBF,
                containerPivot: [65, 105],
            },
            GreenPepper: {
                objFigure: function objGreenPepperTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsGreenPepper,
                        80,
                        objFace(txsGreenPepperFace),
                    );
                },
                instrumentId: "Ukelele",
                sfx: DataToppingsSfx.create(625),
                transformSequenceDegrees,
                tint: 0x17A533,
                containerPivot: [55, 120],
            },
            Tomato: {
                objFigure: function objTomatoTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsTomato,
                        80,
                        objFace(txsTomatoFace),
                    );
                },
                instrumentId: "DrumKit0",
                sfx: DataToppingsSfx.create(1451),
                transformSequenceDegrees: (degrees) => Math.round(degrees / 22.5) * 22.5,
                tint: 0xF43D1D,
                containerPivot: [70, 85],
            },
            Onion: {
                objFigure: function objOnionTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsOnion,
                        80,
                        objFace(txsOnionFace),
                    );
                },
                instrumentId: "Bass",
                sfx: DataToppingsSfx.create(1490),
                transformSequenceDegrees,
                tint: 0xD193FF,
                containerPivot: [62, 97],
            },
            Kiwi: {
                objFigure: function objOnionTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsOnion,
                        80,
                        objFace(txsOnionFace),
                    );
                },
                instrumentId: "WaterBottle",
                sfx: DataToppingsSfx.create(1690),
                transformSequenceDegrees,
                // TODO should be green!
                tint: 0xB5674D,
                containerPivot: [48, 98],
            },
            MandarinOrange: {
                objFigure: function objOnionTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsOnion,
                        80,
                        objFace(txsOnionFace),
                    );
                },
                instrumentId: "Glockenspiel",
                sfx: DataToppingsSfx.create(1600),
                transformSequenceDegrees,
                tint: 0xFF5D0F,
                containerPivot: [66, 91],
            },
            Pineapple: {
                objFigure: function objOnionTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsOnion,
                        80,
                        objFace(txsOnionFace),
                    );
                },
                instrumentId: "Melodica",
                sfx: DataToppingsSfx.create(1700),
                transformSequenceDegrees,
                tint: 0xE89700,
                containerPivot: [58, 227],
            },
            Strawberry: {
                objFigure: function objOnionTopping (seed) {
                    return objToppingSprite(
                        seed,
                        txsOnion,
                        80,
                        objFace(txsOnionFace),
                    );
                },
                instrumentId: "DrumKit0",
                sfx: DataToppingsSfx.create(1700),
                transformSequenceDegrees,
                tint: 0xFF474A,
                containerPivot: [53, 103],
            },
            __Fallback__: {
                objFigure: function objFallbackTopping () {
                    return Sprite.from(Tx.Toppings.Pepperoni)
                        .anchored(0.5, 0.5)
                        .tinted(0);
                },
                instrumentId: "Melodica",
                sfx: DataToppingsSfx.create(917),
                transformSequenceDegrees: (degrees) => degrees,
                tint: 0x808080,
                containerPivot: [62, 97],
            },
        } satisfies Record<string, Model>,
    );

    export function getByIdLoose(id: Id): Model & { id: Id } {
        return getById(id);
    }

    export type Id = DataLib.Id<typeof manifest>;
}

const shadowTextureMap = (() => {
    const map = new Map<Texture, Texture>();
    map.set(txsTomato[0], Tx.Shadows.Tomato);
    return map;
})();

function objToppingSprite(seed: Integer, textures: Texture[], targetWidth: Integer, ...children: DisplayObject[]) {
    const texture = textures[seed % textures.length];
    const scale = (targetWidth / texture.width) * toppingScale.x;

    const shadowTexture = shadowTextureMap.get(texture);

    return container(
        // ...(shadowTexture ? [Sprite.from(shadowTexture)] : []),
        Sprite.from(texture),
        ...children,
    )
        .pivoted(texture.width / 2, texture.height / 2)
        .scaled(scale, scale);
}
