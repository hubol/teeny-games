// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 18 }];

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
    Containers: {
      Pepperoni: tx({ id: "Containers.Pepperoni", atlas: 0, x: 0, y: 302, width: 336, height: 149 }),
    },
    Faces: {
      Idle: tx({ id: "Faces.Idle", atlas: 0, x: 0, y: 0, width: 1136, height: 150 }),
      Pepperoni: tx({ id: "Faces.Pepperoni", atlas: 0, x: 514, y: 511, width: 128, height: 30 }),
      Sing: tx({ id: "Faces.Sing", atlas: 0, x: 0, y: 151, width: 852, height: 150 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 514, y: 542, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 646, y: 302, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 646, y: 337, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 514, y: 551, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 257, y: 511, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 337, y: 302, width: 308, height: 208 }),
    },
    Pizza: {
      CutLines: tx({ id: "Pizza.CutLines", atlas: 0, x: 1137, y: 0, width: 894, height: 884 }),
    },
    Toppings: {
      Beef: tx({ id: "Toppings.Beef", atlas: 0, x: 514, y: 661, width: 60, height: 60 }),
      Pepperoni0: tx({ id: "Toppings.Pepperoni0", atlas: 0, x: 853, y: 151, width: 256, height: 280 }),
      Pepperoni1: tx({ id: "Toppings.Pepperoni1", atlas: 0, x: 0, y: 452, width: 256, height: 280 }),
      Pepperoni2: tx({ id: "Toppings.Pepperoni2", atlas: 0, x: 646, y: 432, width: 256, height: 280 }),
      Pepperoni: tx({ id: "Toppings.Pepperoni", atlas: 0, x: 514, y: 576, width: 86, height: 84 }),
      Pineapple0: tx({ id: "Toppings.Pineapple0", atlas: 0, x: 257, y: 640, width: 256, height: 200 }),
      Pineapple1: tx({ id: "Toppings.Pineapple1", atlas: 0, x: 0, y: 733, width: 256, height: 180 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
