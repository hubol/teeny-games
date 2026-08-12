import { Integer } from "../math/number-alias-types";
import { IRectangle } from "../math/rectangle";
import { CanvasSpaceTransformer } from "./canvas-space-transformer";

const consts = {
    radius: 4,
};

export class PointerListener implements PointerListener.Public {
    private readonly _states = new Array<PointerListener.State>();

    private readonly _canvasSpaceTransformer: CanvasSpaceTransformer;

    allowedType: PointerListener.PointerType.Allowed = "any";

    // TODO should be able to apply canvas after construction
    constructor(canvasEl: HTMLCanvasElement) {
        this._canvasSpaceTransformer = new CanvasSpaceTransformer(canvasEl);
    }

    start() {
        const handlePointerEvent = (e: PointerEvent): PointerListener.State | null => {
            const pointerType = PointerListener._getPointerType(e);

            if (this.allowedType !== "any" && pointerType !== this.allowedType) {
                return null;
            }

            const v = this._canvasSpaceTransformer.transformClientPoint(e.clientX, e.clientY);
            const id = e.pointerId;

            const x = v.x + Math.round(e.width / 2) - consts.radius;
            const y = v.y + Math.round(e.height / 2) - consts.radius;

            const width = e.width + consts.radius * 2;
            const height = e.height + consts.radius * 2;

            for (let i = 0; i < this._states.length; i++) {
                const state = this._states[i];
                if (state.id === id) {
                    state.x = x;
                    state.y = y;
                    state.width = width;
                    state.height = height;
                    if (e.pointerType === "mouse" && e.type === "pointerdown") {
                        state.down = true;
                    }
                    return state;
                }
            }

            const state: PointerListener.State = {
                down: (e.pointerType === "mouse" && e.type !== "pointerdown") ? false : true,
                id,
                x,
                y,
                width,
                height,
                type: pointerType,
            };
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

    get states() {
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

    private static readonly _claims = new WeakSet<PointerListener.State>();

    claim(pointer: PointerListener.State): boolean {
        if (PointerListener._claims.has(pointer)) {
            return false;
        }

        PointerListener._claims.add(pointer);
        return true;
    }

    private static _getPointerType(e: PointerEvent) {
        return e.pointerType === "mouse" ? "mouse" : "touch";
    }
}

export namespace PointerListener {
    export interface Public {
        allowedType: PointerType.Allowed;
        readonly states: ReadonlyArray<Readonly<State>>;
        fill(buffer: Buffer): Integer;
        claim(pointer: State): boolean;
    }

    export interface State extends IRectangle {
        type: PointerType;
        id: Integer;
        down: boolean;
    }

    export type PointerType = "mouse" | "touch";

    export namespace PointerType {
        export type Allowed = PointerType | "any";
    }

    export type Buffer = Array<Readonly<State>>;
}
