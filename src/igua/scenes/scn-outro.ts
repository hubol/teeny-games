import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { interpvr } from "../../lib/game-engine/routines/interp";
import { container } from "../../lib/pixi/container";
import { scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";

const [txHubol, txHubolFace, txTable] = Tx.Outro.Scene.split({ count: 3 });

export function scnOutro() {
    const sceneObj = container(
        Sprite.from(txHubol).mixin(mxnBoilPivot),
        Sprite.from(txHubolFace).mixin(mxnBoilPivot),
        Sprite.from(txTable),
    )
        .at(50, 34)
        .pivoted(0, -200)
        .show();

    scene.stage
        .coro(function* () {
            yield interpvr(sceneObj.pivot).to(0, 0).over(3000);
        });
}
