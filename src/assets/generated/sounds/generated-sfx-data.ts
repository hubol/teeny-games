// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(["placeholder.ogg"].map(sfx));
  return {
    Placeholder: sounds[0],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
