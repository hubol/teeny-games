import { Texture } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { RgbInt } from "../../lib/math/number-alias-types";
import { VectorSimple } from "../../lib/math/vector-type";
import { DataLib } from "./data-lib";

export namespace DataCondiments {
    interface Model {
        sfx: Sound;
        bodyTxs: Texture[];
        faceTxs: Texture[];
        pivot: VectorSimple;
        tints: Tints;
    }

    type Tints = [startTint: RgbInt, endTint: RgbInt];

    function create(sfx: Sound, texture: Texture, pivot: VectorSimple, tints: Tints): Model {
        const txs = texture.split({ count: 4 });
        return {
            sfx,
            bodyTxs: [txs[0], txs[2]],
            faceTxs: [txs[1], txs[3]],
            pivot,
            tints,
        };
    }

    export const { manifest, getById } = DataLib.create(
        "DataCondiments",
        {
            Parmesan: create(Sfx.Samples.Shake, Tx.Condiments.Parmesan, [30, 78], [0xFFEDB2, 0xFFF6D8]),
            HotSauce: create(Sfx.Samples.Cowbell, Tx.Condiments.HotSauce, [27, 130], [0xA50F04, 0xCF1406]),
            __Fallback__: create(Sfx.Ooh, Tx.Condiments.Parmesan, [30, 78], [0xff00ff, 0x00ff00]),
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;
}
