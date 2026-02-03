import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { EscapeTickerAndExecute } from "../../lib/game-engine/asshat-ticker";
import { Instances } from "../../lib/game-engine/instances";
import { Logger } from "../../lib/game-engine/logger";
import { Coro } from "../../lib/game-engine/routines/coro";
import { factor, interp, interpv, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear, nlerp } from "../../lib/math/number";
import { Integer, Unit } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { MapRgbFilter } from "../../lib/pixi/filters/map-rgb-filter";
import { Key, scene, sceneStack } from "../globals";
import { lottieProgress } from "../lottie-progress";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objLibraryBook } from "../objects/obj-library-book";
import { scnTacoBell } from "./scn-taco-bell";

export function scnReading() {
    scene.style.backgroundTint = 0x404040;

    Sprite.from(Tx.Reading.Background)
        .zIndexed(-999)
        .show();

    const minigame = {
        remainingDesirableWordsCount: 25,
    };

    const readingLottieObj = objReadingLottie()
        .zIndexed(999)
        .at(400, 280)
        .show();

    container()
        .coro(function* () {
            yield interpvr(readingLottieObj).factor(factor.sine).to(400, 180).over(500);
            yield sleep(500);

            let iteration = 0;
            while (minigame.remainingDesirableWordsCount > 0) {
                const seed = lottieProgress.libraryBookSeeds[(iteration++) % lottieProgress.libraryBookSeeds.length]
                    ?? Rng.intc(9_000_000, 999_000_000);

                readingLottieObj.objReadingLottie.book.seed = seed;
                readingLottieObj.objReadingLottie.book.unit = 0;

                Sfx.Reading.BookSmallIn.rate(0.975, 1.025).play();
                yield interp(readingLottieObj.objReadingLottie.book, "unit").to(1).over(1000);

                if (iteration === 1) {
                    const instructionsObj = Sprite.from(Tx.Reading.Instructions)
                        .anchored(0.5, 0.5)
                        .at(250, 420)
                        .show();

                    yield* Coro.all([
                        interpv(instructionsObj).factor(factor.sine).to(250, 140).over(1000),
                    ]);

                    const instructionsSoundInstance = Sfx.Reading.Instructions.playInstance();
                    yield () => instructionsSoundInstance.ended;
                    instructionsObj.destroy();
                }

                const wordSpaceDifficulty = Math.min(1, iteration * 0.2);

                let pageTextObj = objPageText(Math.min(4, minigame.remainingDesirableWordsCount), wordSpaceDifficulty);
                if (minigame.remainingDesirableWordsCount < 4) {
                    for (let i = 0; i < 4; i++) {
                        if (pageTextObj.objPageText.desirableWordsCount === minigame.remainingDesirableWordsCount) {
                            break;
                        }
                        pageTextObj.destroy();
                        pageTextObj = objPageText(minigame.remainingDesirableWordsCount, wordSpaceDifficulty);
                    }
                }

                const scanSpeedDifficulty = Math.max(0, Math.min(1, (iteration - 1) * 0.3));

                const bookObj = objBook(pageTextObj, seed, scanSpeedDifficulty).at(-340, 0).show();
                Sfx.Reading.BookLargeIn.rate(0.975, 1.025).play();
                yield interpvr(bookObj).factor(factor.sine).to(0, 0).over(500);
                Sfx.Reading.CursorIn.play();
                yield interp(bookObj.objBook, "scanReadyUnit").to(1).over(1000);
                const pupilsControlObj = container()
                    .step(() => {
                        readingLottieObj.objReadingLottie.dilated = bookObj.objBook.isHighlighting;
                        readingLottieObj.objReadingLottie.looking.x = nlerp(1, -1, bookObj.objBook.scanUnit);
                        readingLottieObj.objReadingLottie.looking.y = approachLinear(
                            readingLottieObj.objReadingLottie.looking.y,
                            1,
                            0.05,
                        );
                    })
                    .show();

                yield () => bookObj.objBook.isComplete;
                pupilsControlObj.destroy();
                readingLottieObj.objReadingLottie.dilated = false;
                Sfx.Reading.BookLargeOut.rate(0.975, 1.025).play();
                yield interpvr(bookObj).factor(factor.sine).to(-400, 0).over(500);
                readingLottieObj.objReadingLottie.looking.x = 0;
                readingLottieObj.objReadingLottie.looking.y = 0;
                minigame.remainingDesirableWordsCount -= bookObj.objBook.desirableWordsCount;
                bookObj.destroy();
                Sfx.Reading.BookSmallOut.rate(0.975, 1.025).play();
                yield interp(readingLottieObj.objReadingLottie.book, "unit").steps(6).to(0).over(500);
            }

            yield sleep(500);
            yield interpvr(readingLottieObj).factor(factor.sine).to(400, 280).over(500);
            throw new EscapeTickerAndExecute(() => sceneStack.replace(scnTacoBell, { useGameplay: false }));
        })
        .show();
}

