import { PropertiesLike } from "../../lib/types/properties-like";

export class PizzaSynth {
    private readonly _carrierOscNode: OscillatorNode;
    private readonly _gainNode: GainNode;

    constructor(context: AudioContext, destination: AudioNode) {
        this._gainNode = new GainNode(context, { gain: 0 });
        this._gainNode.connect(destination);

        this._carrierOscNode = context.createOscillator();
        this._carrierOscNode.type = "sine";
        this._carrierOscNode.connect(this._gainNode);
        this._carrierOscNode.start();

        // const fmNode = new AudioWorkletNode(context, "frequency-modulator", { numberOfInputs: 3 });
        // const gainNode0 = new GainNode(context).connect(fmNode, undefined, 0);
        // const gainNode1 = new GainNode(context).connect(fmNode, undefined, 1);
        // const gainNode2 = new GainNode(context).connect(fmNode, undefined, 2);

        // const oscNode0 = context.createOscillator();
        // oscNode0.type = "sine";
        // oscNode0.frequency.setValueAtTime(200, context.currentTime);
        // oscNode0.connect(gainNode0);
        // oscNode0.start();

        // const oscNode1 = context.createOscillator();
        // oscNode1.type = "triangle";
        // oscNode1.frequency.setValueAtTime(1, context.currentTime);
        // oscNode1.connect(gainNode1);
        // oscNode1.start();

        // const oscNode2 = context.createOscillator();
        // oscNode2.frequency.setValueAtTime(0.5, context.currentTime);
        // oscNode2.connect(gainNode2);
        // oscNode2.start();

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
    }

    setTargetGain(gain: 0 | 1) {
        if (gain === this._targetGain) {
            return;
        }

        this._targetGain = gain;
        const expectedReleaseRequestsMutex = ++this._releaseRequestsMutex;
        prepareForRamp(this._gainNode, "gain");
        if (this._targetGain === 1) {
            this._gainNode.gain.linearRampToValueAtTime(1, this._gainNode.context.currentTime + 0.2);
        }
        else {
            this._gainNode.gain.exponentialRampToValueAtTime(0.001, this._gainNode.context.currentTime + 0.9);
            setTimeout(
                () => {
                    if (this._releaseRequestsMutex === expectedReleaseRequestsMutex) {
                        prepareForRamp(this._gainNode, "gain");
                        this._gainNode.gain.linearRampToValueAtTime(0, this._gainNode.context.currentTime + 0.05);
                    }
                },
                900,
            );
        }
    }
}

function prepareForRamp<T extends AudioNode>(node: T, paramKey: keyof PropertiesLike<T, AudioParam>) {
    const audioParam = node[paramKey] as AudioParam;
    audioParam.cancelScheduledValues(node.context.currentTime);
    audioParam.setValueAtTime(audioParam.value, node.context.currentTime);
}
