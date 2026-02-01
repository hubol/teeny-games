import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { SoundInstance } from "../../lib/game-engine/audio/sound";
import { Instances } from "../../lib/game-engine/instances";
import { interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { distance } from "../../lib/math/vector";
import { vnew } from "../../lib/math/vector-type";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { Null } from "../../lib/types/null";
import { renderer } from "../current-pixi-renderer";
import { mxnArrowKeys } from "../mixins/mxn-arrow-keys";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnClampPosition } from "../mixins/mxn-clamp-position";
import { mxnCollectible } from "../mixins/mxn-collectible";
import { mxnMoved } from "../mixins/mxn-moved";
import { objLibraryBook } from "../objects/obj-library-book";
import { objLibrarySpawn } from "../objects/obj-library-spawn";

export function scnLibrary() {
    Sprite.from(Tx.Library.BackgroundBarnes)
        .mixin(mxnBoilDisplacement, { rate: 0.0125, scale: 2 })
        .show();

    const minigame = {
        isRunning: false,
        roundsCount: 0,
        booksCollectedCount: 0,
        fecesCollectedCount: 0,
    };

    {
        const roundSpawns = [
            ...range(10).map(() => "feces" as const),
            ...range(29).map(() => "book" as const),
        ];

        Rng.shuffle(roundSpawns);

        function generatePosition() {
            return vnew(Rng.intc(20, renderer.width - 20), Rng.intc(20, renderer.height - 20));
        }

        function objLibraryBookSpawn(mode: "default" | "disappears_fast") {
            return objLibrarySpawn(
                mode,
                objLibraryBook()
                    .mixin(mxnCollectible)
                    .handles(
                        "collectible:collect",
                        (self) => {
                            minigame.booksCollectedCount += 1;
                            self.play(Sfx.BookCollect.rate(1, 1.1));
                            cartObj.objCart.contentObjs.push(objLibraryBook(self.objLibraryBook.seed));
                        },
                    ),
            )
                .at(generatePosition());
        }

        let fecesWarningSoundInstance = Null<SoundInstance>();

        function objFecesSpawn() {
            return objLibrarySpawn(
                "default",
                Sprite.from(Tx.Library.Feces)
                    .anchored(0.5, 0.5)
                    .mixin(mxnCollectible)
                    .handles(
                        "collectible:collect",
                        () => {
                            minigame.fecesCollectedCount += 1;
                            fecesWarningSoundInstance?.stop();
                            fecesWarningSoundInstance = Sfx.FecesWarning.playInstance();
                            cartObj.objCart.contentObjs.push(
                                Sprite.from(Tx.Library.Feces)
                                    .anchored(0.5, 0.5),
                            );
                        },
                    ),
            )
                .at(generatePosition());
        }

        container()
            .coro(function* (self) {
                const debugObj = objText.Medium("", { tint: 0x000000 })
                    .zIndexed(9999)
                    .invisible()
                    .show();

                while (roundSpawns.length > 0) {
                    yield () => minigame.isRunning;

                    const expectedPlayerToReturnToCenter = Rng.bool();

                    if (expectedPlayerToReturnToCenter) {
                        yield sleep(800);
                    }

                    Sfx.LibraryRoundAdvance.rate(0.95, 1.05).play();

                    const cartCenterPosition = cartObj.objCart.centerPosition;
                    const spawnFeces = minigame.booksCollectedCount > 0 && roundSpawns.shift() === "feces";
                    const primaryBookObj = (spawnFeces ? objFecesSpawn() : objLibraryBookSpawn("default")).show(self);

                    if (!expectedPlayerToReturnToCenter) {
                        while (distance(primaryBookObj, cartCenterPosition) > 310) {
                            primaryBookObj.at(generatePosition());
                        }
                    }

                    debugObj.text = "Leg 1 distance: " + Math.round(distance(primaryBookObj, cartCenterPosition));

                    if (Rng.float() < 0.33 && minigame.booksCollectedCount > 0 && roundSpawns[0] === "book") {
                        roundSpawns.shift();
                        const secondaryBookObj = objLibraryBookSpawn("disappears_fast").show(self);

                        const firstStopDistance = distance(primaryBookObj, cartCenterPosition);
                        let secondStopDistance = 0;
                        // Hack because I am stupid
                        let attempts = 0;
                        const maxAttempts = 20;
                        while (
                            (secondStopDistance = distance(secondaryBookObj, primaryBookObj),
                                (
                                    (firstStopDistance + secondStopDistance) > 380
                                    || secondStopDistance < 52
                                    || secondStopDistance > 200
                                ) && attempts < maxAttempts)
                        ) {
                            secondaryBookObj.at(generatePosition());
                            attempts++;
                        }

                        debugObj.text += "\nLeg 2 distance: "
                            + Math.round(distance(primaryBookObj, secondaryBookObj));

                        if (attempts >= maxAttempts) {
                            secondaryBookObj.destroy();
                        }
                    }

                    let interpPositionChance = 0;
                    if (minigame.roundsCount >= 10) {
                        interpPositionChance = Math.min(80, 30 + (5 * (minigame.roundsCount - 10)));
                    }

                    for (const child of self.children) {
                        if (Rng.float(100) <= interpPositionChance) {
                            child
                                .coro(function* () {
                                    const target = child.vcpy();
                                    child.at(generatePosition());
                                    yield interpvr(child).to(target).over(1000);
                                });
                        }
                    }

                    yield () => self.children.length === 0;
                    minigame.roundsCount += 1;
                }
            })
            .show();
    }

    const cartObj = objCart().at(75, 56);
    const lottieObj = objLottie()
        .at(-100, 0)
        .mixin(mxnMoved)
        .handles("moved", (self) => self.objLottie.pedometer += 0.1);

    const lottieAndCartObj = container(cartObj, lottieObj)
        .mixin(mxnClampPosition, { xmin: -70, xmax: 350, ymin: -40, ymax: 190 })
        .coro(function* () {
            yield interpvr(lottieObj).to(0, 0).over(1000);
            yield interp(lottieObj.objLottie, "armExtendedUnit").to(1).over(300);
            lottieAndCartObj.mixin(
                mxnArrowKeys,
                {
                    acceleration: 0.2,
                    deceleration: 0.1,
                    max: 3,
                },
            );
            cartObj
                .step(self => {
                    const collectibleObj = self.collidesOne(Instances(mxnCollectible));
                    if (collectibleObj) {
                        collectibleObj.dispatch("collectible:collect");
                        collectibleObj.destroy();
                    }
                });
            minigame.isRunning = true;
        })
        .at(20, 20)
        .zIndexed(999)
        .show();
}

