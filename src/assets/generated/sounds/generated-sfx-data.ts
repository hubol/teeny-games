// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "designer/begin.ogg",
      "designer/press go.ogg",
      "designer/transition.ogg",
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
      "skate/crash.ogg",
      "skate/drone.ogg",
      "skate/land.ogg",
      "skate/nudge.ogg",
    ].map(sfx),
  );
  return {
    Designer: {
      Begin: sounds[0],
      PressGo: sounds[1],
      Transition: sounds[2],
    },
    Manipulate: {
      No0: sounds[3],
      No1: sounds[4],
      No10: sounds[5],
      No11: sounds[6],
      No12: sounds[7],
      No13: sounds[8],
      No14: sounds[9],
      No15: sounds[10],
      No16: sounds[11],
      No17: sounds[12],
      No18: sounds[13],
      No19: sounds[14],
      No2: sounds[15],
      No3: sounds[16],
      No4: sounds[17],
      No5: sounds[18],
      No6: sounds[19],
      No7: sounds[20],
      No8: sounds[21],
      No9: sounds[22],
    },
    Placeholder: sounds[23],
    Skate: {
      Crash: sounds[24],
      Drone: sounds[25],
      Land: sounds[26],
      Nudge: sounds[27],
    },
  };
}

export const GeneratedSfxData = {
  sfxs,
};
