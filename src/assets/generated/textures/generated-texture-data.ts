// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 29 }];

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
      Displacement: tx({ id: "Effects.Displacement", atlas: 0, x: 922, y: 562, width: 256, height: 256 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3001, y: 272, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3506, y: 134, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3506, y: 169, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3991, y: 356, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3734, y: 356, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3702, y: 0, width: 308, height: 208 }),
    },
    Library: {
      BackgroundBarnesNoLabel: tx({ id: "Library.BackgroundBarnesNoLabel", atlas: 0, x: 2501, y: 539, width: 500, height: 280 }),
      BackgroundBarnes: tx({ id: "Library.BackgroundBarnes", atlas: 0, x: 3002, y: 539, width: 500, height: 280 }),
      Book: tx({ id: "Library.Book", atlas: 0, x: 3506, y: 101, width: 182, height: 32 }),
      Cart: tx({ id: "Library.Cart", atlas: 0, x: 3734, y: 485, width: 228, height: 46 }),
      Closing: tx({ id: "Library.Closing", atlas: 0, x: 3001, y: 208, width: 456, height: 12 }),
      Feces: tx({ id: "Library.Feces", atlas: 0, x: 3667, y: 134, width: 28, height: 28 }),
    },
    Lottie: {
      Push: tx({ id: "Lottie.Push", atlas: 0, x: 3001, y: 101, width: 504, height: 106 }),
    },
    Reading: {
      Background: tx({ id: "Reading.Background", atlas: 0, x: 3503, y: 539, width: 500, height: 280 }),
      Book: tx({ id: "Reading.Book", atlas: 0, x: 501, y: 562, width: 420, height: 280 }),
      Instructions: tx({ id: "Reading.Instructions", atlas: 0, x: 0, y: 562, width: 500, height: 280 }),
      Lottie: tx({ id: "Reading.Lottie", atlas: 0, x: 3001, y: 0, width: 700, height: 100 }),
      ScoreBad: tx({ id: "Reading.ScoreBad", atlas: 0, x: 4011, y: 0, width: 66, height: 34 }),
      ScoreGood: tx({ id: "Reading.ScoreGood", atlas: 0, x: 3876, y: 230, width: 68, height: 34 }),
      ScoreOk: tx({ id: "Reading.ScoreOk", atlas: 0, x: 3963, y: 485, width: 60, height: 34 }),
    },
    Tbell: {
      RetryMask: tx({ id: "Tbell.RetryMask", atlas: 0, x: 3458, y: 209, width: 280, height: 60 }),
      Retry: tx({ id: "Tbell.Retry", atlas: 0, x: 3739, y: 230, width: 136, height: 48 }),
      Scene0: tx({ id: "Tbell.Scene0", atlas: 0, x: 0, y: 0, width: 3000, height: 280 }),
      Scene1: tx({ id: "Tbell.Scene1", atlas: 0, x: 0, y: 281, width: 2500, height: 280 }),
    },
    Title: {
      Lottie: tx({ id: "Title.Lottie", atlas: 0, x: 2501, y: 356, width: 1232, height: 182 }),
      PressSpace: tx({ id: "Title.PressSpace", atlas: 0, x: 3739, y: 209, width: 142, height: 20 }),
      Subtitle: tx({ id: "Title.Subtitle", atlas: 0, x: 2501, y: 281, width: 1568, height: 74 }),
      Title: tx({ id: "Title.Title", atlas: 0, x: 3001, y: 221, width: 438, height: 50 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
