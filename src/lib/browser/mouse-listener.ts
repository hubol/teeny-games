import { CanvasSpaceTransformer } from "./canvas-space-transformer";

export interface MouseListenerPublic {
    readonly x: number;
    readonly y: number;
    readonly isPositionKnown: boolean;
    readonly isDown: boolean;
    readonly justWentDown: boolean;
}

export class MouseListener implements MouseListenerPublic {
    private readonly _nextState = { x: 0, y: 0, isDown: false, isPositionKnown: false, downCount: 0 };
    private readonly _canvasSpaceTransformer: CanvasSpaceTransformer;

    // TODO should be able to apply canvas after construction
    constructor(canvasEl: HTMLCanvasElement) {
        this._canvasSpaceTransformer = new CanvasSpaceTransformer(canvasEl);
    }

    x = 0;
    y = 0;
    isPositionKnown = false;
    isDown = false;
    justWentDown = false;

    tick() {
        this.x = this._nextState.x;
        this.y = this._nextState.y;
        this.isDown = this._nextState.isDown;
        this.isPositionKnown = this._nextState.isPositionKnown;
        this.justWentDown = this._nextState.downCount > 0;
        this._nextState.downCount = 0;
    }

    start() {
        const handlePointerEvent = (e: PointerEvent) => {
            const v = this._canvasSpaceTransformer.transformClientPoint(e.clientX, e.clientY);
            this._nextState.x = v.x;
            this._nextState.y = v.y;
            this._nextState.isPositionKnown = true;
        };

        document.addEventListener("pointermove", handlePointerEvent);

        document.addEventListener("pointerdown", e => {
            handlePointerEvent(e);
            this._nextState.isDown = true;
            this._nextState.downCount++;
        });
        document.addEventListener("pointerup", e => {
            handlePointerEvent(e);
            this._nextState.isDown = false;
        });
    }
}


