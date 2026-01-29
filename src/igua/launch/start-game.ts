import { Environment } from "../../lib/environment";
import { VectorSimple } from "../../lib/math/vector-type";
import { SceneLibrary } from "../core/scene/scene-library";
import { DevGameStartConfig } from "../dev/dev-game-start-config";
import { sceneStack, startAnimator } from "../globals";

export function startGame() {
    const config = getConfig();

    sceneStack.push(SceneLibrary.findByName(config.sceneName), { useGameplay: false });
    startAnimator();
}

function getConfig(): GameStartConfig {
    const devConfig = Environment.isDev ? DevGameStartConfig.get() : null;

    if (devConfig === null) {
        return {
            sceneName: "scnPlaceholder",
        };
    }

    return devConfig;
}

export interface GameStartConfig {
    sceneName: string;
}
