import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { Sfx } from "../../../assets/sounds";
import { Tx } from "../../../assets/textures";
import { Instances } from "../../../lib/game-engine/instances";
import { Coro } from "../../../lib/game-engine/routines/coro";
import { holdf } from "../../../lib/game-engine/routines/hold";
import { interp, interpvr } from "../../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../../lib/game-engine/routines/sleep";
import { cyclic } from "../../../lib/math/number";
import { Integer } from "../../../lib/math/number-alias-types";
import { Rng } from "../../../lib/math/rng";
import { vnew } from "../../../lib/math/vector-type";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { range } from "../../../lib/range";
import { Null } from "../../../lib/types/null";
import { renderer } from "../../current-pixi-renderer";
import { DataToppings } from "../../data/data-toppings";
import { PizzaTopping } from "../../data/pizza-topping";
import { scene } from "../../globals";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";
import { objAnnouncer } from "../obj-announcer";
import { objPizza } from "../obj-pizza";
import { objTopping } from "../obj-topping";

const balloonPrizeToppingIds = Rng.shuffle(
    new Array<DataToppings.Id>("BananaPepper", "BlackOlive", "Spinach"),
);
let balloonPrizeIndex = 0;

export function objVisitorBalloon() {
    const balloonObj = objPuppetBalloon();
    return balloonObj
        .step(self => {
            if (self.objPuppetBalloon.isStringSnapped) {
                return;
            }

            const t = scene.ticker.ticks / 45 * Math.PI;
            self.objPuppetBalloon.balloonOffset.y = Math.sin(t) * 3;
            self.objPuppetBalloon.boxOffset.y = Math.sin(t + 1) * 2;

            self.x += 1;
            if (self.x >= renderer.width) {
                self.destroy();
            }
        })
        .coro(function* (self) {
            let isPressed = false;
            self.mixin(mxnPointerPress, 998)
                .handles("mxnPointerPress:pressed", () => isPressed = true);

            yield () => isPressed;

            self.play(Sfx.Effects.Snap.rate(0.9, 1.1));

            self.objPuppetBalloon.isStringSnapped = true;
            yield sleep(100);

            self.play(Sfx.Effects.Descend);

            yield* Coro.all([
                interpvr(self.objPuppetBalloon.balloonOffset).steps(8).to(0, -400).over(800),
                Coro.chain([
                    interpvr(self.objPuppetBalloon.boxOffset).to(0, 170).over(500),
                    () => (self.play(Sfx.Effects.Land.rate(0.9, 1.1)), true),
                ]),
            ]);

            self.objPuppetBalloon.isBoxOpen = true;

            const prizeToppingId = balloonPrizeToppingIds[balloonPrizeIndex++ % balloonPrizeToppingIds.length];
            const prizeObj = objBalloonPrize(10, prizeToppingId)
                .at(self.objPuppetBalloon.openedBoxWorldPosition)
                .show();

            yield () => prizeObj.destroyed;

            self.play(Sfx.Effects.Depart.rate(0.9, 1.1));
            yield interp(self, "alpha").steps(3).to(0.5).over(500);

            self.destroy();
        });
}

function objPuppetBalloon() {
    const [
        txBox,
        txBoxOpened,
        txStringTied,
        txStringSnapBalloon,
        txStringSnapBox,
        txStringSnapped,
        txBalloonShape,
        txBalloonHighlights,
        txBalloonDemo,
        txFace,
        txTinyString,
    ] = Tx.Characters.Balloon.Layers.split({ width: 124 });

    const api = {
        isBoxOpen: false,
        isStringSnapped: false,
        boxOffset: vnew(),
        balloonOffset: vnew(),
        get openedBoxWorldPosition() {
            return openBoxObj.getWorldCenter();
        },
    };

    const collisionObjs = [
        new Graphics().beginFill(0xff0000).drawRect(10, 1, 105, 115),
        new Graphics().beginFill(0xff0000).drawRect(57, 113, 12, 127),
        new Graphics().beginFill(0xff0000).drawRect(12, 227, 104, 83),
    ]
        .map(obj => obj.invisible());

    const openBoxObj = new Graphics().beginFill(0xffff00).drawRect(58, 235, 9, 9);

    return container(
        container(
            Sprite.from(txBox),
            Sprite.from(txBoxOpened).step(self => self.visible = api.isBoxOpen),
            Sprite.from(txStringSnapBox)
                .invisible()
                .coro(function* (self) {
                    yield () => api.isStringSnapped;
                    self.visible = true;
                    yield () => api.boxOffset.y > 0;
                    let previousBoxFallOffset = api.boxOffset.y;
                    yield holdf(() => {
                        if (api.boxOffset.y === previousBoxFallOffset) {
                            return true;
                        }

                        previousBoxFallOffset = api.boxOffset.y;
                        return false;
                    }, 20);
                    self.destroy();
                }),
            collisionObjs[2],
            openBoxObj.invisible(),
        )
            .step(self => self.at(api.boxOffset)),
        container(
            Sprite.from(txStringTied)
                .coro(function* (self) {
                    yield () => api.isStringSnapped;
                    self.texture = txStringSnapBalloon;
                    yield sleep(333);
                    self.texture = txStringSnapped;
                }),
            Sprite.from(txBalloonShape)
                .tinted(0xFF8492),
            Sprite.from(txBalloonHighlights)
                .tinted(0xFFCD92),
            Sprite.from(txFace)
                .mixin(mxnFxBoil, "pivot"),
            Sprite.from(txTinyString),
            collisionObjs[0],
            collisionObjs[1],
        )
            .step(self => self.at(api.balloonOffset)),
    )
        .collisionShape(CollisionShape.DisplayObjects, collisionObjs)
        .scaled(2, 2)
        .merge({ objPuppetBalloon: api });
}

