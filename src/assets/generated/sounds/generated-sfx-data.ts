// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "book collect.ogg",
      "library round advance.ogg",
      "lottie step 0.ogg",
      "lottie step 1.ogg",
      "placeholder.ogg",
    ].map(sfx),
  );
  return {
    BookCollect: sounds[0],
    LibraryRoundAdvance: sounds[1],
    LottieStep0: sounds[2],
    LottieStep1: sounds[3],
    Placeholder: sounds[4],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
