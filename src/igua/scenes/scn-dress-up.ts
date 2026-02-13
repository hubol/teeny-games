import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { onMutate } from "../../lib/game-engine/routines/on-mutate";
import { Null } from "../../lib/types/null";
import { scene, sceneStack } from "../globals";
import { createFuckaConfig, FuckaConfig, objFucka } from "../objects/obj-fucka";

export function scnDressUp(configProvider: (config: FuckaConfig) => void = () => {}) {
    const lvl = Lvl.DressUp();

    const config = createFuckaConfig();

    scene.stage
        .coro(function* () {
            while (true) {
                const fuckaObj = objFucka(config).at(lvl.FuckaMarker).show();
                yield onMutate(config);
                fuckaObj.destroy();
            }
        });
}

export function* playDressUp() {
    let fuckaConfig = Null<FuckaConfig>();
    sceneStack.push(() =>
        scnDressUp(
            config => {
                fuckaConfig = config;
                sceneStack.pop();
            },
        ), { useGameplay: false });

    yield () => Boolean(fuckaConfig);

    return fuckaConfig!;
}
