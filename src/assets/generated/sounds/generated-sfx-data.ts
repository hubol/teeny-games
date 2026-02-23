// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(["step0.ogg", "step1.ogg", "type.ogg"].map(sfx));
  return {
    Step0: sounds[0],
    Step1: sounds[1],
    Type: sounds[2],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
