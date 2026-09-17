// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    ["message.ogg", "placeholder.ogg", "step.ogg", "stroke0.ogg", "stroke1.ogg"].map(sfx),
  );
  return {
    Message: sounds[0],
    Placeholder: sounds[1],
    Step: sounds[2],
    Stroke0: sounds[3],
    Stroke1: sounds[4],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
