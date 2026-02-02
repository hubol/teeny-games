// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "attention barnes and noble.ogg",
      "book collect.ogg",
      "feces warning.ogg",
      "library round advance.ogg",
      "lottie step 0.ogg",
      "lottie step 1.ogg",
      "placeholder.ogg",
    ].map(sfx),
  );
  return {
    AttentionBarnesAndNoble: sounds[0],
    BookCollect: sounds[1],
    FecesWarning: sounds[2],
    LibraryRoundAdvance: sounds[3],
    LottieStep0: sounds[4],
    LottieStep1: sounds[5],
    Placeholder: sounds[6],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
