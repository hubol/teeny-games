// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "manipulate/no0.ogg",
      "manipulate/no1.ogg",
      "manipulate/no10.ogg",
      "manipulate/no11.ogg",
      "manipulate/no12.ogg",
      "manipulate/no13.ogg",
      "manipulate/no14.ogg",
      "manipulate/no15.ogg",
      "manipulate/no16.ogg",
      "manipulate/no17.ogg",
      "manipulate/no18.ogg",
      "manipulate/no19.ogg",
      "manipulate/no2.ogg",
      "manipulate/no3.ogg",
      "manipulate/no4.ogg",
      "manipulate/no5.ogg",
      "manipulate/no6.ogg",
      "manipulate/no7.ogg",
      "manipulate/no8.ogg",
      "manipulate/no9.ogg",
      "placeholder.ogg",
    ].map(sfx),
  );
  return {
    Manipulate: {
      No0: sounds[0],
      No1: sounds[1],
      No10: sounds[2],
      No11: sounds[3],
      No12: sounds[4],
      No13: sounds[5],
      No14: sounds[6],
      No15: sounds[7],
      No16: sounds[8],
      No17: sounds[9],
      No18: sounds[10],
      No19: sounds[11],
      No2: sounds[12],
      No3: sounds[13],
      No4: sounds[14],
      No5: sounds[15],
      No6: sounds[16],
      No7: sounds[17],
      No8: sounds[18],
      No9: sounds[19],
    },
    Placeholder: sounds[20],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
