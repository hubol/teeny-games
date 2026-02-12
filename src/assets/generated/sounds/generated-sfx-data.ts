// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "dialog/boys.ogg",
      "dialog/for.ogg",
      "dialog/hear.ogg",
      "dialog/it.ogg",
      "dialog/lets.ogg",
      "dialog/the.ogg",
      "dialog/you are gay.ogg",
      "placeholder.ogg",
    ].map(sfx),
  );
  return {
    Dialog: {
      Boys: sounds[0],
      For: sounds[1],
      Hear: sounds[2],
      It: sounds[3],
      Lets: sounds[4],
      The: sounds[5],
      YouAreGay: sounds[6],
    },
    Placeholder: sounds[7],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
