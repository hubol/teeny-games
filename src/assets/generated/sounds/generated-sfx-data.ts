// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "placeholder.ogg",
      "song/chorus0.ogg",
      "song/chorus1.ogg",
      "song/chorus2.ogg",
      "song/chorus3.ogg",
      "song/verse0.ogg",
      "song/verse1.ogg",
      "song/verse2.ogg",
      "song/verse3.ogg",
      "step.ogg",
      "sword land.ogg",
      "treat.ogg",
    ].map(sfx),
  );
  return {
    Placeholder: sounds[0],
    Song: {
      Chorus0: sounds[1],
      Chorus1: sounds[2],
      Chorus2: sounds[3],
      Chorus3: sounds[4],
      Verse0: sounds[5],
      Verse1: sounds[6],
      Verse2: sounds[7],
      Verse3: sounds[8],
    },
    Step: sounds[9],
    SwordLand: sounds[10],
    Treat: sounds[11],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
