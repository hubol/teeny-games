// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 62 }];

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
    Background: tx({ id: "Background", atlas: 0, x: 0, y: 147, width: 2112, height: 1200 }),
    Characters: {
      Chicken: {
        Black: tx({ id: "Characters.Chicken.Black", atlas: 0, x: 3250, y: 110, width: 264, height: 112 }),
        Brown: tx({ id: "Characters.Chicken.Brown", atlas: 0, x: 2605, y: 1666, width: 264, height: 112 }),
        Gray: tx({ id: "Characters.Chicken.Gray", atlas: 0, x: 2870, y: 1666, width: 264, height: 112 }),
      },
      George: {
        Walk: tx({ id: "Characters.George.Walk", atlas: 0, x: 3747, y: 1484, width: 318, height: 112 }),
      },
      Magnet: tx({ id: "Characters.Magnet", atlas: 0, x: 3747, y: 1597, width: 312, height: 106 }),
      Pete: {
        Runner: {
          East: tx({ id: "Characters.Pete.Runner.East", atlas: 0, x: 3111, y: 1506, width: 76, height: 46 }),
          North: tx({ id: "Characters.Pete.Runner.North", atlas: 0, x: 1835, y: 1713, width: 76, height: 46 }),
          South: tx({ id: "Characters.Pete.Runner.South", atlas: 0, x: 1025, y: 1890, width: 76, height: 46 }),
        },
        Walk: tx({ id: "Characters.Pete.Walk", atlas: 0, x: 1835, y: 1549, width: 240, height: 112 }),
      },
      Runner: {
        HoldingStringNorth: tx({ id: "Characters.Runner.HoldingStringNorth", atlas: 0, x: 2605, y: 1488, width: 68, height: 38 }),
        HoldingStringSouth: tx({ id: "Characters.Runner.HoldingStringSouth", atlas: 0, x: 3441, y: 57, width: 68, height: 38 }),
        Shadow: tx({ id: "Characters.Runner.Shadow", atlas: 0, x: 4060, y: 1597, width: 34, height: 38 }),
      },
      Tuna: tx({ id: "Characters.Tuna", atlas: 0, x: 0, y: 0, width: 2970, height: 146 }),
    },
    Containers: {
      GreenPepper: tx({ id: "Containers.GreenPepper", atlas: 0, x: 2966, y: 1379, width: 224, height: 126 }),
      Happy: {
        GreenPepper: tx({ id: "Containers.Happy.GreenPepper", atlas: 0, x: 2349, y: 1769, width: 224, height: 126 }),
        Mushroom: tx({ id: "Containers.Happy.Mushroom", atlas: 0, x: 2091, y: 1379, width: 292, height: 108 }),
        Onion: tx({ id: "Containers.Happy.Onion", atlas: 0, x: 2605, y: 1561, width: 272, height: 104 }),
        Tomato: tx({ id: "Containers.Happy.Tomato", atlas: 0, x: 2677, y: 1379, width: 288, height: 90 }),
      },
      Mushroom: tx({ id: "Containers.Mushroom", atlas: 0, x: 2384, y: 1379, width: 292, height: 108 }),
      Onion: tx({ id: "Containers.Onion", atlas: 0, x: 2878, y: 1561, width: 272, height: 104 }),
      Pepperoni: tx({ id: "Containers.Pepperoni", atlas: 0, x: 3747, y: 1334, width: 336, height: 149 }),
      Tomato: tx({ id: "Containers.Tomato", atlas: 0, x: 2677, y: 1470, width: 288, height: 90 }),
    },
    Effects: {
      Bubble68: tx({ id: "Effects.Bubble68", atlas: 0, x: 2971, y: 0, width: 544, height: 56 }),
      Clouds: tx({ id: "Effects.Clouds", atlas: 0, x: 1835, y: 1769, width: 256, height: 128 }),
      HeartBurst: tx({ id: "Effects.HeartBurst", atlas: 0, x: 2971, y: 57, width: 308, height: 52 }),
      Shadow256: tx({ id: "Effects.Shadow256", atlas: 0, x: 0, y: 1348, width: 1024, height: 1024 }),
      Spark: tx({ id: "Effects.Spark", atlas: 0, x: 3488, y: 232, width: 26, height: 38 }),
    },
    Faces: {
      Idle: tx({ id: "Faces.Idle", atlas: 0, x: 2113, y: 147, width: 1136, height: 150 }),
      Pepperoni: tx({ id: "Faces.Pepperoni", atlas: 0, x: 3250, y: 223, width: 128, height: 30 }),
      Pixel: {
        GreenPepper: tx({ id: "Faces.Pixel.GreenPepper", atlas: 0, x: 3379, y: 232, width: 108, height: 52 }),
        Mushroom: tx({ id: "Faces.Pixel.Mushroom", atlas: 0, x: 3250, y: 254, width: 100, height: 42 }),
        Onion: tx({ id: "Faces.Pixel.Onion", atlas: 0, x: 1835, y: 1662, width: 100, height: 50 }),
        Tomato: tx({ id: "Faces.Pixel.Tomato", atlas: 0, x: 2966, y: 1506, width: 144, height: 34 }),
      },
      Sing: tx({ id: "Faces.Sing", atlas: 0, x: 3194, y: 1183, width: 852, height: 150 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3379, y: 223, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 2971, y: 110, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3280, y: 57, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3132, y: 110, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 1578, y: 1830, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3747, y: 1704, width: 308, height: 208 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 4029, y: 0, width: 64, height: 80 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 2023, y: 1662, width: 64, height: 80 }),
    },
    Pizza: {
      CutLines: tx({ id: "Pizza.CutLines", atlas: 0, x: 3194, y: 298, width: 894, height: 884 }),
      Dough: tx({ id: "Pizza.Dough", atlas: 0, x: 3194, y: 1334, width: 552, height: 541 }),
      Mask: tx({ id: "Pizza.Mask", atlas: 0, x: 1025, y: 1348, width: 552, height: 541 }),
      Nail: tx({ id: "Pizza.Nail", atlas: 0, x: 3280, y: 92, width: 16, height: 16 }),
      Shading: tx({ id: "Pizza.Shading", atlas: 0, x: 2113, y: 298, width: 1080, height: 1080 }),
    },
    Shadows: {
      Tomato: tx({ id: "Shadows.Tomato", atlas: 0, x: 4029, y: 81, width: 62, height: 46 }),
    },
    Toppings: {
      Beef: tx({ id: "Toppings.Beef", atlas: 0, x: 4029, y: 128, width: 60, height: 60 }),
      Onion: tx({ id: "Toppings.Onion", atlas: 0, x: 3516, y: 0, width: 512, height: 278 }),
      Pepperoni0: tx({ id: "Toppings.Pepperoni0", atlas: 0, x: 2091, y: 1488, width: 256, height: 280 }),
      Pepperoni1: tx({ id: "Toppings.Pepperoni1", atlas: 0, x: 2348, y: 1488, width: 256, height: 280 }),
      Pepperoni2: tx({ id: "Toppings.Pepperoni2", atlas: 0, x: 1578, y: 1549, width: 256, height: 280 }),
      Pepperoni: tx({ id: "Toppings.Pepperoni", atlas: 0, x: 1936, y: 1662, width: 86, height: 84 }),
      Pineapple0: tx({ id: "Toppings.Pineapple0", atlas: 0, x: 2092, y: 1769, width: 256, height: 200 }),
      Pineapple1: tx({ id: "Toppings.Pineapple1", atlas: 0, x: 1835, y: 1898, width: 256, height: 180 }),
      Pixel: {
        GreenPepper: tx({ id: "Toppings.Pixel.GreenPepper", atlas: 0, x: 3135, y: 1666, width: 54, height: 52 }),
        Mushroom: tx({ id: "Toppings.Pixel.Mushroom", atlas: 0, x: 3135, y: 1719, width: 50, height: 42 }),
        Onion: tx({ id: "Toppings.Pixel.Onion", atlas: 0, x: 3135, y: 1762, width: 50, height: 50 }),
        Tomato: tx({ id: "Toppings.Pixel.Tomato", atlas: 0, x: 4047, y: 1183, width: 48, height: 34 }),
      },
      Tomato: tx({ id: "Toppings.Tomato", atlas: 0, x: 1578, y: 1348, width: 512, height: 200 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
