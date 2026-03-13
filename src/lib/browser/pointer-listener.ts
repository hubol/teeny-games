import { Integer } from "../math/number-alias-types";
import { VectorSimple } from "../math/vector-type";
import { CanvasSpaceTransformer } from "./canvas-space-transformer";

export class PointerListener implements PointerListener.Public {
    private readonly _states = new Array<PointerListener.State>();

    private readonly _canvasSpaceTransformer: CanvasSpaceTransformer;

    allowedType: PointerListener.PointerType = "touch";

    // TODO should be able to apply canvas after construction
    constructor(canvasEl: HTMLCanvasElement) {
        this._canvasSpaceTransformer = new CanvasSpaceTransformer(canvasEl);
    }

    start() {
        const handlePointerEvent = (e: PointerEvent): PointerListener.State | null => {
            if (e.pointerType !== this.allowedType) {
                return null;
            }

            const v = this._canvasSpaceTransformer.transformClientPoint(e.clientX, e.clientY);
            const id = e.pointerId;

            for (let i = 0; i < this._states.length; i++) {
                const state = this._states[i];
                if (state.id === id) {
                    state.x = v.x;
                    state.y = v.y;
                    return state;
                }
            }

            const state = { down: true, id, x: v.x, y: v.y };
            this._states.push(state);
            return state;
        };

        document.addEventListener("pointermove", handlePointerEvent);
        document.addEventListener("pointerdown", handlePointerEvent);
        document.addEventListener("pointerup", e => {
            const state = handlePointerEvent(e);
            if (state) {
                state.down = false;
                this._states.removeFirst(state);
            }
        });
    }

    get positions() {
        return this._states;
    }

    fill(buffer: PointerListener.Buffer): Integer {
        const last = buffer.last;
        let beginAdding = last === undefined;
        let addedCount = 0;

        for (let i = 0; i < this._states.length; i++) {
            if (beginAdding) {
                buffer.push(this._states[i]);
                addedCount += 1;
            }
            else if (this._states[i] === last) {
                beginAdding = true;
            }
        }

        return addedCount;
    }
}

export namespace PointerListener {
    export interface Public {
        allowedType: PointerType;
        readonly positions: ReadonlyArray<Readonly<VectorSimple>>;
        fill(buffer: Buffer): Integer;
    }

    export interface State extends VectorSimple {
        id: Integer;
        down: boolean;
    }

    export type PointerType = "mouse" | "touch";

    export type Buffer = Array<Readonly<State>>;
}