function objReadingLottie() {
    const [txBody, txFace, txPupils, txBook0, txBook1, txBook2, txPupilsDilated] = Tx.Reading.Lottie.split({
        width: 100,
    });

    const detailedBookObj = container().at(54, 0);
    const bookObj = Sprite.from(txBook0);

    const api = {
        looking: vnew(),
        book: {
            set seed(value: Integer) {
                detailedBookObj.removeAllChildren();
                const libraryBookObj = objLibraryBook(value).show(detailedBookObj);
                bookObj.filters?.[0]?.destroy();
                bookObj.filters = [new MapRgbFilter(libraryBookObj.objLibraryBook.bindingColor)];
            },
            unit: 0,
        },
        dilated: false,
    };

    return container(
        Sprite.from(txBody),
        Sprite.from(txFace).mixin(mxnBoilPivot),
        Sprite.from(txPupils)
            .step(self => {
                self.position.at(api.looking).scale(4).vround();
                self.texture = api.dilated ? txPupilsDilated : txPupils;
            }),
        detailedBookObj,
        bookObj,
    )
        .step(() => {
            const unit = api.book.unit;

            if (unit === 0) {
                detailedBookObj.visible = false;
                bookObj.visible = false;
                return;
            }

            detailedBookObj.visible = unit < 0.3;
            bookObj.visible = !detailedBookObj.visible;

            if (unit < 0.3) {
                detailedBookObj.y = nlerp(-10, 26, unit / 0.3);
            }
            else if (unit < 0.6) {
                bookObj.y = nlerp(0, 30, (unit - 0.3) / 0.3);
                bookObj.texture = txBook0;
            }
            else if (unit < 1) {
                bookObj.y = nlerp(0, 10, (unit - 0.6) / 0.4);
                bookObj.texture = txBook1;
            }
            else {
                bookObj.at(0, 0);
                bookObj.texture = txBook2;
            }
        })
        .merge({ objReadingLottie: api });
}

const consts = {
    desirableWords: new Set(["her", "she", "girls", "girl", "women", "woman", "female", "feminine", "femininity"]),
    sentences: [
        "zhe fell down",
        "zhe touched the pieces",
        "zhe looked exasperated",
        "zhe tried different food",
        "zhe saw her world",
        "zhe went away",
        "zhe held her hand",
        "zhe became unwell",
        "zhe cried",
        "zhe brushed her hair",
        "zhe felt alone",
    ],
    page: {
        maxWidth: 350,
        maxHeight: 225,
        lineHeight: 32,
        space: {
            easy: 34,
            hard: 24,
        },
    },
};

