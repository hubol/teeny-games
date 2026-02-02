import { BLEND_MODES, DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
import { Logger } from "../../lib/game-engine/logger";
import { interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
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
        space: 13,
    },
};

function objBook() {
    const pageTextObj = objPageText();
    return container(
        Sprite.from(Tx.Reading.Book),
        container(
            pageTextObj.zIndexed(1),
            new Graphics()
                .lineStyle(3, 0x000000, 1)
                .moveTo(0, -3)
                .lineTo(0, 29)
                .coro(function* (self) {
                    const padding = 20;
                    self.at(-padding, 0);

                    yield sleep(1000);

                    const count = pageTextObj.objPageText.lineWidths.length;
                    for (let i = 0; i < count; i++) {
                        const width = pageTextObj.objPageText.lineWidths[i];
                        const distance = width + padding * 2;
                        yield interpvr(self).translate(distance, 0).over(distance * 4);
                        if (i + 1 < count) {
                            yield interpvr(self).to(-padding, (i + 1) * consts.page.lineHeight).over(500);
                        }
                    }
                })
                // .coro(function* (self) {
                //     yield () => Key.justWentDown("Space")
                // })
                .zIndexed(9),
        )
            .autoSorted()
            .at(42, 28),
    );
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
        .merge({ objWord: { isDesirable } });
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
