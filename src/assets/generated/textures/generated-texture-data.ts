// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 32 }];

interface TxData {
  id: string;
  atlas: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

function txs<T>(tx: (data: TxData) => T) {
  return {
    Character: {
      MishaHandOpened: tx({ id: "Character.MishaHandOpened", atlas: 0, x: 971, y: 231, width: 44, height: 50 }),
      MishaHand: tx({ id: "Character.MishaHand", atlas: 0, x: 436, y: 374, width: 44, height: 50 }),
      Misha: tx({ id: "Character.Misha", atlas: 0, x: 0, y: 281, width: 380, height: 86 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 810, y: 352, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 810, y: 231, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 810, y: 266, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 381, y: 288, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 368, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 501, y: 227, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 0, y: 497, width: 256, height: 256 }),
    },
    Item: {
      Box: tx({ id: "Item.Box", atlas: 0, x: 810, y: 361, width: 124, height: 56 }),
      CigaretteLit: tx({ id: "Item.CigaretteLit", atlas: 0, x: 381, y: 324, width: 66, height: 10 }),
      Cigarette: tx({ id: "Item.Cigarette", atlas: 0, x: 381, y: 313, width: 68, height: 10 }),
      EggBroken: tx({ id: "Item.EggBroken", atlas: 0, x: 967, y: 301, width: 42, height: 54 }),
      Egg: tx({ id: "Item.Egg", atlas: 0, x: 355, y: 400, width: 40, height: 46 }),
      Flour: tx({ id: "Item.Flour", atlas: 0, x: 381, y: 335, width: 54, height: 64 }),
      HalfCupFlour: tx({ id: "Item.HalfCupFlour", atlas: 0, x: 396, y: 400, width: 38, height: 36 }),
      HalfCup: tx({ id: "Item.HalfCup", atlas: 0, x: 435, y: 425, width: 38, height: 36 }),
      Lighter: tx({ id: "Item.Lighter", atlas: 0, x: 481, y: 374, width: 18, height: 36 }),
      MixingBowl: tx({ id: "Item.MixingBowl", atlas: 0, x: 935, y: 386, width: 84, height: 46 }),
      Potato: tx({ id: "Item.Potato", atlas: 0, x: 810, y: 301, width: 156, height: 50 }),
      ScooperWithLatke: tx({ id: "Item.ScooperWithLatke", atlas: 0, x: 257, y: 368, width: 48, height: 42 }),
      Scooper: tx({ id: "Item.Scooper", atlas: 0, x: 306, y: 368, width: 48, height: 42 }),
      Skillet: tx({ id: "Item.Skillet", atlas: 0, x: 935, y: 361, width: 86, height: 24 }),
      Smoke: tx({ id: "Item.Smoke", atlas: 0, x: 1013, y: 0, width: 10, height: 20 }),
      WhiskyGlass: tx({ id: "Item.WhiskyGlass", atlas: 0, x: 450, y: 313, width: 46, height: 60 }),
    },
    Shapes: {
      Square32: tx({ id: "Shapes.Square32", atlas: 0, x: 396, y: 437, width: 32, height: 32 }),
    },
    Ui: {
      Error: tx({ id: "Ui.Error", atlas: 0, x: 0, y: 0, width: 500, height: 280 }),
      Target: tx({ id: "Ui.Target", atlas: 0, x: 474, y: 425, width: 22, height: 34 }),
    },
    World: {
      RecipeBookClosed: tx({ id: "World.RecipeBookClosed", atlas: 0, x: 834, y: 0, width: 178, height: 230 }),
      RecipeBookOpened: tx({ id: "World.RecipeBookOpened", atlas: 0, x: 501, y: 0, width: 332, height: 226 }),
      RecipeStepComplete0: tx({ id: "World.RecipeStepComplete0", atlas: 0, x: 381, y: 281, width: 112, height: 6 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
