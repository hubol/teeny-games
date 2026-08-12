import { Container } from "pixi.js";
import { KeyListener } from "../lib/browser/key-listener";
import { PointerListener } from "../lib/browser/pointer-listener";
import { IguaLayers } from "./core/igua-layers";
import { IguaScene, IguaSceneStack } from "./core/scene/igua-scene-stack";

export let layers: IguaLayers;
export let scene: IguaScene;
export let sceneStack: IguaSceneStack;
export let Key: Pick<KeyListener, "isDown" | "isUp" | "justWentDown" | "justWentUp">;
export let Pointer: PointerListener.Public;
export let forceGameLoop: () => void;
export let startAnimator: () => void;

export function setIguaGlobals(
    rootStage: Container,
    keyListener: KeyListener,
    pointerListener: PointerListener,
    forceGameLoopFn: () => void,
    startAnimatorFn: () => void,
) {
    layers = new IguaLayers(rootStage);
    sceneStack = new IguaSceneStack(layers, (_scene) => scene = _scene);
    Key = keyListener;
    Pointer = pointerListener;
    forceGameLoop = forceGameLoopFn;
    startAnimator = startAnimatorFn;
}
