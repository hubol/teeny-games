// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 45 }];

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
    FinishLine: tx({ id: "FinishLine", atlas: 0, x: 772, y: 258, width: 32, height: 128 }),
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 121, y: 734, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 378, y: 639, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 611, y: 258, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 501, y: 258, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 121, y: 546, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 501, y: 0, width: 308, height: 208 }),
      Thickit: tx({ id: "Font.Thickit", atlas: 0, x: 0, y: 1003, width: 128, height: 16 }),
    },
    Fruit: tx({ id: "Fruit", atlas: 0, x: 501, y: 209, width: 308, height: 48 }),
    Kitty: {
      Overlay: tx({ id: "Kitty.Overlay", atlas: 0, x: 0, y: 0, width: 500, height: 290 }),
      Planet: tx({ id: "Kitty.Planet", atlas: 0, x: 810, y: 107, width: 166, height: 148 }),
      Runnin: tx({ id: "Kitty.Runnin", atlas: 0, x: 400, y: 291, width: 144, height: 66 }),
      Stars: tx({ id: "Kitty.Stars", atlas: 0, x: 0, y: 750, width: 428, height: 252 }),
      Treat: tx({ id: "Kitty.Treat", atlas: 0, x: 981, y: 89, width: 36, height: 16 }),
      Ufo: tx({ id: "Kitty.Ufo", atlas: 0, x: 121, y: 675, width: 190, height: 58 }),
      Voice: tx({ id: "Kitty.Voice", atlas: 0, x: 212, y: 1003, width: 64, height: 20 }),
    },
    PipeDojo: tx({ id: "PipeDojo", atlas: 0, x: 400, y: 524, width: 54, height: 20 }),
    PipeGallery: tx({ id: "PipeGallery", atlas: 0, x: 316, y: 1003, width: 36, height: 18 }),
    Pipe: tx({ id: "Pipe", atlas: 0, x: 129, y: 1003, width: 82, height: 18 }),
    Shapes: {
      Ellipse64px24px: tx({ id: "Shapes.Ellipse64px24px", atlas: 0, x: 545, y: 283, width: 64, height: 24 }),
      HalfEllipse48px48px: tx({ id: "Shapes.HalfEllipse48px48px", atlas: 0, x: 975, y: 256, width: 48, height: 48 }),
      Square16px: tx({ id: "Shapes.Square16px", atlas: 0, x: 545, y: 341, width: 16, height: 16 }),
    },
    Title: tx({ id: "Title", atlas: 0, x: 312, y: 675, width: 186, height: 70 }),
    World: {
      Blob278px253px: tx({ id: "World.Blob278px253px", atlas: 0, x: 121, y: 291, width: 278, height: 254 }),
      Brush164px64px: tx({ id: "World.Brush164px64px", atlas: 0, x: 810, y: 256, width: 164, height: 64 }),
      CompleteStar: tx({ id: "World.CompleteStar", atlas: 0, x: 400, y: 481, width: 72, height: 42 }),
      Disabled: tx({ id: "World.Disabled", atlas: 0, x: 546, y: 433, width: 68, height: 70 }),
      EngeniuxIdea: tx({ id: "World.EngeniuxIdea", atlas: 0, x: 503, y: 358, width: 76, height: 74 }),
      Grass0: tx({ id: "World.Grass0", atlas: 0, x: 277, y: 1003, width: 38, height: 20 }),
      GuardianCat: tx({ id: "World.GuardianCat", atlas: 0, x: 473, y: 481, width: 72, height: 58 }),
      HolyLight: tx({ id: "World.HolyLight", atlas: 0, x: 0, y: 291, width: 120, height: 458 }),
      House: tx({ id: "World.House", atlas: 0, x: 611, y: 293, width: 160, height: 96 }),
      Lair: tx({ id: "World.Lair", atlas: 0, x: 378, y: 546, width: 232, height: 92 }),
      OverworldForest: tx({ id: "World.OverworldForest", atlas: 0, x: 810, y: 0, width: 170, height: 106 }),
      Pedestal: tx({ id: "World.Pedestal", atlas: 0, x: 977, y: 107, width: 46, height: 46 }),
      Pedestal1: tx({ id: "World.Pedestal1", atlas: 0, x: 977, y: 154, width: 46, height: 46 }),
      Pedestal2: tx({ id: "World.Pedestal2", atlas: 0, x: 977, y: 201, width: 46, height: 46 }),
      SecretFail: tx({ id: "World.SecretFail", atlas: 0, x: 265, y: 734, width: 12, height: 12 }),
      SecretPass: tx({ id: "World.SecretPass", atlas: 0, x: 250, y: 734, width: 14, height: 12 }),
      Secret: tx({ id: "World.Secret", atlas: 0, x: 580, y: 398, width: 20, height: 32 }),
      Speckles64px32px: tx({ id: "World.Speckles64px32px", atlas: 0, x: 545, y: 308, width: 64, height: 32 }),
      SquiggleArch102px90px: tx({ id: "World.SquiggleArch102px90px", atlas: 0, x: 400, y: 390, width: 102, height: 90 }),
      SquiggleLine20px56px: tx({ id: "World.SquiggleLine20px56px", atlas: 0, x: 580, y: 341, width: 20, height: 56 }),
      Sword: tx({ id: "World.Sword", atlas: 0, x: 981, y: 0, width: 42, height: 88 }),
      WallOutlet: tx({ id: "World.WallOutlet", atlas: 0, x: 546, y: 504, width: 18, height: 36 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
