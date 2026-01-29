// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 5 }];

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
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 199, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 0, y: 129, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 0, y: 164, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 0, y: 208, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 0, width: 256, height: 128 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
