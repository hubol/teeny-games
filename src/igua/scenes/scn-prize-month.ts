import { DisplayObject, Graphics, LINE_CAP, Sprite, Texture } from "pixi.js";
import { Tx } from "../../assets/textures";
import { KeyCode } from "../../lib/browser/key-listener";
import { factor } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { nlerp } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { Vector, VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Key, scene } from "../globals";

const txsAngry = Tx.Rainbow.Angry.split({ count: 2 });
const txsSad = Tx.Rainbow.Sad.split({ count: 2 });

export function scnPrizeMonth() {
    const angryObj = objCloud(txsAngry)
        .mixin(mxnMove, "arrows")
        .at(100, 100)
        .show();

    const sadObj = objCloud(txsSad)
        .mixin(mxnMove, "wasd")
        .at(300, 200)
        .show();

    objRainbow(angryObj, sadObj)
        .zIndexed(-1)
        .show();
}

function mxnMove(obj: DisplayObject, keys: "arrows" | "wasd") {
    const upCode: KeyCode = keys === "arrows" ? "ArrowUp" : "KeyW";
    const downCode: KeyCode = keys === "arrows" ? "ArrowDown" : "KeyS";
    const leftCode: KeyCode = keys === "arrows" ? "ArrowLeft" : "KeyA";
    const rightCode: KeyCode = keys === "arrows" ? "ArrowRight" : "KeyD";

    const speed = vnew();

    return obj
        .step(self => {
            const v = vnew();
            if (Key.isDown(upCode)) {
                v.y -= 1;
            }
            if (Key.isDown(leftCode)) {
                v.x -= 1;
            }
            if (Key.isDown(downCode)) {
                v.y += 1;
            }
            if (Key.isDown(rightCode)) {
                v.x += 1;
            }
            if (!v.isZero) {
                v.normalize();
            }

            speed.moveTowards(v.scale(3), v.isZero ? 0.05 : 0.3);
            self.add(speed);
        });
}

const rainbowTints = [
    0xEA3E61,
    0xE87758,
    0xE8C958,
    0x7CC958,
    0x497FC6,
    0xA77FE1,
];

function objRainbow(left: VectorSimple, right: VectorSimple) {
    return new Graphics()
        .step(gfx => {
            const peak = {
                x: nlerp(left.x, right.x, 0.5),
                y: nlerp(Math.min(left.y, right.y) - 25, Math.max(left.y, right.y) - 120, 0.5),
            };

            gfx.clear();

            for (let i = 0; i < rainbowTints.length; i++) {
                const tint = rainbowTints[i];
                const f = i / (rainbowTints.length - 1);
                const x = Math.round(nlerp(-20, 20, f));
                gfx
                    .lineStyle({ color: tint, width: 8, cap: LINE_CAP.ROUND });
                lerpLine(gfx, [peak.x, peak.y + i * 8], [left.x + x, left.y], 16);
                lerpLine(gfx, [peak.x, peak.y + i * 8], [right.x + x, right.y], 16);
            }
        });
}

function lerpLine(gfx: Graphics, from: VectorSimple, to: VectorSimple, steps: Integer) {
    gfx.moveTo(from.x, from.y);
    for (let i = 0; i <= steps; i++) {
        const f0 = i / steps;
        const f = factor.sine(f0);
        const f2 = nlerp(f0, (Math.sin(f0 * Math.PI * 4) + 1) / 2, f);
        gfx.lineTo(nlerp(from.x, to.x, f), nlerp(from.y, to.y, f2));
    }
}

function objCloud(txs: Texture[]) {
    return container(
        ...txs.map(tx =>
            Sprite.from(tx)
                .mixin(mxnWiggle)
                .anchored(0.5, 0.5)
        ),
    );
}

function mxnWiggle(obj: DisplayObject) {
    let time0 = 0;
    let factor0 = 0;
    let time1 = 0;
    let factor1 = 0;

    return obj
        .step(self =>
            self.pivot.at(
                Math.sin(scene.ticker.ticks * factor0 * 0.2 + time0) * 3,
                Math.cos(scene.ticker.ticks * factor1 * 0.2 + time1) * 3,
            )
        )
        .coro(function* () {
            while (true) {
                time0 = Rng.float(6.28);
                factor0 = Rng.float(-2, 2);
                time1 = Rng.float(6.28);
                factor1 = Rng.float(-2, 2);
                yield sleep(Rng.intc(500, 1500));
            }
        });
}
