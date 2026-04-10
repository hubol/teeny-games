import { Container } from "pixi.js";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleepf } from "../../lib/game-engine/routines/sleep";
import { mxnMouth } from "./mxn-mouth";

export function mxnSpeaker(obj: Container) {
    const api = {
        isSpeaking: false,
    };

    return obj
        .merge({ mxnSpeaker: api })
        .coro(function* () {
            while (true) {
                yield () => api.isSpeaking;
                const mouthObj = obj.findIs(mxnMouth).last;
                if (!mouthObj) {
                    yield sleepf(1);
                    continue;
                }

                yield interp(mouthObj.mxnMouth, "agapeUnit").to(1).over(300);
                yield sleepf(5);
                yield interp(mouthObj.mxnMouth, "agapeUnit").to(0).over(300);
                yield sleepf(5);
            }
        });
}
