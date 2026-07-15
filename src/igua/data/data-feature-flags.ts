import { KeyCode } from "../../lib/browser/key-listener";
import { DataLib } from "./data-lib";

export namespace DataFeatureFlags {
    export interface Model {
        keyCode: KeyCode;
        defaultValue: boolean;
    }

    export const { ids, getById, manifest } = DataLib.create(
        "DataFeatureFlags",
        {
            PizzaSpin: {
                keyCode: "KeyP",
                defaultValue: false,
            },
            __Fallback__: {
                defaultValue: false,
                keyCode: "Comma",
            },
        } satisfies Record<string, Model>,
    );

    export type Id = DataLib.Id<typeof manifest>;
}
