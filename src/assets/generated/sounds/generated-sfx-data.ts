// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "ooh.ogg",
      "placeholder.ogg",
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
      Glock: {
        A0: sounds[2],
        B0: sounds[3],
        C0: sounds[4],
        C1: sounds[5],
        D0: sounds[6],
        E0: sounds[7],
        F0: sounds[8],
        G0: sounds[9],
      },
    },
  };
}

export const GeneratedSfxData = {
  sfxs,
};
