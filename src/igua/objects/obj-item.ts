import { container } from "../../lib/pixi/container";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { mxnItem } from "../mixins/mxn-item";
import { DataItem } from "./data-item";

export function objItem(itemId: DataItem.Id) {
    const item = { ref: new DataItem.Manifest[itemId]() };

    return container()
        .mixin(mxnItem, item, [0, 0])
        .mixin(
            mxnInteractive,
            {
                get text() {
                    return "Take " + item.ref.name;
                },
            },
        )
        .identify(objItem);
}
