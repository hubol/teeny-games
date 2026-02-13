import { Sprite, Texture } from "pixi.js";
import { Tx } from "../../assets/textures";
import { cyclic } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { MapRgbFilter } from "../../lib/pixi/filters/map-rgb-filter";
import { range } from "../../lib/range";
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

export function createFuckaConfig() {
    const [red, green, blue] = Rng.shuffle(range(consts.colors.length));

    return {
        colors: {
            red,
            green,
            blue,
        },
        mullet: Rng.int(txs.Mullet.length),
        body: Rng.int(txs.Body.length),
        abdomen: Rng.int(txs.Abdomen.length),
        pubes: Rng.int(txs.Pubes.length),
        penis: Rng.int(txs.Penis.length),
        hair: Rng.int(txs.Hair.length),
        face: {
            eyes: Rng.int(txs.Eyes.length),
            nose: Rng.int(txs.Nose.length),
            mouth: Rng.int(txs.Mouth.length),
            decoration: Rng.int(txs.Decoration.length),
        },
        clothes: {
            underwear: Rng.int(txs.Underwear.length),
            footwear: Rng.int(txs.Footwear.length),
            bottoms: Rng.int(txs.Bottoms.length),
            top: Rng.int(txs.Top.length),
        },
    };
}

function tx(key: keyof typeof txs, index: Integer) {
    return txs[key][cyclic(index, 0, txs[key].length)];
}

function sprite(key: keyof typeof txs, index: Integer) {
    return Sprite.from(tx(key, index));
}

function color(index: Integer) {
    return consts.colors[cyclic(index, 0, consts.colors.length)];
}

export type FuckaConfig = ReturnType<typeof createFuckaConfig>;

export function objFucka(config: FuckaConfig) {
    const bodyObj = container(
        sprite("Mullet", config.mullet),
        sprite("Body", config.body),
        sprite("Abdomen", config.abdomen),
        sprite("Pubes", config.pubes),
        sprite("Penis", config.penis),
        sprite("Hair", config.hair),
        container(
            sprite("Eyes", config.face.eyes),
            sprite("Nose", config.face.nose),
            sprite("Mouth", config.face.mouth),
            sprite("Decoration", config.face.decoration),
        )
            .mixin(mxnBoilPivot),
    );

    return objNude({
        bodyObj,
        genitalCoveringTx: tx("Underwear", config.clothes.underwear),
        clothesTxs: [
            tx("Footwear", config.clothes.footwear),
            tx("Bottoms", config.clothes.bottoms),
            tx("Top", config.clothes.top),
        ],
        underwearTxs: [],
    })
        .filtered(
            new MapRgbFilter(
                color(config.colors.red),
                color(config.colors.green),
                color(config.colors.blue),
            ),
        );
}

export function objFuckaPalette() {
    return container(
        ...consts.colors
            .map((color, i) => Sprite.from(Tx.Palette).filtered(new MapRgbFilter(color, color, color)).at(i * 24, 0)),
    );
}
