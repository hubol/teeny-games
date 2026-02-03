import { Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { MapRgbFilter } from "../../lib/pixi/filters/map-rgb-filter";

const prng = new PseudoRng();

const [txBook, ...txsBookDecoration] = Tx.Library.Book.split({ width: 26 });

export function objLibraryBook(seed = Rng.intc(1_000_000, 999_000_000)) {
    prng.seed = seed;

    const bindingColor = prng.color();

    const api = {
        get seed() {
            return seed;
        },
        bindingColor,
    };

    const decorationTx = prng.item(txsBookDecoration);
    const titleObj = objText.XSmallIrregular(
        createTitle(),
        { tint: 0x0000ff, maxWidth: 20, align: Rng.choose("left", "right", "center") },
    )
        .anchored(0.5, 0.5)
        .at(13, 16);

    return container(
        Sprite.from(txBook),
        Sprite.from(decorationTx),
        titleObj,
    )
        .pivoted(13, 16)
        .filtered(new MapRgbFilter(bindingColor, prng.color(), prng.color()))
        .merge({ objLibraryBook: api });
}

function createTitle() {
    const question = prng.bool() ? prng.choose("how", "why", "where", "what", "who") : "";
    const subject = prng.choose("she", "they", "we", "I");
    const verb = prng.choose("go", "be", "run", "love", "want");

    return [question, subject, verb]
        .filter(string => string)
        .map((string, index) => index > 0 ? string : (string.charAt(0).toUpperCase() + string.substring(1)))
        .join(" ");
}
