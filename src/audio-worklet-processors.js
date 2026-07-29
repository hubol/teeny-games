class FrequencyModulator extends AudioWorkletProcessor {
    /**
     * 
     * @param {Float32Array[][]} inputs 
     * @param {Float32Array[][]} outputs 
     * @returns {boolean}
     */
    process(inputs, outputs) {

        if (outputs.length < 1 || inputs.length < 1 ) {
            return true;
        }

        // console.log(outputs, inputs);

        // // outputs[0].forEach((channel) => {
        // //     channel[i] = (Math.random() * 2 - 1);
        // // })

        // // return true

        for (const channel of outputs[0]) {
            for (let i = 0; i < channel.length; i++) {
                    channel[i] = inputs[0][0][i];
                    for (let j = 1; j < inputs.length; j++) {
                        channel[i] *= inputs[j][0][i];
                    }
            }
        }

        return true;

        // return true

        // outputs[0].forEach((channel) => {
        //     for (let i = 0; i < channel.length; i++) {
        //       // generate random value for each sample
        //       // Math.random range is [0; 1); we need [-1; 1]
        //       // this won't include exact 1 but is fine for now for simplicity
        //       channel[i] =
        //         (Math.random() * 2 - 1) *
        //         // the array can contain 1 or 128 values
        //         // depending on if the automation is present
        //         // and if the automation rate is k-rate or a-rate
        //         1
        //         // (parameters["customGain"].length > 1
        //         //   ? parameters["customGain"][i]
        //         //   : parameters["customGain"][0]);
        //     }
        //   });

        //   return true;

        for (let i = 0; i < outputs[0].length; i++) {
            outputs[0][i] = inputs[0][i];
            // outputs[0][i] = inputs[0][i] * inputs[1][i];
            // outputs[1][i] = inputs[0][i] * inputs[1][i];
        }
        return true;

        if (inputs.length < 2 || outputs.length < 1) {
            return true;
        }

        const length = Math.min(...inputs.map(input => input.length), outputs[0].length);

        for (let i = 0; i < length; i++) {
            outputs[0][i] = inputs[0][i];
            for (let j = 1; j < inputs.length; j++) {
                outputs[0][i] *= inputs[j][i]
            }
        }

        return true;
    }
}

registerProcessor("frequency-modulator", FrequencyModulator);