// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "ooh.ogg",
      "placeholder.ogg",
      "samples/boom whacker1.ogg",
      "samples/glock/a0.ogg",
      "samples/glock/b0.ogg",
      "samples/glock/c0.ogg",
      "samples/glock/c1.ogg",
      "samples/glock/d0.ogg",
      "samples/glock/e0.ogg",
      "samples/glock/f0.ogg",
      "samples/glock/g0.ogg",
    ].map(sfx),
  );
  return {
    Ooh: sounds[0],
    Placeholder: sounds[1],
    Samples: {
      BoomWhacker1: sounds[2],
      Glock: {
        A0: sounds[3],
        B0: sounds[4],
        C0: sounds[5],
        C1: sounds[6],
        D0: sounds[7],
        E0: sounds[8],
        F0: sounds[9],
        G0: sounds[10],
      },
    },
  };
}

export const GeneratedSfxData = {
  sfxs,
};
