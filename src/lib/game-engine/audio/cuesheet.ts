import { Integer } from "../../math/number-alias-types";
import { Logger } from "../logger";

export type Cuesheet<TCommand> = Array<[start: number, end: number, command: TCommand, data: string | null]>;

export namespace Cuesheet {
    export function interlaceClickCues<TCommand>(
        cuesheet: Cuesheet<TCommand>,
        measureCommand: TCommand,
        clicksPerMeasure: Integer,
    ): Cuesheet<TCommand | "click"> {
        if (clicksPerMeasure < 1) {
            Logger.logContractViolationError(
                "DataCuesheet.interlaceClickCues",
                new Error("clicksPerMeasure must be at least 1"),
                { clicksPerMeasure },
            );
            return cuesheet;
        }

        const measureCommands = cuesheet
            .filter(([_, __, command]) => command === measureCommand)
            .map(([start]) => start);

        const clickCuesheet: Cuesheet<"click"> = [];

        for (let m = 0; m < measureCommands.length - 1; m++) {
            const start = measureCommands[m];
            const length = measureCommands[m + 1] - start;
            const deltaPerClick = length / (clicksPerMeasure + 1);

            if (clickCuesheet.length === 0) {
                for (let i = 1; true; i++) {
                    const click = start - i * deltaPerClick;
                    if (click < 0) {
                        break;
                    }

                    clickCuesheet.push([click, click, "click", null]);
                }
            }

            for (let i = 1; i <= clicksPerMeasure; i++) {
                const click = start + i * deltaPerClick;
                clickCuesheet.push([click, click, "click", null]);
            }
        }

        return [...cuesheet, ...clickCuesheet].sort(([a], [b]) => a - b);
    }
}
