import { Environment } from "../../lib/environment";
import { SceneLibrary } from "../core/scene/scene-library";
import { DevGameStartConfig } from "../dev/dev-game-start-config";
import { sceneStack, startAnimator } from "../globals";
import { IcmUrl } from "../utils/icm-url";

export function startGame() {
    const config = getConfig();

    sceneStack.push(SceneLibrary.findByName(config.sceneName), { useGameplay: false });
    startAnimator();
}

function getConfig(): GameStartConfig {
    const devConfig = Environment.isDev ? DevGameStartConfig.get() : null;

    if (devConfig === null) {
        return {
            sceneName: IcmUrl.screenIndex === 0 ? "scnDesigner" : "scnAttract",
        };
    }

    return devConfig;
}

export interface GameStartConfig {
    sceneName: string;
}
