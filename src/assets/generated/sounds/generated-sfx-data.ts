// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "add ingredient.ogg",
      "alarm.ogg",
      "cooking.ogg",
      "egg break.ogg",
      "error.ogg",
      "grate.ogg",
      "info.ogg",
      "lighter.ogg",
      "open book.ogg",
      "pick up.ogg",
      "pour.ogg",
      "put down.ogg",
      "scoop flour.ogg",
      "scoop latke.ogg",
      "shock.ogg",
      "snore 0.ogg",
      "snore 1.ogg",
      "step0.ogg",
      "step1.ogg",
      "table set.ogg",
      "type.ogg",
      "yo.ogg",
    ].map(sfx),
  );
  return {
    AddIngredient: sounds[0],
    Alarm: sounds[1],
    Cooking: sounds[2],
    EggBreak: sounds[3],
    Error: sounds[4],
    Grate: sounds[5],
    Info: sounds[6],
    Lighter: sounds[7],
    OpenBook: sounds[8],
    PickUp: sounds[9],
    Pour: sounds[10],
    PutDown: sounds[11],
    ScoopFlour: sounds[12],
    ScoopLatke: sounds[13],
    Shock: sounds[14],
    Snore0: sounds[15],
    Snore1: sounds[16],
    Step0: sounds[17],
    Step1: sounds[18],
    TableSet: sounds[19],
    Type: sounds[20],
    Yo: sounds[21],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
