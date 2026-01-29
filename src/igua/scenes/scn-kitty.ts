import { BLEND_MODES, Sprite } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Jukebox } from "../core/igua-audio";
import { renderer } from "../current-pixi-renderer";
import { Key, scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objIndexedSprite } from "../objects/utils/obj-indexed-sprite";

export function scnKitty() {
    const lvl = Lvl.Kitty();

    {
        lvl.PlanetGroup.mixin(mxnBoilPivot);
    }

    {
        objKitty().at(lvl.KittyStartMarker).show();
    }

    {
        scene.stage
            .coro(function* () {
                while (true) {
                    objUfo().show();
                    yield sleep(Rng.intc(5000, 9000));
                }
            })
            .coro(function* () {
                Jukebox.warm(Mzk.KittyOnTheRun);
                yield sleep(250);
                for (let i = 0; i < 3; i++) {
                    Sfx.SwordLand.rate(1 + i / 3).play();
                    yield sleep(1000);
                }
                Jukebox.play(Mzk.KittyOnTheRun);
            });
    }

    container(
        Sprite.from(Tx.Kitty.Overlay)
            .anchored(0.5, 0.5)
            .coro(function* (self) {
                self.blendMode = BLEND_MODES.SUBTRACT;
                while (true) {
                    yield sleep(Rng.intc(1000, 2000));
                    self.angle = Rng.int(2) * 180;
                    self.scale.x = Rng.intp();
                    self.scale.y = Rng.intp();
                }
            })
            .at(renderer.width / 2, renderer.height / 2),
    )
        .mixin(mxnBoilPivot)
        .zIndexed(1000)
        .show();
}

function objKitty() {
    let unit = 0;
    let nextRotation = 0;

    let jumpOffset = 0;
    let jumpSpeed = 0;

    let delta = 0;

    return objIndexedSprite(Tx.Kitty.Runnin.split({ count: 2 }))
        .pivoted(33, 62)
        .coro(function* (self) {
            while (true) {
                yield sleep(300);
                if (delta !== 0) {
                    self.textureIndex = (self.textureIndex + 1) % self.textures.length;
                    self.scale.x = Math.sign(delta);
                }
                self.rotation = nextRotation;
            }
        })
        .coro(function* (self) {
            const start = self.vcpy();
            const radius = 70;
            const origin = start.add(0, radius);

            self.step(() => {
                const run = Key.isDown("ControlLeft") ? 2 : 1;
                if (Key.isDown("ArrowLeft")) {
                    delta = approachLinear(delta, run, 0.05);
                }
                else if (Key.isDown("ArrowRight")) {
                    delta = approachLinear(delta, -run, 0.05);
                }
                else {
                    delta = approachLinear(delta, 0, 0.05);
                }
                if (Key.isDown("Space") && jumpOffset === 0) {
                    jumpSpeed = 4;
                }

                jumpOffset += jumpSpeed;
                jumpSpeed -= 0.3;
                if (jumpOffset <= 0) {
                    jumpOffset = 0;
                    jumpSpeed = 0;
                }

                unit += 0.005 * delta;

                nextRotation = (1 - Math.round(unit * 4) / 4) * Math.PI;
                const radians = unit * Math.PI;
                self.at(origin).add(vnew(Math.sin(radians), Math.cos(radians)), radius + jumpOffset);
            });
        });
}

function objUfo() {
    return Sprite.from(Tx.Kitty.Ufo)
        .mixin(mxnBoilPivot)
        .coro(function* (self) {
            const unit = Rng.vunit();
            self.at(unit.vcpy().scale(600).add(renderer.width / 2, renderer.height / 2).vround());
            const target = unit.vcpy().scale(-600).add(renderer.width / 2, renderer.height / 2).vround();
            yield interpvr(self).factor(factor.sine).to(target).over(Rng.intc(5000, 9000));
            self.destroy();
        });
}
