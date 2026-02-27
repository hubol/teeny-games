import { Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";

export function scnEnding() {
    const lvl = Lvl.Ending();

    lvl.EndingHubolFace.mixin(mxnBoilPivot);
    lvl.EndingMishaFace.mixin(mxnBoilPivot);

    {
        lvl.EndingTable.pivoted(0, -50);
        lvl.HubolGroup.pivoted(-290, 0);
        lvl.MishaGroup.pivoted(260, 0);

        scene.stage
            .coro(function* () {
                yield sleep(250);
                yield interpvr(lvl.EndingTable.pivot).factor(factor.sine).to(0, 0).over(500);
                yield interpvr(lvl.HubolGroup.pivot).factor(factor.sine).to(0, 0).over(1000);
                yield interpvr(lvl.MishaGroup.pivot).factor(factor.sine).to(0, 0).over(1000);

                scene.stage
                    .coro(function* () {
                        yield sleep(4000);
                        Sprite.from(Tx.Ending.TheEnd)
                            .mixin(mxnBoilPivot)
                            .zIndexed(999)
                            .show();
                    });

                while (true) {
                    objFallingLatke().at(Rng.intc(0, 500), -40).show();
                    yield sleepf(2);
                }
            });
    }
}

function objFallingLatke() {
    let angle = Rng.float(360);
    let speed = Rng.float(3);
    let delta = Rng.float(-1, 1) * Rng.float(3, 5);

    return Sprite.from(Tx.Item.Latke)
        .anchored(0.5, 0.5)
        .step(self => {
            speed += 0.03;
            angle += delta;
            self.angle = Math.round(angle / 45) * 45;
            self.y += speed;
            if (self.y > 400) {
                self.destroy();
            }
        });
}
