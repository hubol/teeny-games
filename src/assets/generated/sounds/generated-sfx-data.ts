// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(["bark.ogg", "placeholder.ogg", "six seven.ogg"].map(sfx));
  return {
    Bark: sounds[0],
    Placeholder: sounds[1],
    SixSeven: sounds[2],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
