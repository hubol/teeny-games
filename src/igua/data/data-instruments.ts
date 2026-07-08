import { Sfx } from "../../assets/sounds";
import { Sound } from "../../lib/game-engine/audio/sound";
import { Unit } from "../../lib/math/number-alias-types";
import { DataLib } from "./data-lib";

export namespace DataInstruments {
    export interface Model {
        sample: Sample;
    }

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

    export const { getById, manifest } = DataLib.create(
        "DataInstruments",
        {
            DrumKit0: {
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Drum,
                    gain: 1,
                    polyphony: true,
                },
            },
            Bass: {
                sample: {
                    kind: "pitched",
                    sfx: Sfx.Samples.Bass,
                    gain: 1,
                    polyphony: false,
                },
            },
            Glockenspiel: {
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Glock,
                    gain: 1,
                    polyphony: true,
                },
            },
            Melodica: {
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Melodica,
                    gain: 1,
                    polyphony: true,
                },
            },
            SynthPad0: {
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.SynthPad0,
                    gain: 0.6,
                    polyphony: true,
                },
            },
            Ukelele: {
                sample: {
                    kind: "multi",
                    sfxs: Sfx.Samples.Ukelele,
                    gain: 1,
                    polyphony: true,
                },
            },
            __Fallback__: {
                sample: {
                    kind: "pitched",
                    sfx: Sfx.Ooh,
                    gain: 1,
                    polyphony: true,
                },
            },
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;

    export function getByIdLoose(id: Id): Model & { id: Id } {
        return getById(id);
    }
}
