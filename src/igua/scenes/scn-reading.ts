import { DisplayObject, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
import { Logger } from "../../lib/game-engine/logger";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { scene } from "../globals";

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
        pageTextObj.at(42, 28),
    );
}

function objPageText() {
    const sentencesObj = container();

    let x = 0;
    let y = 0;
    let linesCount = 0;
    for (let i = 0; i < 4; i++) {
        const sentence = generateSentence(i > 0);
        const words = sentence.split(" ").map(string => string.trim()).filter(string => string);
        const wordObjs = new Array<DisplayObject>();
        let maybeLinesCount = linesCount;

        for (const word of words) {
            const wordObj = objWord(word);
            if (wordObj.width > consts.page.maxWidth) {
                Logger.logAssertError("objPageText", new Error("word is too long"), { word });
                continue;
            }
            if (wordObj.width + x > consts.page.maxWidth) {
                maybeLinesCount += 1;
                x = 0;
                y += consts.page.lineHeight;
            }
            if (wordObj.height + y > consts.page.maxHeight) {
                return sentencesObj;
            }

            wordObjs.push(wordObj.at(x, y));
            x += wordObj.width + consts.page.space;
            linesCount = maybeLinesCount;
        }

        sentencesObj.addChild(...wordObjs);
    }

    return sentencesObj
        .merge({ objPageText: { linesCount } });
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
