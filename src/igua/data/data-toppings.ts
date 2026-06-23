import { Container, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { DegreesFloat, Integer } from "../../lib/math/number-alias-types";
import { container } from "../../lib/pixi/container";
import { mxnFaceSeed } from "../mixins/mxn-face-seed";
import { DataLib } from "./data-lib";

// 2-snap
// Increase tuner fish interval
// Experiment with smaller staff
// 4 slice pizza
// sustained notes (e.g. bass)
// synth sounds
// intentionally feed tuner fish??

const txsPepperoni = [Tx.Toppings.Pepperoni0, Tx.Toppings.Pepperoni1, Tx.Toppings.Pepperoni2];
const txsPineapple = [Tx.Toppings.Pineapple0, Tx.Toppings.Pineapple1];
const txsTomato = Tx.Toppings.Tomato.split({ count: 2 });
const txsOnion = Tx.Toppings.Onion.split({ count: 2 });

export namespace DataToppings {
    export type Sample = Sample.Pitched | Sample.Multi;

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
                        .mixin(mxnFaceSeed, seed, 0.36);
                },
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Glock,
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
                        .mixin(mxnFaceSeed, seed, 0.36);
                },
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Ukelele,
                },
                transformSequenceDegrees: (degrees) => degrees,
            },
            Tomato: {
                objFigure: function objTomatoTopping (seed) {
                    return container(
                        Sprite.from(txsTomato[seed % 2])
                            .scaled(80 / 256, 80 / 256)
                            .anchored(0.5, 0.5),
                    )
                        .mixin(mxnFaceSeed, seed, 0.36);
                },
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Drum,
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
                        .mixin(mxnFaceSeed, seed, 0.36);
                },
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Melodica,
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
