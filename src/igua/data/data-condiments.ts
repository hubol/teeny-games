import { Texture } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { VectorSimple } from "../../lib/math/vector-type";
import { DataLib } from "./data-lib";

export namespace DataCondiments {
    interface Model {
        sfx: Sound;
        bodyTx: Texture;
        faceTxs: Texture[];
        pivot: VectorSimple;
    }

    function create(sfx: Sound, texture: Texture, pivot: VectorSimple): Model {
        const [bodyTx, ...faceTxs] = texture.split({ count: 3 });
        return {
            sfx,
            bodyTx,
            faceTxs,
            pivot,
        };
    }

    export const { manifest, getById } = DataLib.create(
        "DataCondiments",
        {
            Parmesan: create(Sfx.Samples.Shake, Tx.Condiments.Parmesan, [30, 78]),
            __Fallback__: create(Sfx.Ooh, Tx.Condiments.Parmesan, [30, 78]),
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;
}
