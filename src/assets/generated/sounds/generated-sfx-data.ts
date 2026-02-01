// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "book collect.ogg",
      "feces warning.ogg",
      "library round advance.ogg",
      "lottie step 0.ogg",
      "lottie step 1.ogg",
      "placeholder.ogg",
    ].map(sfx),
  );
  return {
    BookCollect: sounds[0],
    FecesWarning: sounds[1],
    LibraryRoundAdvance: sounds[2],
    LottieStep0: sounds[3],
    LottieStep1: sounds[4],
    Placeholder: sounds[5],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
