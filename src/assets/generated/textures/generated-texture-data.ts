// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 86 }];

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
      AidarSleeping: tx({ id: "Character.AidarSleeping", atlas: 0, x: 0, y: 0, width: 1168, height: 112 }),
      Aidar: tx({ id: "Character.Aidar", atlas: 0, x: 0, y: 1524, width: 168, height: 86 }),
      Chicken: tx({ id: "Character.Chicken", atlas: 0, x: 169, y: 1524, width: 60, height: 66 }),
      MishaHandOpened: tx({ id: "Character.MishaHandOpened", atlas: 0, x: 2004, y: 329, width: 44, height: 50 }),
      MishaHand: tx({ id: "Character.MishaHand", atlas: 0, x: 2004, y: 380, width: 44, height: 50 }),
      Misha: tx({ id: "Character.Misha", atlas: 0, x: 0, y: 675, width: 380, height: 86 }),
    },
    Ending: {
      HubolFace: tx({ id: "Ending.HubolFace", atlas: 0, x: 1169, y: 49, width: 500, height: 280 }),
      Hubol: tx({ id: "Ending.Hubol", atlas: 0, x: 0, y: 113, width: 500, height: 280 }),
      MishaFace: tx({ id: "Ending.MishaFace", atlas: 0, x: 501, y: 113, width: 500, height: 280 }),
      Misha: tx({ id: "Ending.Misha", atlas: 0, x: 1002, y: 330, width: 500, height: 280 }),
      Table: tx({ id: "Ending.Table", atlas: 0, x: 1503, y: 330, width: 500, height: 280 }),
      TheEnd: tx({ id: "Ending.TheEnd", atlas: 0, x: 0, y: 394, width: 500, height: 280 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 1002, y: 313, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 1841, y: 276, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 0, y: 1611, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 0, y: 2005, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 1033, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 381, y: 675, width: 308, height: 208 }),
    },
    Fx: {
      AlarmNoise: tx({ id: "Fx.AlarmNoise", atlas: 0, x: 1169, y: 0, width: 752, height: 48 }),
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 0, y: 1162, width: 256, height: 256 }),
      ZSmall: tx({ id: "Fx.ZSmall", atlas: 0, x: 987, y: 675, width: 14, height: 14 }),
      Z: tx({ id: "Fx.Z", atlas: 0, x: 2004, y: 649, width: 22, height: 24 }),
    },
    Item: {
      Box: tx({ id: "Item.Box", atlas: 0, x: 0, y: 1818, width: 124, height: 56 }),
      CarrotGrated: tx({ id: "Item.CarrotGrated", atlas: 0, x: 129, y: 1793, width: 50, height: 24 }),
      Carrot: tx({ id: "Item.Carrot", atlas: 0, x: 157, y: 1703, width: 54, height: 72 }),
      CigaretteLit: tx({ id: "Item.CigaretteLit", atlas: 0, x: 0, y: 2030, width: 66, height: 10 }),
      Cigarette: tx({ id: "Item.Cigarette", atlas: 0, x: 1819, y: 311, width: 68, height: 10 }),
      EggBroken: tx({ id: "Item.EggBroken", atlas: 0, x: 2004, y: 105, width: 42, height: 54 }),
      Egg: tx({ id: "Item.Egg", atlas: 0, x: 2004, y: 431, width: 40, height: 46 }),
      Flour: tx({ id: "Item.Flour", atlas: 0, x: 203, y: 1419, width: 54, height: 64 }),
      GarlicGrated: tx({ id: "Item.GarlicGrated", atlas: 0, x: 67, y: 2030, width: 24, height: 18 }),
      GarlicSmashed: tx({ id: "Item.GarlicSmashed", atlas: 0, x: 184, y: 1776, width: 34, height: 36 }),
      Garlic: tx({ id: "Item.Garlic", atlas: 0, x: 2004, y: 564, width: 38, height: 28 }),
      Grater: tx({ id: "Item.Grater", atlas: 0, x: 2004, y: 478, width: 36, height: 42 }),
      HalfCupFlour: tx({ id: "Item.HalfCupFlour", atlas: 0, x: 194, y: 2008, width: 38, height: 36 }),
      HalfCup: tx({ id: "Item.HalfCup", atlas: 0, x: 233, y: 2008, width: 38, height: 36 }),
      Hammer: tx({ id: "Item.Hammer", atlas: 0, x: 2002, y: 276, width: 30, height: 52 }),
      Latke: tx({ id: "Item.Latke", atlas: 0, x: 145, y: 1776, width: 38, height: 16 }),
      Lighter: tx({ id: "Item.Lighter", atlas: 0, x: 258, y: 1033, width: 18, height: 36 }),
      MixingBowl: tx({ id: "Item.MixingBowl", atlas: 0, x: 125, y: 1818, width: 84, height: 46 }),
      OliveOil: tx({ id: "Item.OliveOil", atlas: 0, x: 344, y: 825, width: 34, height: 58 }),
      OnionGrated: tx({ id: "Item.OnionGrated", atlas: 0, x: 203, y: 1484, width: 46, height: 26 }),
      Onion: tx({ id: "Item.Onion", atlas: 0, x: 169, y: 1591, width: 58, height: 52 }),
      Peeler: tx({ id: "Item.Peeler", atlas: 0, x: 344, y: 762, width: 36, height: 62 }),
      PepperShaker: tx({ id: "Item.PepperShaker", atlas: 0, x: 645, y: 884, width: 32, height: 56 }),
      Platter: tx({ id: "Item.Platter", atlas: 0, x: 0, y: 1754, width: 144, height: 38 }),
      Potato: tx({ id: "Item.Potato", atlas: 0, x: 0, y: 1703, width: 156, height: 50 }),
      SaltShaker: tx({ id: "Item.SaltShaker", atlas: 0, x: 2004, y: 48, width: 32, height: 56 }),
      ScooperWithLatke: tx({ id: "Item.ScooperWithLatke", atlas: 0, x: 186, y: 1922, width: 48, height: 42 }),
      Scooper: tx({ id: "Item.Scooper", atlas: 0, x: 194, y: 1965, width: 48, height: 42 }),
      Skillet: tx({ id: "Item.Skillet", atlas: 0, x: 103, y: 2005, width: 90, height: 20 }),
      SmokeAlarm: tx({ id: "Item.SmokeAlarm", atlas: 0, x: 2004, y: 521, width: 40, height: 42 }),
      Smoke: tx({ id: "Item.Smoke", atlas: 0, x: 678, y: 884, width: 10, height: 20 }),
      WhiskyGlassFull: tx({ id: "Item.WhiskyGlassFull", atlas: 0, x: 975, y: 838, width: 26, height: 36 }),
      WhiskyGlass: tx({ id: "Item.WhiskyGlass", atlas: 0, x: 975, y: 875, width: 26, height: 36 }),
      Whisky: tx({ id: "Item.Whisky", atlas: 0, x: 645, y: 941, width: 36, height: 56 }),
    },
    Shapes: {
      Mess0: tx({ id: "Shapes.Mess0", atlas: 0, x: 1670, y: 311, width: 148, height: 18 }),
      RadiatingRectangle64px32px: tx({ id: "Shapes.RadiatingRectangle64px32px", atlas: 0, x: 111, y: 1970, width: 64, height: 32 }),
      Square32: tx({ id: "Shapes.Square32", atlas: 0, x: 2004, y: 593, width: 32, height: 32 }),
    },
    Title: {
      LetsGo: tx({ id: "Title.LetsGo", atlas: 0, x: 1002, y: 113, width: 166, height: 52 }),
      Name: tx({ id: "Title.Name", atlas: 0, x: 501, y: 394, width: 500, height: 280 }),
    },
    Ui: {
      Error: tx({ id: "Ui.Error", atlas: 0, x: 1002, y: 611, width: 500, height: 280 }),
      Info: tx({ id: "Ui.Info", atlas: 0, x: 1503, y: 611, width: 500, height: 280 }),
      PlatterOutline: tx({ id: "Ui.PlatterOutline", atlas: 0, x: 0, y: 1646, width: 158, height: 56 }),
      Target: tx({ id: "Ui.Target", atlas: 0, x: 210, y: 1813, width: 22, height: 34 }),
      WhiskyOutline: tx({ id: "Ui.WhiskyOutline", atlas: 0, x: 186, y: 1865, width: 46, height: 56 }),
    },
    World: {
      Bricks: tx({ id: "World.Bricks", atlas: 0, x: 0, y: 1419, width: 202, height: 104 }),
      DinnerTable: tx({ id: "World.DinnerTable", atlas: 0, x: 690, y: 838, width: 284, height: 148 }),
      Grass0: tx({ id: "World.Grass0", atlas: 0, x: 2004, y: 626, width: 32, height: 22 }),
      RecipeBookClosed: tx({ id: "World.RecipeBookClosed", atlas: 0, x: 466, y: 884, width: 178, height: 230 }),
      RecipeBookOpened: tx({ id: "World.RecipeBookOpened", atlas: 0, x: 1670, y: 49, width: 332, height: 226 }),
      RecipeStepComplete0: tx({ id: "World.RecipeStepComplete0", atlas: 0, x: 1002, y: 322, width: 112, height: 6 }),
      Shelf: tx({ id: "World.Shelf", atlas: 0, x: 1002, y: 166, width: 164, height: 146 }),
      Splotch0: tx({ id: "World.Splotch0", atlas: 0, x: 0, y: 1970, width: 110, height: 34 }),
      Stove: tx({ id: "World.Stove", atlas: 0, x: 279, y: 884, width: 186, height: 276 }),
      Text: {
        Birds: tx({ id: "World.Text.Birds", atlas: 0, x: 113, y: 1875, width: 72, height: 94 }),
        Brown: tx({ id: "World.Text.Brown", atlas: 0, x: 1922, y: 0, width: 124, height: 22 }),
        Cooking: tx({ id: "World.Text.Cooking", atlas: 0, x: 1922, y: 23, width: 110, height: 24 }),
        Cry: tx({ id: "World.Text.Cry", atlas: 0, x: 159, y: 1646, width: 68, height: 46 }),
        DinnerTime: tx({ id: "World.Text.DinnerTime", atlas: 0, x: 1670, y: 276, width: 170, height: 28 }),
        Farm: tx({ id: "World.Text.Farm", atlas: 0, x: 103, y: 2026, width: 82, height: 20 }),
        Kitchen: tx({ id: "World.Text.Kitchen", atlas: 0, x: 0, y: 1793, width: 128, height: 24 }),
        Pointy: tx({ id: "World.Text.Pointy", atlas: 0, x: 279, y: 762, width: 64, height: 114 }),
        PunyPotent: tx({ id: "World.Text.PunyPotent", atlas: 0, x: 0, y: 1875, width: 112, height: 94 }),
      },
      Tile0: tx({ id: "World.Tile0", atlas: 0, x: 0, y: 762, width: 278, height: 270 }),
      Tools: tx({ id: "World.Tools", atlas: 0, x: 690, y: 675, width: 296, height: 162 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
