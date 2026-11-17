// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "fx/bubble0.ogg",
      "fx/bubble1.ogg",
      "fx/bubble2.ogg",
      "fx/bubble3.ogg",
      "fx/bubble4.ogg",
      "fx/bubble5.ogg",
      "fx/glock.ogg",
      "placeholder.ogg",
    ].map(sfx),
  );
  return {
    Fx: {
      Bubble0: sounds[0],
      Bubble1: sounds[1],
      Bubble2: sounds[2],
      Bubble3: sounds[3],
      Bubble4: sounds[4],
      Bubble5: sounds[5],
      Glock: sounds[6],
    },
    Placeholder: sounds[7],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
