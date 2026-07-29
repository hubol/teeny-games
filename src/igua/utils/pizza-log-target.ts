import { DefaultLogTarget, LogNature, LogTarget } from "../../lib/game-engine/logger";
import { Integer } from "../../lib/math/number-alias-types";

export class PizzaLogTarget implements LogTarget {
    static readonly singleton: PizzaLogTarget = new PizzaLogTarget();

    private constructor() {
    }

    private _errorCounts: Record<LogNature, Integer> = {
        AssertFailed: 0,
        ContractViolated: 0,
        Debug: 0,
        Misconfigured: 0,
        Unexpected: 0,
        Unhandled: 0,
    };

    get errorCounts(): Readonly<Record<LogNature, Integer>> {
        return this._errorCounts;
    }

    onDebug(source: string, message: string, ...context: any[]): void {
        DefaultLogTarget.onDebug(source, message, ...context);
    }

    onError(nature: LogNature, source: string, error: any, ...context: any[]): void {
        DefaultLogTarget.onError(nature, source, error, ...context);
        this._errorCounts[nature]++;
    }
}
