import { Sprite, Texture } from "pixi.js";
import { Tx } from "../../assets/textures";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objNude } from "./obj-nude";

const txs = Object.fromEntries(
    Object.entries(Tx.Fucka)
        .map(([key, tx]) => [key, tx.split({ width: 144 })]),
) as Record<keyof typeof Tx["Fucka"], Texture[]>;

const rng = new PseudoRng();

export function objFucka() {
    rng.seed = Rng.intc(10_000_000, 999_999_999);

    const bodyObj = container(
        Sprite.from(rng.item(txs.Mullet)),
        Sprite.from(rng.item(txs.Body)),
        Sprite.from(rng.item(txs.Abdomen)),
        Sprite.from(rng.item(txs.Pubes)),
        Sprite.from(rng.item(txs.Penis)),
        Sprite.from(rng.item(txs.Hair)),
        container(
            Sprite.from(rng.item(txs.Eyes)),
            Sprite.from(rng.item(txs.Nose)),
            Sprite.from(rng.item(txs.Mouth)),
            Sprite.from(rng.item(txs.Decoration)),
        )
            .mixin(mxnBoilPivot),
    );

    return objNude({
        bodyObj,
        underwearTx: rng.item(txs.Underwear),
        clothesTx: [rng.item(txs.Footwear), rng.item(txs.Bottoms), rng.item(txs.Top)],
    });
}
