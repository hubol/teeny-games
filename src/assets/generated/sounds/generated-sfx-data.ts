// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "alarm.ogg",
      "error.ogg",
      "info.ogg",
      "open book.ogg",
      "pick up.ogg",
      "put down.ogg",
      "shock.ogg",
      "snore 0.ogg",
      "snore 1.ogg",
      "step0.ogg",
      "step1.ogg",
      "type.ogg",
      "yo.ogg",
    ].map(sfx),
  );
  return {
    Alarm: sounds[0],
    Error: sounds[1],
    Info: sounds[2],
    OpenBook: sounds[3],
    PickUp: sounds[4],
    PutDown: sounds[5],
    Shock: sounds[6],
    Snore0: sounds[7],
    Snore1: sounds[8],
    Step0: sounds[9],
    Step1: sounds[10],
    Type: sounds[11],
    Yo: sounds[12],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
