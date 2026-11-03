import { Container, DisplayObject, Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { factor, interp, interpv, interpvr } from "../../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../../lib/game-engine/routines/sleep";
import { Rng } from "../../../lib/math/rng";
import { distance, vlerp } from "../../../lib/math/vector";
import { VectorSimple, vnew } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";
import { scene } from "../../globals";

const v0 = vnew();
const v1 = vnew();
const v2 = vnew();
const v3 = vnew();

const faceTxs = Tx.Cell.Human.Face.split({ width: 38 });

export function objCellHuman() {
    const state = {
        force: 0,
        fxSpeed: vnew(),
    };

    const nucleusObj = Sprite.from(Tx.Cell.Human.Nucleus);
    const organelleObjs = [
        Sprite.from(Tx.Cell.Human.Mitochondrion0)
            .mixin(mxnForceWiggle, -0.3, state)
            .anchored(0.5, 0.5)
            .angled(Rng.int(4) * 90),
        Sprite.from(Tx.Cell.Human.Mitochondrion1)
            .mixin(mxnForceWiggle, -0.4, state)
            .anchored(0.5, 0.5)
            .angled(Rng.int(4) * 90),
        nucleusObj
            .mixin(mxnForceWiggle, 1, state)
            .angled(Rng.int(4) * 90)
            .anchored(0.5, 0.5),
    ];

    organelleObjs[0]
        .position
        .at(-20, Rng.intc(-40, 40))
        .normalize()
        .scale(Rng.int(35, 50));

    organelleObjs[1]
        .position
        .at(20, Rng.intc(-40, 40))
        .normalize()
        .scale(Rng.int(35, 50));

    const gfx = new Graphics();

    const api = {
        targetPosition: vnew(),
    };

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
            const r = (Math.PI * 2) * (i / segmentsCount) + scene.ticker.ticks;
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
        .merge({ objCellHuman: api })
        .coro(function* () {
            while (true) {
                drawCellWall();
                yield sleepf(Rng.intc(4, 6));
            }
        })
        .coro(function* () {
            while (true) {
                const ms = Rng.intc(900, 1200);
                yield interp(state, "force")
                    .factor(factor.sine)
                    .to(1)
                    .over(ms);
                yield sleep(ms / 10);
                yield interp(state, "force")
                    .factor(factor.sine)
                    .to(0)
                    .over(ms / 3);
            }
        })
        .coro(function* (self) {
            state.fxSpeed.at(api.targetPosition).add(self, -1).normalize().scale(35);
            if (Rng.bool()) {
                Sprite.from(Rng.item(faceTxs))
                    .anchored(0.5, 0.5)
                    .at(nucleusObj)
                    .step(self => self.moveTowards(nucleusObj, 0.6))
                    .show(self);
            }
        })
        .step(self => self.moveTowards(api.targetPosition, (1 - state.force) * 2 + 0.1));
}

function getRadius(obj: Container) {
    return Math.max(obj.width, obj.height) / 2;
}

function mxnForceWiggle(obj: DisplayObject, factor: number, state: { force: number; fxSpeed: VectorSimple }) {
    const startPosition = vnew();
    const endPosition = vnew();
    const position = vnew();
    return obj
        .coro(function* (self) {
            startPosition.at(self);
            while (true) {
                yield () => state.force < 0.1;
                endPosition
                    .at(state.fxSpeed)
                    .scale(factor)
                    .add(Rng.intc(-5, 5), Rng.intc(5, 5));
                yield () => state.force > 0.1;
            }
        })
        .step(self => self.at(vlerp(position.at(startPosition), endPosition, (1 - state.force) * Math.abs(factor))));
}

// function mxnWiggle(obj: DisplayObject) {
//     return obj
//         .coro(function* (self) {
//             const startPosition = vnew(self);
//             const targetPosition = vnew();
//             while (true) {
//                 targetPosition.at(startPosition).add(Rng.intc(-10, 10), Rng.intc(-10, 10));
//                 yield interpvr(self)
//                     .factor(factor.sine)
//                     .to(targetPosition)
//                     .over(Rng.intc(500, 1000));
//             }
//         });
// }
