import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { holdf } from "../../lib/game-engine/routines/hold";
import { interp } from "../../lib/game-engine/routines/interp";
import { onMutate } from "../../lib/game-engine/routines/on-mutate";
import { CollisionShape } from "../../lib/pixi/collision";
import { Null } from "../../lib/types/null";
import { Mouse, scene, sceneStack } from "../globals";
import { objCursor } from "../objects/obj-cursor";
import { createFuckaConfig, FuckaConfig, objFucka } from "../objects/obj-fucka";
import { ObjNude } from "../objects/obj-nude";
import { objMarker } from "../objects/utils/obj-marker";

const controlConfigs = (function () {
    function control(text: string, mutateFn: (config: FuckaConfig) => void, peekLayer: ObjNude.PeekLayer = "top") {
        return { text, mutateFn, peekLayer };
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
        control("Undies", config => config.clothes.underwear += 1, "underwear"),
        control("Pubes", config => config.pubes += 1, "nude"),
        control("Build", config => config.abdomen += 1, "underwear"),
    ];
})();

export function scnDressUp(configProvider: (config: FuckaConfig) => void = () => {}) {
    const lvl = Lvl.DressUp();

    const fuckaConfig = createFuckaConfig();

    let hoveredObj = Null<DisplayObject>();
    let peekLayer: ObjNude.PeekLayer = "top";

    const cursorObj = objCursor(2)
        .step(() => hoveredObj = null)
        .coro(function* () {
            while (true) {
                yield holdf(() => hoveredObj === null, 5);
                peekLayer = "top";
            }
        }, 1)
        .coro(function* (self) {
            const collisionObj = new Graphics().beginFill(0xff0000).drawRect(-3, -3, 6, 6).invisible().show(self);
            self.collisionShape(CollisionShape.DisplayObjects, [collisionObj]);
        })
        .show();

    function mxnMouseable(obj: DisplayObject) {
        const api = {
            get isHovered() {
                return hoveredObj === obj;
            },
            get isPressed() {
                return hoveredObj === obj && Mouse.isDown;
            },
        };

        return obj
            .step(self => {
                if (cursorObj.collides(self)) {
                    hoveredObj = self;
                }
            })
            .merge({ mxnMouseable: api });
    }

    {
        const controlConfigPositions = Instances(objMarker, obj => obj.tint === 0x00ff00);
        for (let i = 0; i < controlConfigPositions.length; i++) {
            const position = controlConfigPositions[i];
            const config = controlConfigs[i];

            if (!config) {
                break;
            }

            objText.XLargeIrregular(config.text)
                .mixin(mxnMouseable)
                .anchored(0.5, 0.5)
                .at(position)
                .step((self) => {
                    if (self.mxnMouseable.isHovered) {
                        peekLayer = config.peekLayer;
                    }
                }, 1)
                .coro(function* (self) {
                    while (true) {
                        yield () => self.mxnMouseable.isPressed;
                        self.play(Sfx.Control.rate(0.5, 2));
                        config.mutateFn(fuckaConfig);
                        self.tint = 0xEF759E;
                        yield () => !Mouse.isDown;
                        self.tint = 0xffffff;
                    }
                }, 1)
                .show();
        }
    }

    {
        let mutationsCount = 0;

        scene.stage
            .coro(function* () {
                while (true) {
                    const fuckaObj = objFucka(fuckaConfig)
                        .step(self => self.objNude.peekLayer = peekLayer)
                        .at(lvl.FuckaMarker)
                        .show();

                    fuckaObj.objNude.peekLayer = peekLayer;
                    yield onMutate(fuckaConfig);
                    mutationsCount++;
                    fuckaObj.destroy();
                }
            });

        Sprite.from(Tx.Done)
            .at(193, 234)
            .invisible()
            .coro(function* (self) {
                yield () => mutationsCount >= 1;
                self.visible = true;
                self.alpha = 0;
                yield interp(self, "alpha").steps(3).to(1).over(500);
                const mouseableObj = self.mixin(mxnMouseable);
                yield () => mouseableObj.mxnMouseable.isPressed;
                configProvider(fuckaConfig);
            }, 999)
            .show();
    }
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
