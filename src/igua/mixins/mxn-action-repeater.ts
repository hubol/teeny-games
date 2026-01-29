import { DisplayObject } from "pixi.js";
import { KeyCode } from "../../lib/browser/key-listener";
import { Integer } from "../../lib/math/number-alias-types";
import { Key } from "../globals";

interface RepeatingActionState {
    keyDownFor: Integer;
    repeats: Integer;
    justWentDown: boolean;
}

export function mxnActionRepeater<TKeyCode extends KeyCode>(
    obj: DisplayObject,
    keyCodes: ReadonlyArray<TKeyCode>,
) {
    const states: Record<TKeyCode, RepeatingActionState> = Object.assign(
        {},
        ...keyCodes.map((action): Record<string, RepeatingActionState> => ({
            [action]: { justWentDown: false, keyDownFor: 0, repeats: 0 },
        })),
    );

    function reset(action: TKeyCode) {
        states[action].justWentDown = false;
        states[action].keyDownFor = 0;
        states[action].repeats = 0;
    }

    obj.step(() => {
        let downCount = 0;

        for (const keyCode of keyCodes) {
            if (Key.isDown(keyCode)) {
                downCount++;

                const state = states[keyCode];
                state.keyDownFor++;
                state.justWentDown = state.keyDownFor === 1
                    || (state.keyDownFor % 2 === 0 && state.keyDownFor > 15);
                if (state.justWentDown) {
                    state.repeats++;
                }
            }
            else {
                reset(keyCode);
            }
        }

        if (keyCodes.length > 1 && downCount === keyCodes.length) {
            for (const action of keyCodes) {
                reset(action);
            }
        }
    });

    const mxnActionRepeater = {
        justWentDown(keyCode: TKeyCode) {
            return states[keyCode].justWentDown;
        },
        repeats(keyCode: TKeyCode) {
            return states[keyCode].repeats;
        },
    };

    return obj.merge({ mxnActionRepeater });
}
