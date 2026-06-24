// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 12 }];

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
    Cloud: tx({ id: "Cloud", atlas: 0, x: 758, y: 0, width: 240, height: 60 }),
    DogBark: tx({ id: "DogBark", atlas: 0, x: 501, y: 129, width: 128, height: 128 }),
    Dog: tx({ id: "Dog", atlas: 0, x: 630, y: 131, width: 128, height: 128 }),
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 501, y: 258, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 758, y: 61, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 758, y: 96, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 919, y: 61, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 501, y: 0, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 281, width: 308, height: 208 }),
    },
    GrandCanyon: tx({ id: "GrandCanyon", atlas: 0, x: 0, y: 0, width: 500, height: 280 }),
    PumpkinGuyStep: tx({ id: "PumpkinGuyStep", atlas: 0, x: 759, y: 131, width: 128, height: 128 }),
    PumpkinGuy: tx({ id: "PumpkinGuy", atlas: 0, x: 888, y: 131, width: 128, height: 128 }),
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
