// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 9 }];

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
    Background: tx({ id: "Background", atlas: 0, x: 0, y: 0, width: 2560, height: 360 }),
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3449, y: 0, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3127, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3288, y: 0, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3578, y: 0, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2870, y: 0, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 2561, y: 0, width: 308, height: 208 }),
    },
    Hubol: tx({ id: "Hubol", atlas: 0, x: 0, y: 361, width: 2240, height: 360 }),
    Kirsi: tx({ id: "Kirsi", atlas: 0, x: 0, y: 722, width: 2030, height: 360 }),
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
