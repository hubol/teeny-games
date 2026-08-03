import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Tx } from "../../assets/textures";
import { cyclic } from "../../lib/math/number";
import { DegreesFloat, Integer, RgbInt } from "../../lib/math/number-alias-types";
import { VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { PropertiesLike } from "../../lib/types/properties-like";
import { objFace } from "../mixins/mxn-face";
import { DataInstruments } from "./data-instruments";
import { DataLib } from "./data-lib";
import { DataToppingsSfx } from "./data-toppings-sfx";

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
    const transformSequenceDegrees16: Model["transformSequenceDegrees"] = (degrees) =>
        Math.round(degrees / 22.5) * 22.5;

    export const sequenceDegrees16 = [
        ...new Set(range(360).map(degrees => cyclic(transformSequenceDegrees16(degrees, 0), 0, 360))),
    ];

    export const { manifest, getById } = DataLib.create(
        "DataToppings",
        {
            Mushroom: {
                objFigure: createStandardFigureObjFactory("Mushroom"),
                instrumentId: "SynthPad0",
                sfx: DataToppingsSfx.create(99),
                transformSequenceDegrees,
                tint: 0xD1BFBF,
                containerPivot: [65, 105],
            },
            GreenPepper: {
                objFigure: createStandardFigureObjFactory("GreenPepper"),
                instrumentId: "Ukelele",
                sfx: DataToppingsSfx.create(625),
                transformSequenceDegrees,
                tint: 0x17A533,
                containerPivot: [55, 120],
            },
            Tomato: {
                objFigure: createStandardFigureObjFactory("Tomato"),
                instrumentId: "DrumKit0",
                sfx: DataToppingsSfx.create(1451),
                transformSequenceDegrees: transformSequenceDegrees16,
                tint: 0xF43D1D,
                containerPivot: [70, 85],
            },
            Onion: {
                objFigure: createStandardFigureObjFactory("Onion"),
                instrumentId: "Bass",
                sfx: DataToppingsSfx.create(1490),
                transformSequenceDegrees,
                tint: 0xD193FF,
                containerPivot: [62, 97],
            },
            Kiwi: {
                objFigure: createStandardFigureObjFactory("Kiwi"),
                instrumentId: "WaterBottle",
                sfx: DataToppingsSfx.create(1690),
                transformSequenceDegrees,
                // TODO should be green!
                tint: 0xB5674D,
                containerPivot: [48, 98],
            },
            MandarinOrange: {
                objFigure: createStandardFigureObjFactory("MandarinOrange"),
                instrumentId: "Glockenspiel",
                sfx: DataToppingsSfx.create(1600),
                transformSequenceDegrees,
                tint: 0xFF5D0F,
                containerPivot: [66, 91],
            },
            Pineapple: {
                objFigure: createStandardFigureObjFactory("Pineapple"),
                instrumentId: "Melodica",
                sfx: DataToppingsSfx.create(1700),
                transformSequenceDegrees,
                tint: 0xE89700,
                containerPivot: [58, 227],
            },
            Strawberry: {
                objFigure: createStandardFigureObjFactory("Strawberry"),
                instrumentId: "Moog",
                sfx: DataToppingsSfx.create(1800),
                transformSequenceDegrees,
                tint: 0xFF474A,
                containerPivot: [53, 103],
            },
            BlackOlive: {
                objFigure: createStandardFigureObjFactory("BlackOlive"),
                instrumentId: "Ukelele",
                sfx: DataToppingsSfx.create(1900),
                transformSequenceDegrees,
                tint: 0x6B4E8E,
                containerPivot: [0, 0],
            },
            Spinach: {
                objFigure: createStandardFigureObjFactory("Spinach"),
                instrumentId: "Ukelele",
                sfx: DataToppingsSfx.create(2000),
                transformSequenceDegrees,
                tint: 0x177133,
                containerPivot: [0, 0],
            },
            BananaPepper: {
                objFigure: createStandardFigureObjFactory("BananaPepper"),
                instrumentId: "Ukelele",
                sfx: DataToppingsSfx.create(2100),
                transformSequenceDegrees,
                tint: 0xFFDD00,
                containerPivot: [0, 0],
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

    export namespace Model {
        export type Loose = Model & { id: Id };
    }

    export function getByIdLoose(id: Id): Model.Loose {
        return getById(id);
    }

    export type Id = DataLib.Id<typeof manifest>;
}

type TextureKeys<T> = PropertiesLike<T, Texture>;

type StandardFigureKey =
    & keyof TextureKeys<typeof Tx["Toppings"]["Pixel"]>
    & keyof TextureKeys<typeof Tx["Faces"]["Pixel"]>;

function createStandardFigureObjFactory(key: StandardFigureKey) {
    const txs = [Tx.Toppings.Pixel[key]];
    const faceTxs = Tx.Faces.Pixel[key].split({ count: 2 });

    return function () {
        return objToppingSprite(
            0,
            txs,
            objFace(faceTxs),
        );
    };
}

function objToppingSprite(seed: Integer, textures: Texture[], ...children: DisplayObject[]) {
    const texture = textures[seed % textures.length];

    return container(
        Sprite.from(texture),
        ...children,
    )
        .pivoted(texture.width / 2, texture.height / 2)
        .scaled(2.2, 2.2);
}
