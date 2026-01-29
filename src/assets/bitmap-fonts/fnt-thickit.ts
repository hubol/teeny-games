import { createBitmapFont } from "../../lib/pixi/create-bitmap-font";
import { Tx } from "../textures";

const characters = {
    "0": { x: 25, y: 0, w: 8, h: 13, xadv: 9 },
    "1": { x: 35, y: 0, w: 4, h: 13, xadv: 5 },
    "2": { x: 41, y: 0, w: 8, h: 13, xadv: 9 },
    "3": { x: 51, y: 0, w: 8, h: 13, xadv: 9 },
    "4": { x: 61, y: 0, w: 8, h: 13, xadv: 9 },
    "5": { x: 71, y: 0, w: 8, h: 13, xadv: 9 },
    "6": { x: 81, y: 0, w: 8, h: 13, xadv: 9 },
    "7": { x: 91, y: 0, w: 8, h: 13, xadv: 9 },
    "8": { x: 101, y: 0, w: 8, h: 13, xadv: 9 },
    "9": { x: 111, y: 0, w: 8, h: 13, xadv: 9 },
    x: { x: 16, y: 3, w: 7, h: 7, xadv: 8, yoff: 3 },
    "-": { x: 8, y: 6, w: 6, h: 2, xadv: 7, yoff: 6 },
    "+": { x: 0, y: 4, w: 6, h: 6, xadv: 7, yoff: 4 },
    ".": { x: 121, y: 11, w: 2, h: 2, xadv: 3, yoff: 11 },
    " ": { x: 0, y: 0, w: 0, h: 0, xadv: 3, yoff: 0 },
};

export const fntThickit = createBitmapFont(Tx.Font.Thickit, {
    name: "Thickit",
    size: 13,
    lineHeight: 14,
    characters,
    kernings: [],
});
