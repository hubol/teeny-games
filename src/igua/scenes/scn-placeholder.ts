import { Tx } from "../../assets/textures";
import { objDestructibleSprite } from "../objects/obj-destructible-sprite";

const txsFag = Tx.Nudes.DemoFag.split({ count: 3 });

export function scnPlaceholder() {
    objDestructibleSprite(txsFag[0], 8);
    objDestructibleSprite(txsFag[1], 8);
    objDestructibleSprite(txsFag[2], 8);
}
