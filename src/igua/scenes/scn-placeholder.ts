import { Graphics } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { ForceTintFilter } from "../../lib/pixi/filters/force-tint-filter";
import { Key } from "../globals";
import { mxnActionRepeater } from "../mixins/mxn-action-repeater";
import { objPlayer } from "../objects/obj-player";

export function scnPlaceholder() {
    const lvl = Lvl.Placeholder();
    objPlayer().at(40, 40).show();
}
