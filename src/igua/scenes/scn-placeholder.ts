import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Tx } from "../../assets/textures";
import { factor, interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { Key, scene } from "../globals";
import { StepOrder } from "../objects/step-order";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";

const txsIdle = Tx.Character.Idle.split({ width: 218 });
const txsWalk = Tx.Character.Walk.split({ width: 218 });
const txsShadow = Tx.Character.Shadow.split({ width: 218 });

export function scnPlaceholder() {
    const lvl = Lvl.Placeholder();

    objBees()
        .show();

    const bodyObj = objIndexedSprite(txsIdle)
        .coro(function* (self) {
            while (true) {
                yield interp(self, "textureIndex").to(self.textures.length).over(500);
                yield interp(self, "textureIndex").to(0).over(500);
            }
        });
    container(
        objIndexedSprite(txsShadow)
            .coro(function* (self) {
                while (true) {
                    yield sleep(Rng.int(100, 300));
                    self.textureIndex = Rng.int(self.textures.length);
                    self.at(Rng.intc(-4, 4), Rng.intc(-4, 4));
                }
            }),
        bodyObj,
    )
        .step(self => {
            if (Key.isDown("ArrowRight")) {
                bodyObj.textures = txsWalk;
                self.x += 1;
            }
            else {
                bodyObj.textures = txsIdle;
            }
            self.y = 20
                + Math.sin(self.x / 200) * 20
                + Math.cos(3 + -self.x / 180) * Math.sin(self.x / 100);
        })
        .step((self) => {
            scene.camera.moveTowards(self.vcpy().add(-100, -100), 0.5);
        }, StepOrder.BeforeCamera)
        .show();
}

function objBees() {
    const p = new PseudoRng();
    return container(
        ...range(32).map(() => objBee().at(Rng.int(scene.level.width), Rng.int(scene.level.height))),
    );
}

function objBee() {
    return objIndexedSprite(Tx.Bee.split({ count: 2 }))
        .coro(function* (self) {
            self.textureIndex = Rng.int(2);
            while (true) {
                yield sleep(Rng.int(70, 120));
                self.textureIndex = self.textureIndex === 0 ? 1 : 0;
            }
        })
        .coro(function* (self) {
            while (true) {
                yield interpvr(self.pivot).factor(factor.sine).to(Rng.vunit().scale(60).vround()).over(
                    Rng.intc(400, 800),
                );
                yield sleep(Rng.int(100, 300));
            }
        });
}
