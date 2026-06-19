import { Container, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { mxnFace } from "../mixins/mxn-face";
import { DataLib } from "./data-lib";

const txsPepperoniFace = Tx.Faces.Pepperoni.split({ count: 2 });

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
        objFigure: () => Container;
        sample: Sample;
    }

    export const { manifest, getById } = DataLib.create(
        "DataToppings",
        {
            Pepperoni: {
                objFigure: function objFallbackTopping () {
                    return Sprite.from(Tx.Toppings.Pepperoni)
                        .mixin(mxnFace, txsPepperoniFace)
                        .anchored(0.5, 0.5);
                },
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Glock,
                },
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
            },
        } satisfies Record<string, Model>,
    );

    export function getByIdLoose(id: Id): Model & { id: Id } {
        return getById(id);
    }

    export type Id = DataLib.Id<typeof manifest>;
}
