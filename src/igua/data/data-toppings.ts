import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Tx } from "../../assets/textures";
import { DegreesFloat, Integer } from "../../lib/math/number-alias-types";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { objFace } from "../mixins/mxn-face";
import { DataInstruments } from "./data-instruments";
import { DataLib } from "./data-lib";

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
        transformSequenceDegrees: (sequenceFloat: DegreesFloat, trackIndex: Integer) => DegreesFloat;
    }

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
                transformSequenceDegrees: (degrees) => degrees,
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
                transformSequenceDegrees: (degrees) => degrees,
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
                transformSequenceDegrees: (degrees) => Math.round(degrees / 22.5) * 22.5,
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
                transformSequenceDegrees: (degrees) => degrees,
            },
            __Fallback__: {
                objFigure: function objFallbackTopping () {
                    return Sprite.from(Tx.Toppings.Pepperoni)
                        .anchored(0.5, 0.5)
                        .tinted(0);
                },
                instrumentId: "Melodica",
                transformSequenceDegrees: (degrees) => degrees,
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