const txs = {
    lottie: Tx.Lottie.Push.split({ width: 84 }),
    cart: Tx.Library.Cart.split({ count: 3 }),
};

function objLottie() {
    const [txBody, txLegs0, txLegs1, txScarf, txFace, txArm] = txs.lottie;

    const legsObj = Sprite.from(txLegs0);
    const armMaskObj = new Graphics().beginFill(0xff0000).drawRect(36, 0, 51, 89);
    const armObj = Sprite.from(txArm).masked(armMaskObj);
    const scarfObj = Sprite.from(txScarf);

    const api = {
        pedometer: 0,
        armExtendedUnit: 0,
    };

    return container(
        container(
            Sprite.from(txBody),
            legsObj,
            scarfObj,
            Sprite.from(txFace).mixin(mxnBoilPivot),
            armObj,
            armMaskObj,
        )
            .step(self => {
                const p = Math.floor(api.pedometer) % 2 === 0;
                const previousLegsTexture = legsObj.texture;
                legsObj.texture = p ? txLegs0 : txLegs1;
                if (previousLegsTexture !== legsObj.texture) {
                    const sfx = legsObj.texture === txLegs0 ? Sfx.LottieStep0 : Sfx.LottieStep1;
                    self.play(sfx.rate(0.7, 0.8));
                }
                self.pivot.y = p ? 1 : 0;
                armObj.pivot.y = self.pivot.y;
                scarfObj.pivot.x = -self.pivot.y;
                armObj.position.at(-30, 24).scale(1 - api.armExtendedUnit).vround();
            }),
    )
        .merge({ objLottie: api });
}

function objCart() {
    const [txCart, txWheel0, txWheel1] = txs.cart;
    const txsCart = txCart.split({ count: 4 });
    const maskObj = new Graphics().beginFill(0xff0000).drawRect(10, 8, 66, 32);

    const centerPosition = vnew();

    const api = {
        contentObjs: new Array<DisplayObject>(),
        get centerPosition() {
            return centerPosition.at(maskObj.getWorldCenter());
        },
    };

    const contentsObj = container()
        .step(self => {
            if (api.contentObjs.length === self.children.length) {
                return;
            }

            while (api.contentObjs.length > 5) {
                api.contentObjs.shift()?.destroy();
            }

            for (let i = 0; i < 5; i++) {
                const contentObj = api.contentObjs[i];
                if (!contentObj) {
                    break;
                }
                if (!contentObj.parent) {
                    contentObj.y = -20;
                    contentObj
                        .step(self => {
                            if (self.y < 0) {
                                self.y += 1;
                            }
                        })
                        .show(self);
                }
                contentObj.x = i * 10;
            }
        })
        .step(self => {
            if (self.children.length === 4) {
                self.x = approachLinear(self.x, 28, 1);
            }
            else if (self.children.length >= 5) {
                self.x = approachLinear(self.x, 18, 1);
            }
        })
        .at(38, 20);

    const contentsMaskObj = new Graphics()
        .beginFill(0xff0000)
        .drawRect(24, -200, 47, 229);

    return container(
        contentsMaskObj,
        contentsObj.masked(contentsMaskObj),
        ...txsCart.map((tx, i) =>
            Sprite.from(tx)
                .coro(function* (self) {
                    while (true) {
                        self.pivot.y = Rng.intc(1);
                        yield sleep(150);
                    }
                })
                .at(i * tx.width, 0)
        ),
        ...[txWheel0, txWheel1].map(tx => Sprite.from(tx).mixin(mxnBoilPivot)),
        maskObj.invisible(),
    )
        .merge({ objCart: api })
        .collisionShape(CollisionShape.DisplayObjects, [maskObj]);
}
