import { Sound, SoundInstance } from "../../lib/game-engine/audio/sound";
import { SceneLocal } from "../../lib/game-engine/scene-local";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";

export function objAnnouncer() {
    let previousSoundInstance = Null<SoundInstance>();

    const api = {
        announce(sfx: Sound) {
            if (previousSoundInstance?.ended === false) {
                previousSoundInstance.linearRamp("gain", 0, 0.1);
            }

            const soundInstance = sfx.rate(0.9, 1.1).playInstance();
            previousSoundInstance = soundInstance;
            return () => soundInstance.ended;
        },
    };

    return container()
        .merge({ objAnnouncer: api });
}

const CtxAnnouncer = new SceneLocal(() => objAnnouncer().show());

objAnnouncer.singleton = {
    get announce() {
        return CtxAnnouncer.value.objAnnouncer.announce;
    },
};