function objBook(pageTextObj: ObjPageText, seed: Integer, difficulty: Unit) {
    const tinyBookObj = objLibraryBook(seed);

    const desirableWordsCount = pageTextObj
        .findIs(objWord)
        .reduce((sum, wordObj) => wordObj.objWord.isDesirable ? (sum + 1) : sum, 0);

    const api = {
        desirableWordsCount,
        scanReadyUnit: 0,
        isComplete: false,
        scanUnit: 0,
        isHighlighting: false,
    };

    let isCursorCompleted = false;

    return container(
        Sprite.from(Tx.Reading.Book).filtered(new MapRgbFilter(tinyBookObj.objLibraryBook.bindingColor)),
        container(
            pageTextObj.zIndexed(1),
            new Graphics()
                .lineStyle(3, 0x000000, 1)
                .moveTo(0, -3)
                .lineTo(0, 29)
                .merge({ objCursor: { isOnLine: true } })
                .step(self => {
                    self.scale.y = api.scanReadyUnit;
                })
                .coro(function* (self) {
                    const padding = 20;
                    self.at(-padding, 0);

                    yield () => api.scanReadyUnit >= 1;

                    const count = pageTextObj.objPageText.lineWidths.length;
                    for (let i = 0; i < count; i++) {
                        self.play(Sfx.Reading.CursorLineStart.rate(0.95, 1.05));
                        const width = pageTextObj.objPageText.lineWidths[i];
                        const distance = width + padding + 6;
                        yield interpvr(self).translate(distance, 0).over(distance * nlerp(4, 3.4, difficulty));
                        if (i + 1 < count) {
                            self.objCursor.isOnLine = false;
                            self.play(Sfx.Reading.CursorLineEnd.rate(0.95, 1.05));
                            yield interpvr(self)
                                .factor(factor.sine)
                                .to(-padding, (i + 1) * consts.page.lineHeight)
                                .over(nlerp(500, 300, difficulty));
                            self.objCursor.isOnLine = true;
                        }
                    }
                    isCursorCompleted = true;
                })
                .step(self => {
                    api.scanUnit = Math.max(0, Math.min(1, self.x / consts.page.maxWidth));
                })
                .coro(function* (self) {
                    while (!isCursorCompleted) {
                        yield () => Key.isDown("Space") && self.objCursor.isOnLine && api.scanReadyUnit >= 1;
                        api.isHighlighting = true;
                        self.play(Sfx.Reading.HighlightStart.rate(0.95, 1.05));
                        const highlightSoundInstance = Sfx.Reading.Highlight.rate(0.95, 1.05).playInstance();
                        let applyScale = true;
                        const highlightObj = objHighlight()
                            .step(() => {
                                if (applyScale) {
                                    highlightObj.scale.x = self.x - highlightObj.x;
                                }
                            })
                            .at(self)
                            .show(self.parent);

                        yield () => Key.isUp("Space") || !self.objCursor.isOnLine;
                        api.isHighlighting = false;
                        highlightSoundInstance.stop();
                        applyScale = false;
                    }
                })
                .zIndexed(9),
        )
            .coro(function* (self) {
                const scoreTxs = {
                    bad: Tx.Reading.ScoreBad,
                    ok: Tx.Reading.ScoreOk,
                    good: Tx.Reading.ScoreGood,
                };

                const scoreSfxs = {
                    bad: Sfx.Reading.ScoreBad,
                    ok: Sfx.Reading.ScoreOk,
                    good: Sfx.Reading.ScoreGood,
                };

                yield () => isCursorCompleted;
                for (const wordObj of Instances(objWord)) {
                    let score: "none" | "bad" | "ok" | "good" = "none";

                    if (wordObj.objWord.isDesirable) {
                        const collidedHighlightObjs = wordObj.collidesAll(Instances(objHighlight));
                        if (collidedHighlightObjs.length === 0) {
                            score = "bad";
                        }
                        else if (collidedHighlightObjs.length > 1) {
                            score = "ok";
                        }
                        else {
                            const highlightObj = collidedHighlightObjs[0];
                            const collidedWordObjs = highlightObj.collidesAll(Instances(objWord));
                            if (collidedWordObjs.length > 1) {
                                score = "ok";
                            }
                            else if (
                                highlightObj.x <= wordObj.x + 4
                                && (highlightObj.x + highlightObj.width) >= (wordObj.x + wordObj.width - 4)
                            ) {
                                score = "good";
                            }
                            else {
                                score = "ok";
                            }
                        }
                    }
                    else if (wordObj.collidesOne(Instances(objHighlight))) {
                        score = "bad";
                    }

                    if (score === "none") {
                        continue;
                    }

                    if (score === "bad") {
                        lottieProgress.score.reading.badWords += 1;
                    }
                    else if (score === "good") {
                        lottieProgress.score.reading.goodWords += 1;
                    }
                    else if (score === "ok") {
                        lottieProgress.score.reading.okWords += 1;
                    }

                    Sprite.from(scoreTxs[score])
                        .anchored(0.5, 0.5)
                        .at(wordObj.x + wordObj.width / 2, wordObj.y + wordObj.height / 2)
                        .coro(function* (self) {
                            self.play(scoreSfxs[score as keyof typeof scoreSfxs].rate(0.95, 1.05));
                            yield interpvr(self).factor(factor.sine).translate(0, -20).over(250);
                        })
                        .vround()
                        .zIndexed(20)
                        .show(self);
                    yield sleep(100);
                }

                yield sleep(1000);
                api.isComplete = true;
            })
            .autoSorted()
            .at(42, 26),
    )
        .merge({ objBook: api });
}

