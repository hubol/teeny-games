import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { DegreesFloat, Integer, Unit } from "../../lib/math/number-alias-types";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { objFace } from "../mixins/mxn-face";
import { mxnFaceSeed } from "../mixins/mxn-face-seed";
import { DataLib } from "./data-lib";

// Increase tuner fish interval
// sustained notes (e.g. bass)
// synth sounds
// intentionally feed tuner fish??

const txsPepperoni = [Tx.Toppings.Pepperoni0, Tx.Toppings.Pepperoni1, Tx.Toppings.Pepperoni2];
const txsPineapple = [Tx.Toppings.Pineapple0, Tx.Toppings.Pineapple1];
const txsTomato = Tx.Toppings.Pixel.Tomato.split({ count: 1 });
const txsOnion = Tx.Toppings.Onion.split({ count: 2 });

const txsTomatoFace = Tx.Faces.Pixel.Tomato.split({ count: 3 });

const toppingScale = vnew(1.3, 1.3);

export namespace DataToppings {
    export type Sample = (Sample.Pitched | Sample.Multi) & Sample.Common;

    export namespace Sample {
        export interface Pitched {
            kind: "pitched";
            sfx: Sound;
        }

        export interface Multi {
            kind: "multi";
            sfxs: {
                A0: Sound;
                B0: Sound;
                C0: Sound;
                D0: Sound;
                E0: Sound;
                F0: Sound;
                G0: Sound;
                C1: Sound;
            };
        }

        export interface Common {
            gain: Unit;
            polyphony: boolean;
        }
    }

    export interface Model {
        objFigure: (seed: Integer) => Container;
        sample: Sample;
        transformSequenceDegrees: (sequenceFloat: DegreesFloat, trackIndex: Integer) => DegreesFloat;
    }

    export const { manifest, getById } = DataLib.create(
        "DataToppings",
        {
            Pepperoni: {
                objFigure: function objPepperoniTopping (seed) {
                    return container(
                        Sprite.from(txsPepperoni[seed % 3])
                            .scaled(80 / 256, 80 / 256)
                            .anchored(0.5, 0.5),
                    )
                        .mixin(mxnFaceSeed, seed, 0.36)
                        .scaled(toppingScale);
                },
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.SynthTunedPercussion0,
                    gain: 0.6,
                    polyphony: true,
                },
                transformSequenceDegrees: (degrees) => degrees,
            },
            Pineapple: {
                objFigure: function objPineappleTopping (seed) {
                    return container(
                        Sprite.from(txsPineapple[seed % 2])
                            .scaled(80 / 256, 80 / 256)
                            .anchored(0.5, 0.5),
                    )
                        .mixin(mxnFaceSeed, seed, 0.36)
                        .scaled(toppingScale);
                },
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Ukelele,
                    gain: 1,
                    polyphony: true,
                },
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
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Drum,
                    gain: 1,
                    polyphony: true,
                },
                transformSequenceDegrees: (degrees) => Math.round(degrees / 22.5) * 22.5,
            },
            Onion: {
                objFigure: function objOnionTopping (seed) {
                    return container(
                        Sprite.from(txsOnion[seed % 2])
                            .scaled(80 / 256, 80 / 256)
                            .anchored(0.5, 0.5),
                    )
                        .mixin(mxnFaceSeed, seed, 0.36)
                        .scaled(toppingScale);
                },
                sample: {
                    kind: "pitched",
                    sfx: Sfx.Samples.Bass,
                    gain: 1,
                    polyphony: false,
                },
                transformSequenceDegrees: (degrees) => degrees,
            },
            __Fallback__: {
                objFigure: function objFallbackTopping () {
                    return Sprite.from(Tx.Toppings.Pepperoni)
                        .anchored(0.5, 0.5)
                        .tinted(0);
                },
                sample: {
                    kind: "pitched",
                    sfx: Sfx.Ooh,
                    gain: 1,
                    polyphony: true,
                },
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
        ...(shadowTexture ? [Sprite.from(shadowTexture)] : []),
        Sprite.from(texture),
        ...children,
    )
        .pivoted(texture.width / 2, texture.height / 2)
        .scaled(scale, scale);
}
