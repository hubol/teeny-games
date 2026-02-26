// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 19 }];

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
      MishaHandOpened: tx({ id: "Character.MishaHandOpened", atlas: 0, x: 935, y: 155, width: 44, height: 50 }),
      MishaHand: tx({ id: "Character.MishaHand", atlas: 0, x: 980, y: 155, width: 44, height: 50 }),
      Misha: tx({ id: "Character.Misha", atlas: 0, x: 0, y: 281, width: 380, height: 86 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 810, y: 121, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 810, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 810, y: 35, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 381, y: 281, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 501, y: 209, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 501, y: 0, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 758, y: 209, width: 256, height: 256 }),
    },
    Item: {
      Box: tx({ id: "Item.Box", atlas: 0, x: 810, y: 130, width: 124, height: 56 }),
      CigaretteLit: tx({ id: "Item.CigaretteLit", atlas: 0, x: 810, y: 198, width: 66, height: 10 }),
      Cigarette: tx({ id: "Item.Cigarette", atlas: 0, x: 810, y: 187, width: 68, height: 10 }),
      Lighter: tx({ id: "Item.Lighter", atlas: 0, x: 967, y: 70, width: 18, height: 36 }),
      Potato: tx({ id: "Item.Potato", atlas: 0, x: 810, y: 70, width: 156, height: 50 }),
      Skillet: tx({ id: "Item.Skillet", atlas: 0, x: 935, y: 130, width: 86, height: 24 }),
      Smoke: tx({ id: "Item.Smoke", atlas: 0, x: 879, y: 187, width: 10, height: 20 }),
      WhiskyGlass: tx({ id: "Item.WhiskyGlass", atlas: 0, x: 971, y: 0, width: 46, height: 60 }),
    },
    Ui: {
      Error: tx({ id: "Ui.Error", atlas: 0, x: 0, y: 0, width: 500, height: 280 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
