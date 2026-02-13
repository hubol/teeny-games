import { Graphics } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Instances } from "../../lib/game-engine/instances";
import { onMutate } from "../../lib/game-engine/routines/on-mutate";
import { CollisionShape } from "../../lib/pixi/collision";
import { Null } from "../../lib/types/null";
import { Mouse, scene, sceneStack } from "../globals";
import { objCursor } from "../objects/obj-cursor";
import { createFuckaConfig, FuckaConfig, objFucka } from "../objects/obj-fucka";
import { objMarker } from "../objects/utils/obj-marker";

const controlConfigs = (function () {
    function control(text: string, mutateFn: (config: FuckaConfig) => void) {
        return { text, mutateFn };
    }

    return [
        control("Color A", config => config.colors.red += 1),
        control("Color B", config => config.colors.green += 1),
        control("Color C", config => config.colors.blue += 1),
        control("Mullet", config => config.mullet += 1),
        control("Mouth", config => config.face.mouth += 1),
        control("Nose", config => config.face.nose += 1),
        control("Deco", config => config.face.decoration += 1),
        control("Top", config => config.clothes.top += 1),
        control("Bottoms", config => config.clothes.bottoms += 1),
        control("Footwear", config => config.clothes.footwear += 1),
    ];
})();

export function scnDressUp(configProvider: (config: FuckaConfig) => void = () => {}) {
    const lvl = Lvl.DressUp();

    const fuckaConfig = createFuckaConfig();

    const cursorObj = objCursor(2)
        .coro(function* (self) {
            const collisionObj = new Graphics().beginFill(0xff0000).drawRect(-1, -1, 2, 2).invisible().show(self);
            self.collisionShape(CollisionShape.DisplayObjects, [collisionObj]);
        })
        .show();

    {
        const controlConfigPositions = Instances(objMarker, obj => obj.tint === 0x00ff00);
        for (let i = 0; i < controlConfigPositions.length; i++) {
            const position = controlConfigPositions[i];
            const config = controlConfigs[i];

            if (!config) {
                break;
            }

            const { text, mutateFn } = controlConfigs[i];

            objText.XLargeIrregular(text)
                .anchored(0.5, 0.5)
                .at(position)
                .coro(function* (self) {
                    while (true) {
                        yield () => Mouse.isDown && cursorObj.collides(self);
                        mutateFn(fuckaConfig);
                        self.tint = 0xEF759E;
                        yield () => !Mouse.isDown;
                        self.tint = 0xffffff;
                    }
                })
                .show();
        }
    }

    scene.stage
        .coro(function* () {
            while (true) {
                const fuckaObj = objFucka(fuckaConfig).at(lvl.FuckaMarker).show();
                yield onMutate(fuckaConfig);
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
