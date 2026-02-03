import { BLEND_MODES, DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { Logger } from "../../lib/game-engine/logger";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { CollisionShape } from "../../lib/pixi/collision";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { Key, scene } from "../globals";

export function scnReading() {
    scene.style.backgroundTint = 0x404040;

    const bookObj = objBook().show();
}

const consts = {
    desirableWords: new Set(["her", "she", "girls", "girl", "women", "woman", "female", "feminine", "femininity"]),
    sentences: [
        "she fell down",
        "she touched the pieces",
        "she looked exasperated",
        "she tried different food",
        "she saw the world",
        "she went away",
        "she held her hand",
        "she became unwell",
        "she cried",
    ],
    page: {
        maxWidth: 320,
        maxHeight: 210,
        lineHeight: 32,
        space: 26,
    },
};

function objBook() {
    const pageTextObj = objPageText();

    let isCursorCompleted = false;

    return container(
        Sprite.from(Tx.Reading.Book),
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

                    yield sleep(1000);

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
            })
            .autoSorted()
            .at(42, 28),
    );
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

function objPageText() {
    const obj = container().merge({ objPageText: { lineWidths: [0] } });

    let x = 0;
    let y = 0;
    for (let i = 0; i < 4; i++) {
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
        .track(objWord);
}

function generateSentence(maybeConjunction: boolean) {
    const raw = (maybeConjunction ? Rng.choose("and ", "but ", "") : "")
        + Rng.item(consts.sentences)
            .replaceAll(
                "she",
                Rng.choose(
                    "she",
                    Rng.choose("women", "the women", "girls", "the girls"),
                    Rng.choose("a ", "the ") + Rng.choose("girl", "woman"),
                ),
            )
        + Rng.choose(".", " again.", " today.", " yesterday.", "!");

    return raw.charAt(0).toUpperCase() + raw.substring(1);
}
