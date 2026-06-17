// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(["ooh.ogg", "placeholder.ogg"].map(sfx));
  return {
    Ooh: sounds[0],
    Placeholder: sounds[1],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
