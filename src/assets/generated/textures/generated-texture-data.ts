// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 24 }];

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
    Effects: {
      Displacement: tx({ id: "Effects.Displacement", atlas: 0, x: 3231, y: 489, width: 256, height: 256 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3745, y: 745, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3885, y: 61, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3745, y: 710, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3983, y: 0, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3488, y: 663, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 2922, y: 489, width: 308, height: 208 }),
    },
    Library: {
      BackgroundBarnes: tx({ id: "Library.BackgroundBarnes", atlas: 0, x: 3506, y: 101, width: 500, height: 280 }),
      Book: tx({ id: "Library.Book", atlas: 0, x: 3702, y: 61, width: 182, height: 32 }),
      Cart: tx({ id: "Library.Cart", atlas: 0, x: 3745, y: 663, width: 228, height: 46 }),
      Closing: tx({ id: "Library.Closing", atlas: 0, x: 2501, y: 281, width: 456, height: 12 }),
      Feces: tx({ id: "Library.Feces", atlas: 0, x: 3874, y: 745, width: 28, height: 28 }),
    },
    Lottie: {
      Push: tx({ id: "Lottie.Push", atlas: 0, x: 3001, y: 101, width: 504, height: 106 }),
    },
    Reading: {
      Background: tx({ id: "Reading.Background", atlas: 0, x: 3001, y: 208, width: 500, height: 280 }),
      Book: tx({ id: "Reading.Book", atlas: 0, x: 2501, y: 294, width: 420, height: 280 }),
      Instructions: tx({ id: "Reading.Instructions", atlas: 0, x: 3502, y: 382, width: 500, height: 280 }),
      Lottie: tx({ id: "Reading.Lottie", atlas: 0, x: 3001, y: 0, width: 700, height: 100 }),
      ScoreBad: tx({ id: "Reading.ScoreBad", atlas: 0, x: 2922, y: 294, width: 66, height: 34 }),
      ScoreGood: tx({ id: "Reading.ScoreGood", atlas: 0, x: 3983, y: 25, width: 68, height: 34 }),
      ScoreOk: tx({ id: "Reading.ScoreOk", atlas: 0, x: 3974, y: 663, width: 60, height: 34 }),
    },
    Tbell: {
      RetryMask: tx({ id: "Tbell.RetryMask", atlas: 0, x: 3702, y: 0, width: 280, height: 60 }),
      Retry: tx({ id: "Tbell.Retry", atlas: 0, x: 3906, y: 710, width: 136, height: 48 }),
      Scene0: tx({ id: "Tbell.Scene0", atlas: 0, x: 0, y: 0, width: 3000, height: 280 }),
      Scene1: tx({ id: "Tbell.Scene1", atlas: 0, x: 0, y: 281, width: 2500, height: 280 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
