import { intervalWait } from "../../lib/browser/interval-wait";
import { AsshatAudioContext } from "../../lib/game-engine/audio/asshat-audiocontext";
import { AsshatJukebox } from "../../lib/game-engine/audio/asshat-jukebox";
import { Sound } from "../../lib/game-engine/audio/sound";
import { StereoDelay } from "../../lib/game-engine/audio/stereo-delay";
import { Logging } from "../../lib/logging";
import { Unit } from "../../lib/math/number-alias-types";
import { PizzaSynth } from "./pizza-synth";

class IguaAudioImpl {
    private readonly _globalGainNode: GainNode;
    private readonly _sfxGainNode: GainNode;
    private readonly _jukeboxGainNode: GainNode;

    private readonly _stereoDelay: StereoDelay;

    readonly jukebox: AsshatJukebox;

    constructor(private readonly _context: AudioContext) {
        console.log(...Logging.componentArgs(this));

        const compressorNode = new DynamicsCompressorNode(_context, { knee: 35, ratio: 6 });
        compressorNode.connect(this._context.destination);

        this._globalGainNode = new GainNode(_context);
        this._globalGainNode.connect(compressorNode);

        this._sfxGainNode = new GainNode(_context);
        this._sfxGainNode.connect(this._globalGainNode);

        this._stereoDelay = new StereoDelay(this._globalGainNode);
        this._sfxGainNode.connect(this._stereoDelay.leftInput);
        this._sfxGainNode.connect(this._stereoDelay.rightInput);

        this._jukeboxGainNode = new GainNode(_context);
        this._jukeboxGainNode.connect(this._globalGainNode);

        this._jukeboxGainNode.gain.value = 0.5;

        this.jukebox = new AsshatJukebox(this._jukeboxGainNode);
    }

    async createSfx(buffer: ArrayBuffer) {
        const audio = await this._context.decodeAudioData(buffer);
        // TODO should every sound effect be added to this node?
        // e.g. should UI sounds receive stereo delay?
        return new Sound(audio, this._sfxGainNode);
    }

    set sfxDelayFeedback(value: Unit) {
        this._stereoDelay.leftGain.value = value;
        this._stereoDelay.rightGain.value = value;
    }

    set globalGain(value: Unit) {
        this._globalGainNode.gain.value = value;
    }

    // createWorkletNode(id: "frequency-modulator") {
    //     return new AudioWorkletNode(this._context, id);
    // }

    createPizzaSynth() {
        return new PizzaSynth(this._context, this._globalGainNode);
    }
}

export let IguaAudio: IguaAudioImpl;
export let Jukebox: AsshatJukebox;

export const IguaAudioInitializer = {
    async initialize() {
        await intervalWait(() => !!AsshatAudioContext);
        await AsshatAudioContext.audioWorklet.addModule(AUDIO_WORKLET_PROCESSORS_JS_URL);
        IguaAudio = new IguaAudioImpl(AsshatAudioContext);
        Jukebox = IguaAudio.jukebox;
    },
    get initialized() {
        return !!IguaAudio;
    },
};
