import { vnew } from "../math/vector-type";
import { onViewportResize } from "./on-viewport-resize";

const v = vnew();

export class CanvasSpaceTransformer {
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
