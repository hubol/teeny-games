// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 58 }];

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
      Chicken: tx({ id: "Character.Chicken", atlas: 0, x: 508, y: 620, width: 60, height: 66 }),
      MishaHandOpened: tx({ id: "Character.MishaHandOpened", atlas: 0, x: 541, y: 795, width: 44, height: 50 }),
      MishaHand: tx({ id: "Character.MishaHand", atlas: 0, x: 567, y: 742, width: 44, height: 50 }),
      Misha: tx({ id: "Character.Misha", atlas: 0, x: 501, y: 49, width: 380, height: 86 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 753, y: 35, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 753, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 0, y: 973, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 279, y: 946, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 279, y: 702, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 330, width: 308, height: 208 }),
    },
    Fx: {
      AlarmNoise: tx({ id: "Fx.AlarmNoise", atlas: 0, x: 0, y: 0, width: 752, height: 48 }),
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 309, y: 363, width: 256, height: 256 }),
    },
    Item: {
      Box: tx({ id: "Item.Box", atlas: 0, x: 882, y: 35, width: 124, height: 56 }),
      CarrotGrated: tx({ id: "Item.CarrotGrated", atlas: 0, x: 457, y: 894, width: 50, height: 24 }),
      Carrot: tx({ id: "Item.Carrot", atlas: 0, x: 384, y: 620, width: 54, height: 72 }),
      CigaretteLit: tx({ id: "Item.CigaretteLit", atlas: 0, x: 439, y: 667, width: 66, height: 10 }),
      Cigarette: tx({ id: "Item.Cigarette", atlas: 0, x: 422, y: 349, width: 68, height: 10 }),
      EggBroken: tx({ id: "Item.EggBroken", atlas: 0, x: 536, y: 687, width: 42, height: 54 }),
      Egg: tx({ id: "Item.Egg", atlas: 0, x: 543, y: 889, width: 40, height: 46 }),
      Flour: tx({ id: "Item.Flour", atlas: 0, x: 455, y: 926, width: 54, height: 64 }),
      GarlicGrated: tx({ id: "Item.GarlicGrated", atlas: 0, x: 458, y: 330, width: 24, height: 18 }),
      GarlicSmashed: tx({ id: "Item.GarlicSmashed", atlas: 0, x: 631, y: 836, width: 34, height: 36 }),
      Garlic: tx({ id: "Item.Garlic", atlas: 0, x: 553, y: 963, width: 38, height: 28 }),
      Grater: tx({ id: "Item.Grater", atlas: 0, x: 584, y: 889, width: 36, height: 42 }),
      HalfCupFlour: tx({ id: "Item.HalfCupFlour", atlas: 0, x: 592, y: 963, width: 38, height: 36 }),
      HalfCup: tx({ id: "Item.HalfCup", atlas: 0, x: 621, y: 879, width: 38, height: 36 }),
      Hammer: tx({ id: "Item.Hammer", atlas: 0, x: 536, y: 742, width: 30, height: 52 }),
      Lighter: tx({ id: "Item.Lighter", atlas: 0, x: 621, y: 916, width: 18, height: 36 }),
      MixingBowl: tx({ id: "Item.MixingBowl", atlas: 0, x: 297, y: 645, width: 84, height: 46 }),
      OnionGrated: tx({ id: "Item.OnionGrated", atlas: 0, x: 553, y: 936, width: 46, height: 26 }),
      Onion: tx({ id: "Item.Onion", atlas: 0, x: 318, y: 971, width: 58, height: 52 }),
      Peeler: tx({ id: "Item.Peeler", atlas: 0, x: 457, y: 831, width: 36, height: 62 }),
      PepperShaker: tx({ id: "Item.PepperShaker", atlas: 0, x: 510, y: 892, width: 32, height: 56 }),
      Potato: tx({ id: "Item.Potato", atlas: 0, x: 161, y: 973, width: 156, height: 50 }),
      SaltShaker: tx({ id: "Item.SaltShaker", atlas: 0, x: 520, y: 949, width: 32, height: 56 }),
      ScooperWithLatke: tx({ id: "Item.ScooperWithLatke", atlas: 0, x: 541, y: 846, width: 48, height: 42 }),
      Scooper: tx({ id: "Item.Scooper", atlas: 0, x: 586, y: 793, width: 48, height: 42 }),
      Skillet: tx({ id: "Item.Skillet", atlas: 0, x: 297, y: 620, width: 86, height: 24 }),
      SmokeAlarm: tx({ id: "Item.SmokeAlarm", atlas: 0, x: 590, y: 836, width: 40, height: 42 }),
      Smoke: tx({ id: "Item.Smoke", atlas: 0, x: 882, y: 115, width: 10, height: 20 }),
      WhiskyGlass: tx({ id: "Item.WhiskyGlass", atlas: 0, x: 494, y: 831, width: 46, height: 60 }),
    },
    Shapes: {
      Mess0: tx({ id: "Shapes.Mess0", atlas: 0, x: 309, y: 330, width: 148, height: 18 }),
      RadiatingRectangle64px32px: tx({ id: "Shapes.RadiatingRectangle64px32px", atlas: 0, x: 455, y: 991, width: 64, height: 32 }),
      Square32: tx({ id: "Shapes.Square32", atlas: 0, x: 553, y: 992, width: 32, height: 32 }),
    },
    Ui: {
      Error: tx({ id: "Ui.Error", atlas: 0, x: 0, y: 49, width: 500, height: 280 }),
      Target: tx({ id: "Ui.Target", atlas: 0, x: 631, y: 953, width: 22, height: 34 }),
    },
    World: {
      Grass0: tx({ id: "World.Grass0", atlas: 0, x: 439, y: 678, width: 32, height: 22 }),
      RecipeBookClosed: tx({ id: "World.RecipeBookClosed", atlas: 0, x: 834, y: 136, width: 178, height: 230 }),
      RecipeBookOpened: tx({ id: "World.RecipeBookOpened", atlas: 0, x: 501, y: 136, width: 332, height: 226 }),
      RecipeStepComplete0: tx({ id: "World.RecipeStepComplete0", atlas: 0, x: 309, y: 349, width: 112, height: 6 }),
      Splotch0: tx({ id: "World.Splotch0", atlas: 0, x: 914, y: 0, width: 110, height: 34 }),
      Text: {
        Birds: tx({ id: "World.Text.Birds", atlas: 0, x: 382, y: 926, width: 72, height: 94 }),
        Brown: tx({ id: "World.Text.Brown", atlas: 0, x: 882, y: 92, width: 124, height: 22 }),
        Cry: tx({ id: "World.Text.Cry", atlas: 0, x: 439, y: 620, width: 68, height: 46 }),
        Pointy: tx({ id: "World.Text.Pointy", atlas: 0, x: 279, y: 831, width: 64, height: 114 }),
        PunyPotent: tx({ id: "World.Text.PunyPotent", atlas: 0, x: 344, y: 831, width: 112, height: 94 }),
      },
      Tile0: tx({ id: "World.Tile0", atlas: 0, x: 0, y: 702, width: 278, height: 270 }),
      Tools: tx({ id: "World.Tools", atlas: 0, x: 0, y: 539, width: 296, height: 162 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
