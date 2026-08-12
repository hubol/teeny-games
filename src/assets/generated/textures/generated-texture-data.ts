// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 8 }];

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
    Doll: {
      Base: tx({ id: "Doll.Base", atlas: 0, x: 0, y: 209, width: 164, height: 280 }),
      Eye0: tx({ id: "Doll.Eye0", atlas: 0, x: 470, y: 0, width: 32, height: 28 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 490, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 309, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 309, y: 35, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 309, y: 70, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 165, y: 209, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 0, width: 308, height: 208 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
