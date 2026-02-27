// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(["alarm.ogg", "step0.ogg", "step1.ogg", "type.ogg"].map(sfx));
  return {
    Alarm: sounds[0],
    Step0: sounds[1],
    Step1: sounds[2],
    Type: sounds[3],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