function objBalloonPrize(count: Integer, toppingId: DataToppings.Id) {
    return container()
        .coro(function* (self) {
            const pizzaObj = Instances(objPizza)[0];

            const toppingPositions = getRandomSequenceData()
                .map(data => ({
                    sequenceDegrees: DataToppings.sequenceDegrees16[data.sequenceIndex],
                    trackIndex: data.trackIndex,
                    topping: PizzaTopping.create(toppingId),
                }))
                .flatMap(data => {
                    const position = pizzaObj.objPizza.getSequencedWorldPosition.fromDegreesTrackIndex(
                        data.sequenceDegrees,
                        data.trackIndex,
                        data.topping,
                    );

                    if (!position) {
                        return [];
                    }

                    return [
                        {
                            position: vnew(position),
                            topping: data.topping,
                        },
                    ];
                });

            const prizePosition = vnew(self.getWorldPosition());

            let lastToppingObj = Null<DisplayObject>();

            for (let i = 0; i < toppingPositions.length; i++) {
                const { position, topping } = toppingPositions[i];
                const pointer: objTopping.Pointer = {
                    down: true,
                    x: prizePosition.x + Rng.int(-50, 50),
                    y: prizePosition.y,
                };

                self.play(Sfx.Effects.SummonPrize.rate(0.5, 2));

                const toppingObj = objTopping(topping, pointer, "tool")
                    .show();

                if (i === 0) {
                    const sfx = Sfx.Dialog.Toppings[toppingId];
                    yield objAnnouncer.singleton.announce(sfx);
                }

                toppingObj
                    .coro(function* () {
                        yield sleep(Rng.int(100, 300));
                        yield interpvr(pointer).to(position.x, position.y).over(Rng.int(700, 800));
                        pointer.down = false;
                    });

                lastToppingObj = toppingObj;

                yield sleepf(Math.max(5, 25 - i * 2));
            }

            if (lastToppingObj) {
                yield () => lastToppingObj!.destroyed;
            }

            self.destroy();
        });
}

function getRandomSequenceData() {
    const sequenceIndicesCount = DataToppings.sequenceDegrees16.length;
    const tracksCount = objPizza.consts.tracksCount;
    const usedTrackIndexSequenceIndices: Record<Integer, Set<Integer>> = {};

    const result = new Array<{ trackIndex: Integer; sequenceIndex: Integer }>();

    function push(trackIndex: Integer, sequenceIndex: Integer) {
        if (usedTrackIndexSequenceIndices[trackIndex]?.has(sequenceIndex)) {
            return;
        }

        usedTrackIndexSequenceIndices[trackIndex] ??= new Set();
        usedTrackIndexSequenceIndices[trackIndex].add(sequenceIndex);
        result.push({ trackIndex, sequenceIndex });
    }

    const sourcePitchData = range(Rng.int(2, 5)).map(() => Rng.int(tracksCount));
    const startingSequenceIndex = Rng.int(sequenceIndicesCount);

    while (result.length < 8) {
        const offset = Rng.intc(-1, 1);
        for (const pitch of sourcePitchData) {
            const trackIndex = cyclic(pitch + offset, 0, tracksCount);
            const sequenceIndex = (startingSequenceIndex + result.length * 2) % sequenceIndicesCount;
            push(trackIndex, sequenceIndex);
        }
    }

    return result;
}
