import { Container, DisplayObject, Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interpvr } from "../../../lib/game-engine/routines/interp";
import { sleepf } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { distance } from "../../../lib/math/vector";
import { vnew } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";

const v0 = vnew();
const v1 = vnew();
const v2 = vnew();
const v3 = vnew();

export function objCellHuman() {
    const organelleObjs = [
        Sprite.from(Tx.Cell.Human.Nucleus)
            .mixin(mxnWiggle)
            .anchored(0.5, 0.5),
        Sprite.from(Tx.Cell.Human.Mitochondrion0)
            .mixin(mxnWiggle)
            .anchored(0.5, 0.5)
            .at(-20, Rng.intp() * 40),
        Sprite.from(Tx.Cell.Human.Mitochondrion1)
            .mixin(mxnWiggle)
            .anchored(0.5, 0.5)
            .at(20, Rng.intp() * 40),
    ];

    const gfx = new Graphics();

    function drawCellWall() {
        const centerPosition = v0.at(0, 0);
        for (const obj of organelleObjs) {
            centerPosition.add(obj);
        }

        centerPosition.scale(1 / organelleObjs.length);

        let maxRadius = 0;

        for (const obj of organelleObjs) {
            v1.at(obj).add(centerPosition, -1);

            maxRadius += v1.vlength + getRadius(obj);
        }

        const segmentsCount = 32;

        gfx
            .clear()
            .beginFill(0x8259b1)
            .lineStyle(3, 0xffffff);

        const previousPosition = v3;

        for (let i = 0; i <= segmentsCount; i++) {
            const r = (Math.PI * 2) * (i / segmentsCount);
            const linePosition = v2.at(Math.sin(r), Math.cos(r)).scale(maxRadius);
            let minDistance = Number.MAX_SAFE_INTEGER;
            for (const obj of organelleObjs) {
                const thisDistance = distance(obj, linePosition) - getRadius(obj);
                if (thisDistance < minDistance) {
                    minDistance = thisDistance;
                }
            }

            linePosition.vlength -= minDistance - 6;
            if (i % 2 === 1) {
                linePosition.add(previousPosition).scale(0.5);
            }
            gfx[i === 0 ? "moveTo" : "lineTo"](linePosition.x, linePosition.y);
            previousPosition.at(linePosition);
        }
    }

    return container(
        gfx,
        ...organelleObjs,
    )
        .coro(function* () {
            while (true) {
                drawCellWall();
                yield sleepf(Rng.intc(4, 6));
            }
        });
}

function getRadius(obj: Container) {
    return Math.max(obj.width, obj.height) / 2;
}

function mxnWiggle(obj: DisplayObject) {
    return obj
        .coro(function* (self) {
            const startPosition = vnew(self);
            const targetPosition = vnew();
            while (true) {
                targetPosition.at(startPosition).add(Rng.intc(-10, 10), Rng.intc(-10, 10));
                yield interpvr(self)
                    .factor(factor.sine)
                    .to(targetPosition)
                    .over(Rng.intc(500, 1000));
            }
        });
}
