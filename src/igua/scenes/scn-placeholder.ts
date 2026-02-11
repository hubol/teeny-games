import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { objDestructibleSprite } from "../objects/obj-destructible-sprite";

const txsFag = Tx.Nudes.DemoFag.split({ count: 3 });

export function scnPlaceholder() {
    Sprite.from(txsFag[0]).show();
    objDestructibleSprite(txsFag[1], 8).show();
    objDestructibleSprite(txsFag[2], 8).show();
}
