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
    Character: {
      MishaHand: tx({ id: "Character.MishaHand", atlas: 0, x: 0, y: 811, width: 44, height: 50 }),
      Misha: tx({ id: "Character.Misha", atlas: 0, x: 0, y: 0, width: 380, height: 86 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 752, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 0, y: 682, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 0, y: 717, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 0, y: 761, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 296, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 87, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 0, y: 425, width: 256, height: 256 }),
    },
    Item: {
      Skillet: tx({ id: "Item.Skillet", atlas: 0, x: 0, y: 786, width: 86, height: 24 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
