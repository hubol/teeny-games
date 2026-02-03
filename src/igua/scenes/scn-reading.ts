import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { Logger } from "../../lib/game-engine/logger";
import { factor, interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear, nlerp } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { MapRgbFilter } from "../../lib/pixi/filters/map-rgb-filter";
import { Key, scene } from "../globals";
import { lottieProgress } from "../lottie-progress";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objLibraryBook } from "../objects/obj-library-book";

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
        .at(400, 180)
        .show();

    container()
        .coro(function* () {
            let seedIndex = 0;
            while (minigame.remainingDesirableWordsCount > 0) {
                const seed = lottieProgress.libraryBookSeeds[(seedIndex++) % lottieProgress.libraryBookSeeds.length]
                    ?? Rng.intc(9_000_000, 999_000_000);

                readingLottieObj.objReadingLottie.book.seed = seed;
                readingLottieObj.objReadingLottie.book.unit = 0;

                yield interp(readingLottieObj.objReadingLottie.book, "unit").to(1).over(1000);

                let bookObj = objBook(Math.min(4, minigame.remainingDesirableWordsCount), seed);
                if (minigame.remainingDesirableWordsCount < 4) {
                    for (let i = 0; i < 4; i++) {
                        if (bookObj.objBook.desirableWordsCount === minigame.remainingDesirableWordsCount) {
                            break;
                        }
                        bookObj.destroy();
                        bookObj = objBook(minigame.remainingDesirableWordsCount, seed);
                    }
                }

                bookObj.at(-340, 0).show();
                yield interpvr(bookObj).factor(factor.sine).to(0, 0).over(500);
                yield sleep(1000);
                bookObj.objBook.isScanning = true;
                const pupilsControlObj = container()
                    .step(() => {
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
                yield interpvr(bookObj).factor(factor.sine).to(-400, 0).over(500);
                readingLottieObj.objReadingLottie.looking.x = 0;
                readingLottieObj.objReadingLottie.looking.y = 0;
                minigame.remainingDesirableWordsCount -= bookObj.objBook.desirableWordsCount;
                bookObj.destroy();
                yield interp(readingLottieObj.objReadingLottie.book, "unit").steps(6).to(0).over(500);
            }
        })
        .show();
}

function objReadingLottie() {
    const [txBody, txFace, txPupils, txBook0, txBook1, txBook2] = Tx.Reading.Lottie.split({ width: 100 });

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
    };

    return container(
        Sprite.from(txBody),
        Sprite.from(txFace).mixin(mxnBoilPivot),
        Sprite.from(txPupils).step(self => self.position.at(api.looking).scale(4).vround()),
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
        space: 26,
    },
};

function objBook(targetDesirableWordsCount: Integer, seed: Integer) {
    const tinyBookObj = objLibraryBook(seed);
    const pageTextObj = objPageText(targetDesirableWordsCount);

    const desirableWordsCount = pageTextObj
        .findIs(objWord)
        .reduce((sum, wordObj) => wordObj.objWord.isDesirable ? (sum + 1) : sum, 0);

    const api = {
        desirableWordsCount,
        isScanning: false,
        isComplete: false,
        scanUnit: 0,
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
                .coro(function* (self) {
                    const padding = 20;
                    self.at(-padding, 0);

                    yield () => api.isScanning;

                    const count = pageTextObj.objPageText.lineWidths.length;
                    for (let i = 0; i < count; i++) {
                        const width = pageTextObj.objPageText.lineWidths[i];
                        const distance = width + padding + 6;
                        yield interpvr(self).translate(distance, 0).over(distance * 4);
                        if (i + 1 < count) {
                            self.objCursor.isOnLine = false;
                            yield interpvr(self)
                                .factor(factor.sine)
                                .to(-padding, (i + 1) * consts.page.lineHeight)
                                .over(500);
                            self.objCursor.isOnLine = true;
                        }
                    }
                    isCursorCompleted = true;
                })
                .step(self => {
                    api.scanUnit = Math.max(0, Math.min(1, self.x / consts.page.maxWidth));
                })
                .coro(function* (self) {
                    while (true) {
                        yield () => Key.isDown("Space") && self.objCursor.isOnLine;
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

                    Sprite.from(scoreTxs[score])
                        .anchored(0.5, 0.5)
                        .at(wordObj.x + wordObj.width / 2, wordObj.y + wordObj.height / 2)
                        .coro(function* (self) {
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

function objPageText(targetSentencesCount: Integer) {
    const obj = container().merge({ objPageText: { lineWidths: [0] } });

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
            x += wordObj.width + consts.page.space;
        }

        obj.objPageText.lineWidths = maybeLineWidths;
        obj.addChild(...wordObjs);
    }

    return obj;
}

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
