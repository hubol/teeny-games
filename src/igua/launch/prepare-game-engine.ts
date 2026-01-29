import { KeyListener } from "../../lib/browser/key-listener";
import { Animator } from "../../lib/game-engine/animator";
import { AsshatTicker } from "../../lib/game-engine/asshat-ticker";
import { setEngineConfig } from "../../lib/game-engine/engine-config";
import { PixiRenderer } from "../../lib/game-engine/pixi-renderer";
import { TickerContainer } from "../../lib/game-engine/ticker-container";
import { Collision } from "../../lib/pixi/collision";
import { devAssignDisplayObjectIdentifiers } from "../../lib/pixi/dev-assign-displayobject-identifiers";
import { scene, sceneStack, setIguaGlobals } from "../globals";

globalThis.onDisplayObjectConstructed = devAssignDisplayObjectIdentifiers;

const rootTicker = new AsshatTicker();
const rootStage = new TickerContainer(rootTicker, false).named("Root");

const keyListener = new KeyListener();

export function prepareGameEngine(renderer: PixiRenderer) {
    let gameLoopForced = false;

    function forceGameLoop() {
        gameLoopForced = true;
    }

    const animator = new Animator(60);

    setIguaGlobals(rootStage, keyListener, forceGameLoop, animator.start.bind(animator));
    keyListener.start();

    function gameLoop() {
        do {
            gameLoopForced = false;

            scene?.ticker.tick();
            rootTicker.tick();
            Collision.recycleRectangles();
            keyListener.tick();
        }
        while (gameLoopForced);

        renderer.render(rootStage);
    }

    animator.add(gameLoop);

    setEngineConfig({
        get showDefaultStage() {
            return scene.stage;
        },
        sceneStack,
        renderer,
        get worldStage() {
            return scene.stage;
        },
    });
}
