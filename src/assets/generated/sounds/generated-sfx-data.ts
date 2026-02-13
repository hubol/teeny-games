// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "advance.ogg",
      "control.ogg",
      "dialog/boys.ogg",
      "dialog/for.ogg",
      "dialog/hear.ogg",
      "dialog/it.ogg",
      "dialog/lets.ogg",
      "dialog/pick a cute outfit.ogg",
      "dialog/the.ogg",
      "dialog/yeah.ogg",
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
    Control: sounds[1],
    Dialog: {
      Boys: sounds[2],
      For: sounds[3],
      Hear: sounds[4],
      It: sounds[5],
      Lets: sounds[6],
      PickACuteOutfit: sounds[7],
      The: sounds[8],
      Yeah: sounds[9],
      YouAreGay: sounds[10],
    },
    Impact: {
      Undress0: sounds[11],
      Undress1: sounds[12],
      Undress2: sounds[13],
      Undress3: sounds[14],
      Undress4: sounds[15],
    },
    Placeholder: sounds[16],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
