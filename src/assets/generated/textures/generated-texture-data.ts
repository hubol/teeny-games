// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 22 }];

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
    Background: tx({ id: "Background", atlas: 0, x: 0, y: 0, width: 1920, height: 1440 }),
    Characters: {
      Tuna: tx({ id: "Characters.Tuna", atlas: 0, x: 1921, y: 0, width: 1024, height: 508 }),
    },
    Containers: {
      Pepperoni: tx({ id: "Containers.Pepperoni", atlas: 0, x: 2466, y: 660, width: 336, height: 149 }),
    },
    Effects: {
      Bubble68: tx({ id: "Effects.Bubble68", atlas: 0, x: 1921, y: 660, width: 544, height: 56 }),
    },
    Faces: {
      Idle: tx({ id: "Faces.Idle", atlas: 0, x: 0, y: 1441, width: 1136, height: 150 }),
      Pepperoni: tx({ id: "Faces.Pepperoni", atlas: 0, x: 2803, y: 579, width: 128, height: 30 }),
      Sing: tx({ id: "Faces.Sing", atlas: 0, x: 1921, y: 509, width: 852, height: 150 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 2803, y: 610, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 2774, y: 509, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 2774, y: 544, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 2774, y: 619, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 1921, y: 1199, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 2434, y: 810, width: 308, height: 208 }),
    },
    Pizza: {
      CutLines: tx({ id: "Pizza.CutLines", atlas: 0, x: 2946, y: 0, width: 894, height: 884 }),
    },
    Toppings: {
      Beef: tx({ id: "Toppings.Beef", atlas: 0, x: 2877, y: 619, width: 60, height: 60 }),
      Pepperoni0: tx({ id: "Toppings.Pepperoni0", atlas: 0, x: 1921, y: 918, width: 256, height: 280 }),
      Pepperoni1: tx({ id: "Toppings.Pepperoni1", atlas: 0, x: 2743, y: 885, width: 256, height: 280 }),
      Pepperoni2: tx({ id: "Toppings.Pepperoni2", atlas: 0, x: 2178, y: 1019, width: 256, height: 280 }),
      Pepperoni: tx({ id: "Toppings.Pepperoni", atlas: 0, x: 2178, y: 918, width: 86, height: 84 }),
      Pineapple0: tx({ id: "Toppings.Pineapple0", atlas: 0, x: 2435, y: 1019, width: 256, height: 200 }),
      Pineapple1: tx({ id: "Toppings.Pineapple1", atlas: 0, x: 3000, y: 885, width: 256, height: 180 }),
      Tomato: tx({ id: "Toppings.Tomato", atlas: 0, x: 1921, y: 717, width: 512, height: 200 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
