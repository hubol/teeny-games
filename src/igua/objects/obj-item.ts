import { Sfx } from "../../assets/sounds";
import { VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { layers } from "../globals";
import { mxnInteractive } from "../mixins/mxn-interactive";
import { mxnItem } from "../mixins/mxn-item";
import { DataItem, Item } from "./data-item";

export function objItem(itemOrId: DataItem.Id | Item, pivotUnit: VectorSimple = vnew()) {
    const item = {
        ref: itemOrId instanceof Item
            ? itemOrId
            : new DataItem.Manifest[itemOrId](),
    };

    const obj = container();
    return obj
        .merge({ objItem: { item } })
        .mixin(mxnItem, item, pivotUnit)
        .mixin(
            mxnInteractive,
            {
                text(heldItem) {
                    if (heldItem === null) {
                        return "Take " + item.ref.name;
                    }

                    const result = Item.combine(item.ref, heldItem);

                    if (result.kind === "combined") {
                        return result.description;
                    }

                    return "Use " + heldItem.name + "\non " + item.ref.name;
                },
                interact(heldItem) {
                    if (!heldItem.ref) {
                        const result = item.ref.take();
                        if (result.success) {
                            obj.play(Sfx.PickUp.rate(0.95, 1.05));
                            heldItem.ref = result.item;
                            obj.destroy();
                        }
                        else {
                            layers.overlay.showError(result.reason);
                        }

                        return;
                    }
                    const result = Item.combine(item.ref, heldItem.ref);
                    if (result.kind === "impossible") {
                        layers.overlay.showError("Nothing happens.");
                    }
                    else if (result.kind === "failed") {
                        layers.overlay.showError(result.reason);
                    }
                    else {
                        if (result.item0 === null) {
                            obj.destroy();
                        }
                        else {
                            item.ref = result.item0;
                        }

                        heldItem.ref = result.item1;
                    }
                },
            },
        );
}
