import { Texture } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { DataLib } from "./data-lib";

export namespace DataSpeedControlCharacters {
    export interface Model {
        pickSfx: Sound;
        walkTxs: Texture[];
    }

    export const { manifest, getById } = DataLib.create(
        "DataSpeedControlCharacters",
        {
            Pete: {
                pickSfx: Sfx.Dialog.Characters.Pete,
                walkTxs: Tx.Characters.Pete.Walk.split({ count: 3 }),
            },
            George: {
                pickSfx: Sfx.Dialog.Characters.George,
                walkTxs: Tx.Characters.George.Walk.split({ count: 3 }),
            },
            __Fallback__: {
                pickSfx: Sfx.Dialog.Characters.George,
                walkTxs: Tx.Characters.Pete.Walk.split({ count: 3 }),
            },
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;
}
