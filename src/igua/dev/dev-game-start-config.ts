import { GameStartConfig } from "../launch/start-game";
import { DevUrl } from "./dev-url";

export const DevGameStartConfig = {
    get(): GameStartConfig | null {
        if (DevUrl.sceneName) {
            return { sceneName: DevUrl.sceneName };
        }

        return null;
    },
};
