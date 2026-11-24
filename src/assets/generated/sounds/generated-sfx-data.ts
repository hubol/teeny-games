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
      "fx/interrupt.ogg",
      "placeholder.ogg",
      "samples/a0.ogg",
      "samples/a1.ogg",
      "samples/a10.ogg",
      "samples/a11.ogg",
      "samples/a12.ogg",
      "samples/a13.ogg",
      "samples/a14.ogg",
      "samples/a15.ogg",
      "samples/a16.ogg",
      "samples/a2.ogg",
      "samples/a3.ogg",
      "samples/a4.ogg",
      "samples/a5.ogg",
      "samples/a6.ogg",
      "samples/a7.ogg",
      "samples/a8.ogg",
      "samples/a9.ogg",
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
      Interrupt: sounds[7],
    },
    Placeholder: sounds[8],
    Samples: {
      A0: sounds[9],
      A1: sounds[10],
      A10: sounds[11],
      A11: sounds[12],
      A12: sounds[13],
      A13: sounds[14],
      A14: sounds[15],
      A15: sounds[16],
      A16: sounds[17],
      A2: sounds[18],
      A3: sounds[19],
      A4: sounds[20],
      A5: sounds[21],
      A6: sounds[22],
      A7: sounds[23],
      A8: sounds[24],
      A9: sounds[25],
    },
  };
}

export const GeneratedSfxData = {
  sfxs,
};
