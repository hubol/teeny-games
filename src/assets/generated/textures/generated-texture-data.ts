// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 16 }];

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
      Pepperoni: tx({ id: "Containers.Pepperoni", atlas: 0, x: 895, y: 0, width: 336, height: 149 }),
    },
    Faces: {
      Pepperoni: tx({ id: "Faces.Pepperoni", atlas: 0, x: 1409, y: 209, width: 128, height: 30 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 1409, y: 240, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 1798, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 1798, y: 35, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 1798, y: 70, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 1152, y: 209, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 1232, y: 0, width: 308, height: 208 }),
    },
    Pizza: {
      CutLines: tx({ id: "Pizza.CutLines", atlas: 0, x: 0, y: 0, width: 894, height: 884 }),
    },
    Toppings: {
      Beef: tx({ id: "Toppings.Beef", atlas: 0, x: 1901, y: 85, width: 60, height: 60 }),
      Pepperoni0: tx({ id: "Toppings.Pepperoni0", atlas: 0, x: 1409, y: 261, width: 256, height: 254 }),
      Pepperoni1: tx({ id: "Toppings.Pepperoni1", atlas: 0, x: 895, y: 150, width: 256, height: 264 }),
      Pepperoni2: tx({ id: "Toppings.Pepperoni2", atlas: 0, x: 1541, y: 0, width: 256, height: 260 }),
      Pepperoni: tx({ id: "Toppings.Pepperoni", atlas: 0, x: 1959, y: 0, width: 86, height: 84 }),
      Pineapple0: tx({ id: "Toppings.Pineapple0", atlas: 0, x: 1152, y: 338, width: 256, height: 184 }),
      Pineapple1: tx({ id: "Toppings.Pineapple1", atlas: 0, x: 895, y: 415, width: 256, height: 160 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
