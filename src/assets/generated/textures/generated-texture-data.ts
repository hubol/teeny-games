// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 7 }];

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
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 257, y: 224, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 257, y: 154, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 257, y: 189, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 386, y: 224, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 107, width: 256, height: 128 }),
    },
    Library: {
      Cart: tx({ id: "Library.Cart", atlas: 0, x: 257, y: 107, width: 228, height: 46 }),
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
