// This file is generated

async function sfxs<T>(sfx: (ogg: string) => Promise<T>) {
  const sounds = await Promise.all(
    [
      "add ingredient.ogg",
      "alarm.ogg",
      "cooking.ogg",
      "egg break.ogg",
      "ending.ogg",
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
    Ending: sounds[4],
    Error: sounds[5],
    Grate: sounds[6],
    Info: sounds[7],
    Lighter: sounds[8],
    OpenBook: sounds[9],
    PickUp: sounds[10],
    Pour: sounds[11],
    PutDown: sounds[12],
    ScoopFlour: sounds[13],
    ScoopLatke: sounds[14],
    Shock: sounds[15],
    Snore0: sounds[16],
    Snore1: sounds[17],
    Step0: sounds[18],
    Step1: sounds[19],
    TableSet: sounds[20],
    Type: sounds[21],
    Yo: sounds[22],
  };
}

export const GeneratedSfxData = {
  sfxs,
};
