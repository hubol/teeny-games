import { vnew } from "../math/vector-type";
import { onViewportResize } from "./on-viewport-resize";

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

const v = vnew();

class CanvasSpaceTransformer {
    private _previousDomRect = new DOMRect();
    private _domRectHasBeenEqualTimes = 0;

    constructor(private readonly _canvasEl: HTMLCanvasElement) {
        onViewportResize(() => this._domRectHasBeenEqualTimes = 0);
    }

    transformClientPoint(x: number, y: number) {
        if (this._domRectHasBeenEqualTimes < 5) {
            const domRect = this._canvasEl.getBoundingClientRect();
            if (
                this._previousDomRect.x === domRect.x && this._previousDomRect.y === domRect.y
                && this._previousDomRect.width === domRect.width && this._previousDomRect.height === domRect.height
            ) {
                this._domRectHasBeenEqualTimes++;
            }

            this._previousDomRect = domRect;
        }

        return v.at(
            Math.round(
                ((x - this._previousDomRect.x) / this._previousDomRect.width) * this._canvasEl.width,
            ),
            Math.round(
                ((y - this._previousDomRect.y) / this._previousDomRect.height) * this._canvasEl.height,
            ),
        );
    }
}
