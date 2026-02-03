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
