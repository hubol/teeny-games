import { Texture } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { VectorSimple } from "../../lib/math/vector-type";
import { DataLib } from "./data-lib";

export namespace DataCondiments {
    interface Model {
        sfx: Sound;
        bodyTxs: Texture[];
        faceTxs: Texture[];
        pivot: VectorSimple;
    }

    function create(sfx: Sound, texture: Texture, pivot: VectorSimple): Model {
        const txs = texture.split({ count: 4 });
        return {
            sfx,
            bodyTxs: [txs[0], txs[2]],
            faceTxs: [txs[1], txs[3]],
            pivot,
        };
    }

    export const { manifest, getById } = DataLib.create(
        "DataCondiments",
        {
            Parmesan: create(Sfx.Samples.Shake, Tx.Condiments.Parmesan, [30, 78]),
            HotSauce: create(Sfx.Samples.BoomWhacker1, Tx.Condiments.HotSauce, [27, 130]),
            __Fallback__: create(Sfx.Ooh, Tx.Condiments.Parmesan, [30, 78]),
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;
}
