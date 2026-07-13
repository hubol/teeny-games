import { objText } from "../../assets/fonts";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { renderer } from "../current-pixi-renderer";
import { DataFeatureFlags } from "../data/data-feature-flags";
import { Key, layers } from "../globals";

export function objFeatureFlags() {
    const toggledFlags = new Set<DataFeatureFlags.Id>();

    const api = {
        isEnabled(id: DataFeatureFlags.Id) {
            const value = DataFeatureFlags.getById(id).defaultValue;
            return toggledFlags.has(id) ? !value : value;
        },
    };

    return objText.XLargeIrregular("", {})
        .anchored(0, 1)
        .merge({ objFeatureFlags: api })
        .step((self) => {
            for (const id of DataFeatureFlags.ids) {
                const flag = DataFeatureFlags.getById(id);
                if (Key.justWentDown(flag.keyCode)) {
                    if (toggledFlags.has(id)) {
                        toggledFlags.delete(id);
                    }
                    else {
                        toggledFlags.add(id);
                    }

                    const isEnabled = api.isEnabled(id);
                    const text = id + ": " + (isEnabled ? "ON" : "OFF");
                    self.text = text;
                    self.coro(function* () {
                        yield sleep(1000);
                        if (self.text === text) {
                            self.text = "";
                        }
                    });
                }
            }
        });
}

const CtxFeatureFlags = new SceneLocal(() =>
    objFeatureFlags()
        .at(20, renderer.height - 20)
        .show(layers.overlay)
);

objFeatureFlags.singleton = {
    get isEnabled() {
        return CtxFeatureFlags.value.objFeatureFlags.isEnabled;
    },
};
