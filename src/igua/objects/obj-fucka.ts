import { Sprite, Texture } from "pixi.js";
import { Tx } from "../../assets/textures";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { MapRgbFilter } from "../../lib/pixi/filters/map-rgb-filter";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objNude } from "./obj-nude";

const txs = Object.fromEntries(
    Object.entries(Tx.Fucka)
        .map(([key, tx]) => [key, tx.split({ width: 144 })]),
) as Record<keyof typeof Tx["Fucka"], Texture[]>;

const consts = {
    colors: [
        0xFF5151,
        0xFF9F00,
        0xFFD100,
        0xB2D100,
        0x74D100,
        0x1AA85C,
        0x74D1C2,
        0x59BEE1,
        0x5971E1,
        0xD5A3F7,
        0xF78AF7,
    ],
};

const rng = new PseudoRng();

export function objFucka() {
    rng.seed = Rng.intc(10_000_000, 999_999_999);

    const [red, green, blue] = rng.shuffle([...consts.colors]);

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
    })
        .filtered(new MapRgbFilter(red, green, blue));
}

export function objFuckaPalette() {
    return container(
        ...consts.colors
            .map((color, i) => Sprite.from(Tx.Palette).filtered(new MapRgbFilter(color, color, color)).at(i * 24, 0)),
    );
}
