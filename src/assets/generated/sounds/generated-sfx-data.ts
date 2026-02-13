// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "advance.ogg",
      "dialog/boys.ogg",
      "dialog/for.ogg",
      "dialog/hear.ogg",
      "dialog/it.ogg",
      "dialog/lets.ogg",
      "dialog/pick a cute outfit.ogg",
      "dialog/the.ogg",
      "dialog/you are gay.ogg",
      "impact/undress0.ogg",
      "impact/undress1.ogg",
      "impact/undress2.ogg",
      "impact/undress3.ogg",
      "impact/undress4.ogg",
      "placeholder.ogg",
    ].map(sfx),
  );
  return {
    Advance: sounds[0],
    Dialog: {
      Boys: sounds[1],
      For: sounds[2],
      Hear: sounds[3],
      It: sounds[4],
      Lets: sounds[5],
      PickACuteOutfit: sounds[6],
      The: sounds[7],
      YouAreGay: sounds[8],
    },
    Impact: {
      Undress0: sounds[9],
      Undress1: sounds[10],
      Undress2: sounds[11],
      Undress3: sounds[12],
      Undress4: sounds[13],
    },
    Placeholder: sounds[14],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