function objHighlight() {
    const highlightGfx = new Graphics()
        .beginFill(0xCB9EFF)
        .drawRect(0, 0, 1, 30);
    const maskGfx = new Graphics()
        .beginFill(0xff0000)
        .drawRect(0, 10, 1, 10);

    return container(highlightGfx, maskGfx.invisible())
        .collisionShape(CollisionShape.DisplayObjects, [maskGfx])
        .scaled(0, 1)
        .track(objHighlight);
}

function objPageText(targetSentencesCount: Integer, difficulty: Unit) {
    const obj = container()
        .merge({
            objPageText: {
                lineWidths: [0],
                get desirableWordsCount() {
                    return obj
                        .findIs(objWord)
                        .reduce((sum, wordObj) => wordObj.objWord.isDesirable ? (sum + 1) : sum, 0);
                },
            },
        });

    let x = 0;
    let y = 0;
    for (let i = 0; i < targetSentencesCount; i++) {
        const sentence = generateSentence(i > 0);
        const words = sentence.split(" ").map(string => string.trim()).filter(string => string);
        const wordObjs = new Array<DisplayObject>();
        const maybeLineWidths = [...obj.objPageText.lineWidths];

        for (const word of words) {
            const wordObj = objWord(word);
            if (wordObj.width > consts.page.maxWidth) {
                Logger.logAssertError("objPageText", new Error("word is too long"), { word });
                continue;
            }
            if (wordObj.width + x > consts.page.maxWidth) {
                maybeLineWidths.push(0);
                x = 0;
                y += consts.page.lineHeight;
            }
            if (wordObj.height + y > consts.page.maxHeight) {
                return obj;
            }

            wordObjs.push(wordObj.at(x, y));
            maybeLineWidths[maybeLineWidths.length - 1] = wordObj.x + wordObj.width;
            x += wordObj.width + Math.round(nlerp(consts.page.space.easy, consts.page.space.hard, difficulty));
        }

        obj.objPageText.lineWidths = maybeLineWidths;
        obj.addChild(...wordObjs);
    }

    return obj;
}

type ObjPageText = ReturnType<typeof objPageText>;

function objWord(casedWord: string) {
    const normalizedWord = casedWord.toLowerCase().replace(/(\.|\?\!\,)/gm, "").trim();
    const isDesirable = consts.desirableWords.has(normalizedWord);
    return objText.XLargeIrregular(casedWord, { tint: 0x000000 })
        .merge({ objWord: { isDesirable } })
        .identify(objWord)
        .track(objWord);
}

function generateSentence(maybeConjunction: boolean) {
    const raw = (maybeConjunction ? Rng.choose("and ", "but ", "") : "")
        + Rng.item(consts.sentences)
            .replaceAll(
                "zhe",
                Rng.choose(
                    "she",
                    Rng.choose("women", "the women", "girls", "the girls"),
                    Rng.choose("a ", "the ") + Rng.choose("girl", "woman"),
                ),
            )
        + Rng.choose(".", " again.", " today.", " yesterday.", "!");

    return raw.charAt(0).toUpperCase() + raw.substring(1);
}
