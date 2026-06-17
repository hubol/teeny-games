import { Container, Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { DataLib } from "./data-lib";

export namespace DataToppings {
    export interface Model {
        objFigure: () => Container;
        sfx: Sound;
    }

    export const { manifest, getById } = DataLib.create(
        "DataToppings",
        {
            Pepperoni: {
                objFigure: function objFallbackTopping () {
                    return Sprite.from(Tx.Toppings.Pepperoni)
                        .anchored(0.5, 0.5);
                },
                sfx: Sfx.Ooh,
            },
            __Fallback__: {
                objFigure: function objFallbackTopping () {
                    return Sprite.from(Tx.Toppings.Pepperoni)
                        .anchored(0.5, 0.5)
                        .tinted(0);
                },
                sfx: Sfx.Placeholder,
            },
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;
}
