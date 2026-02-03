import { Integer } from "../lib/math/number-alias-types";

function createLottieProgress() {
    return {
        libraryBookSeeds: new Array<Integer>(),
        score: {
            library: {
                booksCollected: 0,
                fecesCollected: 0,
            },
            reading: {
                goodWords: 0,
                okWords: 0,
                badWords: 0,
            },
        },
    };
}

export let lottieProgress = createLottieProgress();

export function resetLottieProgress() {
    lottieProgress = createLottieProgress();
}

export function getLottiePoints() {
    const booksCollected = 100 * lottieProgress.score.library.booksCollected;
    const fecesCollected = -100 * lottieProgress.score.library.fecesCollected;
    const goodWords = 100 * lottieProgress.score.reading.goodWords;
    const okWords = 50 * lottieProgress.score.reading.okWords;
    const badWords = -30 * lottieProgress.score.reading.badWords;

    return {
        library: {
            booksCollected,
            fecesCollected,
        },
        reading: {
            goodWords,
            badWords,
            okWords,
        },
        total: booksCollected + fecesCollected + goodWords + badWords + okWords,
    };
}
