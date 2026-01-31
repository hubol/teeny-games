// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 10 }];

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
      Displacement: tx({ id: "Effects.Displacement", atlas: 0, x: 505, y: 0, width: 256, height: 256 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 501, y: 257, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 762, y: 209, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 762, y: 244, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 630, y: 257, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 762, y: 0, width: 256, height: 128 }),
    },
    Library: {
      BackgroundBarnes: tx({ id: "Library.BackgroundBarnes", atlas: 0, x: 0, y: 107, width: 500, height: 280 }),
      Book: tx({ id: "Library.Book", atlas: 0, x: 762, y: 176, width: 182, height: 32 }),
      Cart: tx({ id: "Library.Cart", atlas: 0, x: 762, y: 129, width: 228, height: 46 }),
    },
    Lottie: {
      Push: tx({ id: "Lottie.Push", atlas: 0, x: 0, y: 0, width: 504, height: 106 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
