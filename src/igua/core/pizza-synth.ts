import { PropertiesLike } from "../../lib/types/properties-like";

export class PizzaSynth {
    private readonly _carrierOscNode: OscillatorNode;
    private readonly _operatorOscNode: OscillatorNode;
    private readonly _gainNode: GainNode;
    private readonly _operatorOscGainNode: GainNode;

    constructor(context: AudioContext, destination: AudioNode) {
        const fmNode = new AudioWorkletNode(context, "frequency-modulator", { numberOfInputs: 3 });
        fmNode.connect(destination);

        this._gainNode = new GainNode(context, { gain: 0 });
        this._gainNode.connect(fmNode, undefined, 0);

        this._operatorOscGainNode = new GainNode(context, { gain: 0 });
        this._operatorOscGainNode.connect(fmNode, undefined, 1);

        this._carrierOscNode = context.createOscillator();
        this._carrierOscNode.type = "sine";
        this._carrierOscNode.connect(this._gainNode);
        this._carrierOscNode.start();

        // const gainNode0 = new GainNode(context).connect(fmNode, undefined, 0);
        // const gainNode1 = new GainNode(context).connect(fmNode, undefined, 1);
        // const gainNode2 = new GainNode(context).connect(fmNode, undefined, 2);

        // const oscNode0 = context.createOscillator();
        // oscNode0.type = "sine";
        // oscNode0.frequency.setValueAtTime(200, context.currentTime);
        // oscNode0.connect(gainNode0);
        // oscNode0.start();

        this._operatorOscNode = context.createOscillator();
        this._operatorOscNode.type = "triangle";
        this._operatorOscNode.connect(this._operatorOscGainNode);
        this._operatorOscNode.start();

        const oscNode2 = context.createOscillator();
        oscNode2.frequency.setValueAtTime(220, context.currentTime);
        oscNode2.connect(fmNode, undefined, 2);
        oscNode2.start();

        // // const oscNode0 = new OscillatorNode(context, { frequency: 400, type: "sine" }).connect(destination);
        // // oscNode0
        // // new OscillatorNode(context, { frequency: 450 }).connect(fmNode);

        // fmNode.connect(destination);
    }

    private _releaseRequestsMutex = 0;
    private _targetGain = 0;

    setFrequency(hz: number) {
        prepareForRamp(this._carrierOscNode, "frequency");
        this._carrierOscNode.frequency.linearRampToValueAtTime(hz, this._carrierOscNode.context.currentTime + 0.15);

        prepareForRamp(this._operatorOscNode, "frequency");
        this._operatorOscNode.frequency.linearRampToValueAtTime(
            (Math.sqrt(hz) - 5) * 3,
            this._carrierOscNode.context.currentTime + 0.15,
        );
    }

    setTargetGain(gain: 0 | 1) {
        if (gain === this._targetGain) {
            return;
        }

        this._targetGain = gain;
        const expectedReleaseRequestsMutex = ++this._releaseRequestsMutex;
        prepareForRamp(this._gainNode, "gain");
        prepareForRamp(this._operatorOscGainNode, "gain");
        if (this._targetGain === 1) {
            this._gainNode.gain.linearRampToValueAtTime(1, this._gainNode.context.currentTime + 0.2);
            this._operatorOscGainNode.gain.linearRampToValueAtTime(1, this._gainNode.context.currentTime + 0.4);
        }
        else {
            const duration = 1.3;
            this._gainNode.gain.exponentialRampToValueAtTime(0.001, this._gainNode.context.currentTime + duration);
            this._operatorOscGainNode.gain.linearRampToValueAtTime(0, this._gainNode.context.currentTime + 1.6);
            setTimeout(
                () => {
                    if (this._releaseRequestsMutex === expectedReleaseRequestsMutex) {
                        prepareForRamp(this._gainNode, "gain");
                        this._gainNode.gain.linearRampToValueAtTime(0, this._gainNode.context.currentTime + 0.05);
                    }
                },
                duration * 1000,
            );
        }
    }
}

function prepareForRamp<T extends AudioNode>(node: T, paramKey: keyof PropertiesLike<T, AudioParam>) {
    const audioParam = node[paramKey] as AudioParam;
    audioParam.cancelScheduledValues(node.context.currentTime);
    audioParam.setValueAtTime(audioParam.value, node.context.currentTime);
}
