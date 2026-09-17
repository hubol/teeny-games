// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    ["message.ogg", "placeholder.ogg", "stroke0.ogg", "stroke1.ogg"].map(sfx),
  );
  return {
    Message: sounds[0],
    Placeholder: sounds[1],
    Stroke0: sounds[2],
    Stroke1: sounds[3],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
