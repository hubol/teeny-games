import { Texture } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { DataLib } from "./data-lib";

export namespace DataSpeedControlCharacters {
    export namespace RunnerTxs {
        interface Source {
            East: Texture;
            North: Texture;
            South: Texture;
        }

        export function create(source: Source) {
            return {
                East: split(source.East),
                North: split(source.North),
                South: split(source.South),
            };
        }

        export type Type = ReturnType<typeof create>;

        function split(texture: Texture) {
            return texture.split({ count: 2 });
        }
    }

    export interface Model {
        pickSfx: Sound;
        walkTxs: Texture[];
        runnerTxs: RunnerTxs.Type;
    }

    let chickenWalkTxsRequestsCount = 0;
    const chickenWalkTxs = [
        Tx.Characters.Chicken.Black,
        Tx.Characters.Chicken.Brown,
        Tx.Characters.Chicken.Gray,
    ]
        .map(tx => tx.split({ count: 3 }));

    export const { manifest, getById } = DataLib.create(
        "DataSpeedControlCharacters",
        {
            Pete: {
                pickSfx: Sfx.Dialog.Characters.Pete,
                walkTxs: Tx.Characters.Pete.Walk.split({ count: 3 }),
                runnerTxs: RunnerTxs.create(Tx.Characters.Pete.Runner),
            },
            George: {
                pickSfx: Sfx.Dialog.Characters.George,
                walkTxs: Tx.Characters.George.Walk.split({ count: 3 }),
                runnerTxs: RunnerTxs.create(Tx.Characters.George.Runner),
            },
            Chicken: {
                pickSfx: Sfx.Dialog.Characters.Chicken,
                get walkTxs() {
                    return chickenWalkTxs[chickenWalkTxsRequestsCount++ % chickenWalkTxs.length];
                },
                runnerTxs: RunnerTxs.create(Tx.Characters.Chicken.Runners.Brown),
            },
            __Fallback__: {
                pickSfx: Sfx.Dialog.Characters.George,
                walkTxs: Tx.Characters.Pete.Walk.split({ count: 3 }),
                runnerTxs: RunnerTxs.create(Tx.Characters.George.Runner),
            },
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;
}
