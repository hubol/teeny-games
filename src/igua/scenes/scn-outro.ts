import { Sprite } from "pixi.js";
import { Mzk } from "../../assets/music";
import { Tx } from "../../assets/textures";
import { interpvr } from "../../lib/game-engine/routines/interp";
import { container } from "../../lib/pixi/container";
import { Jukebox } from "../core/igua-audio";
import { scene } from "../globals";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";

const [txHubol, txHubolFace, txTable] = Tx.Outro.Scene.split({ count: 3 });

export function scnOutro() {
    Sprite.from(Tx.Intro.Background)
        .mixin(mxnBoilDisplacement)
        .show();
    Jukebox.play(Mzk.HappyBoy, 0);
    const sceneObj = container(
        Sprite.from(txHubol).mixin(mxnBoilPivot),
        Sprite.from(txHubolFace).mixin(mxnBoilPivot),
        Sprite.from(txTable),
    )
        .at(50, 34)
        .pivoted(0, -260)
        .show();

    scene.stage
        .coro(function* () {
            yield () => Jukebox.getEstimatedPlayheadPosition(Mzk.HappyBoy) >= .1;
            yield interpvr(sceneObj.pivot).to(0, 0).over(2000);
            yield () => Jukebox.getEstimatedPlayheadPosition(Mzk.HappyBoy) >= 11;
            Sprite.from(Tx.Outro.Costco).show();
            yield () => Jukebox.getEstimatedPlayheadPosition(Mzk.HappyBoy) >= 37.951;
            Sprite.from(Tx.Outro.TheEnd).mixin(mxnBoilPivot).show();
        });
}
