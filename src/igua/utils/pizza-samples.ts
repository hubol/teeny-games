import { Sound, SoundInstance } from "../../lib/game-engine/audio/sound";
import { Integer, Seconds } from "../../lib/math/number-alias-types";
import { Null } from "../../lib/types/null";
import { DataInstruments } from "../data/data-instruments";

const cScaleIndexToMultiSampleKey = ["C0", "D0", "E0", "F0", "G0", "A0", "B0", "C1"] as const satisfies ReadonlyArray<
    keyof DataInstruments.Sample.Multi["sfxs"]
>;

const previousSoundInstances = new Map<object, Array<SoundInstance>>();

const trackScaleIndices = [
    0,
    2,
    4,
    7,
];

const c4Hz = 261.63;
const cScaleRates = [
    c4Hz,
    293.66,
    329.63,
    349.23,
    392.00,
    440.00,
    493.88,
    c4Hz * 2,
]
    .map(hz => hz / c4Hz);

export namespace PizzaSamples {
    export const tracksCount = trackScaleIndices.length;

    export function play(sample: DataInstruments.Sample, trackIndex: Integer, when: Seconds, monophonyLock: object) {
        const cScaleIndex = trackScaleIndices[trackIndex] ?? trackScaleIndices[0];

        let sound = Null<Sound>();

        if (sample.kind === "multi") {
            const key = cScaleIndexToMultiSampleKey[cScaleIndex] ?? "C0";
            sound = sample.sfxs[key];
        }
        else {
            const rate = cScaleRates[cScaleIndex];
            sound = sample.sfx.rate(rate);
        }

        if (sound) {
            const instance = sound.gain(sample.gain).playInstance(when);
            if (!sample.polyphony) {
                if (!previousSoundInstances.has(monophonyLock)) {
                    previousSoundInstances.set(monophonyLock, []);
                }
                const previousInstances = previousSoundInstances.get(monophonyLock)!;
                for (const previousInstance of previousInstances) {
                    if (!previousInstance.ended) {
                        previousInstance.linearRamp("gain", 0, 0.1);
                    }
                }
                previousInstances.length = 0;
                previousInstances.push(instance);
            }
        }
    }

    export function getNearestCScaleRate(rate: number) {
        let minDistance = Number.MAX_SAFE_INTEGER;
        let result = rate;

        for (let i = 2; i >= 1; i--) {
            for (const cScaleRate of cScaleRates) {
                const testRate = cScaleRate / i;
                const distance = Math.abs(rate - testRate);
                if (distance < minDistance) {
                    minDistance = distance;
                    result = testRate;
                }
            }
        }

        return result;
    }
}
