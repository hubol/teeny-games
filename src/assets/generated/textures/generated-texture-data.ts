// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 98 }];

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
        Black: tx({ id: "Characters.Chicken.Black", atlas: 0, x: 2876, y: 1613, width: 264, height: 112 }),
        Brown: tx({ id: "Characters.Chicken.Brown", atlas: 0, x: 2876, y: 1726, width: 264, height: 112 }),
        Gray: tx({ id: "Characters.Chicken.Gray", atlas: 0, x: 3141, y: 1788, width: 264, height: 112 }),
        Runners: {
          Black: {
            East: tx({ id: "Characters.Chicken.Runners.Black.East", atlas: 0, x: 3767, y: 91, width: 76, height: 34 }),
            North: tx({ id: "Characters.Chicken.Runners.Black.North", atlas: 0, x: 3985, y: 1839, width: 76, height: 34 }),
            South: tx({ id: "Characters.Chicken.Runners.Black.South", atlas: 0, x: 3985, y: 1874, width: 76, height: 34 }),
          },
          Brown: {
            East: tx({ id: "Characters.Chicken.Runners.Brown.East", atlas: 0, x: 3985, y: 1909, width: 76, height: 34 }),
            North: tx({ id: "Characters.Chicken.Runners.Brown.North", atlas: 0, x: 3920, y: 1944, width: 76, height: 34 }),
            South: tx({ id: "Characters.Chicken.Runners.Brown.South", atlas: 0, x: 3997, y: 1944, width: 76, height: 34 }),
          },
          Gray: {
            East: tx({ id: "Characters.Chicken.Runners.Gray.East", atlas: 0, x: 3920, y: 1979, width: 76, height: 34 }),
            North: tx({ id: "Characters.Chicken.Runners.Gray.North", atlas: 0, x: 3997, y: 1979, width: 76, height: 34 }),
            South: tx({ id: "Characters.Chicken.Runners.Gray.South", atlas: 0, x: 3920, y: 2014, width: 76, height: 34 }),
          },
        },
      },
      George: {
        Runner: {
          East: tx({ id: "Characters.George.Runner.East", atlas: 0, x: 3054, y: 1839, width: 84, height: 42 }),
          North: tx({ id: "Characters.George.Runner.North", atlas: 0, x: 3982, y: 1757, width: 84, height: 40 }),
          South: tx({ id: "Characters.George.Runner.South", atlas: 0, x: 3982, y: 1798, width: 84, height: 40 }),
        },
        Walk: tx({ id: "Characters.George.Walk", atlas: 0, x: 3763, y: 1228, width: 318, height: 112 }),
      },
      Magnet: tx({ id: "Characters.Magnet", atlas: 0, x: 3763, y: 1341, width: 312, height: 106 }),
      Mystery: tx({ id: "Characters.Mystery", atlas: 0, x: 2556, y: 1932, width: 48, height: 48 }),
      Pete: {
        Runner: {
          East: tx({ id: "Characters.Pete.Runner.East", atlas: 0, x: 3997, y: 2014, width: 76, height: 46 }),
          North: tx({ id: "Characters.Pete.Runner.North", atlas: 0, x: 3348, y: 1935, width: 76, height: 46 }),
          South: tx({ id: "Characters.Pete.Runner.South", atlas: 0, x: 3263, y: 1953, width: 76, height: 46 }),
        },
        Walk: tx({ id: "Characters.Pete.Walk", atlas: 0, x: 3846, y: 0, width: 240, height: 112 }),
      },
      Runner: {
        HoldingStringNorth: tx({ id: "Characters.Runner.HoldingStringNorth", atlas: 0, x: 3425, y: 1935, width: 68, height: 38 }),
        HoldingStringSouth: tx({ id: "Characters.Runner.HoldingStringSouth", atlas: 0, x: 3494, y: 1935, width: 68, height: 38 }),
        Shadow: tx({ id: "Characters.Runner.Shadow", atlas: 0, x: 4062, y: 1839, width: 34, height: 38 }),
      },
      Tuna: tx({ id: "Characters.Tuna", atlas: 0, x: 0, y: 0, width: 2970, height: 146 }),
    },
    Condiments: {
      Drawer: tx({ id: "Condiments.Drawer", atlas: 0, x: 2908, y: 1379, width: 286, height: 128 }),
      HotSauce: tx({ id: "Condiments.HotSauce", atlas: 0, x: 2106, y: 2096, width: 192, height: 132 }),
      Parmesan: tx({ id: "Condiments.Parmesan", atlas: 0, x: 545, y: 4007, width: 232, height: 82 }),
      Ranch: tx({ id: "Condiments.Ranch", atlas: 0, x: 2331, y: 2059, width: 200, height: 124 }),
    },
    Containers: {
      GreenPepper: tx({ id: "Containers.GreenPepper", atlas: 0, x: 2363, y: 1580, width: 224, height: 126 }),
      Happy: {
        GreenPepper: tx({ id: "Containers.Happy.GreenPepper", atlas: 0, x: 2331, y: 1932, width: 224, height: 126 }),
        Kiwi: tx({ id: "Containers.Happy.Kiwi", atlas: 0, x: 2845, y: 1839, width: 208, height: 102 }),
        MandarinOrange: tx({ id: "Containers.Happy.MandarinOrange", atlas: 0, x: 3452, y: 1507, width: 272, height: 96 }),
        Mushroom: tx({ id: "Containers.Happy.Mushroom", atlas: 0, x: 2971, y: 0, width: 292, height: 108 }),
        Onion: tx({ id: "Containers.Happy.Onion", atlas: 0, x: 3452, y: 1604, width: 272, height: 104 }),
        Pineapple: tx({ id: "Containers.Happy.Pineapple", atlas: 0, x: 2620, y: 1751, width: 224, height: 234 }),
        Strawberry: tx({ id: "Containers.Happy.Strawberry", atlas: 0, x: 2845, y: 1942, width: 204, height: 106 }),
        Tomato: tx({ id: "Containers.Happy.Tomato", atlas: 0, x: 3557, y: 0, width: 288, height: 90 }),
      },
      Kiwi: tx({ id: "Containers.Kiwi", atlas: 0, x: 3054, y: 1901, width: 208, height: 102 }),
      MandarinOrange: tx({ id: "Containers.MandarinOrange", atlas: 0, x: 3452, y: 1709, width: 272, height: 96 }),
      Mushroom: tx({ id: "Containers.Mushroom", atlas: 0, x: 3264, y: 0, width: 292, height: 108 }),
      Onion: tx({ id: "Containers.Onion", atlas: 0, x: 2876, y: 1508, width: 272, height: 104 }),
      Pepperoni: tx({ id: "Containers.Pepperoni", atlas: 0, x: 853, y: 3314, width: 336, height: 149 }),
      Pineapple: tx({ id: "Containers.Pineapple", atlas: 0, x: 2106, y: 1861, width: 224, height: 234 }),
      Strawberry: tx({ id: "Containers.Strawberry", atlas: 0, x: 2556, y: 1986, width: 204, height: 106 }),
      Tomato: tx({ id: "Containers.Tomato", atlas: 0, x: 2619, y: 1379, width: 288, height: 90 }),
    },
    Effects: {
      Bubble68: tx({ id: "Effects.Bubble68", atlas: 0, x: 0, y: 4007, width: 544, height: 56 }),
      Clouds: tx({ id: "Effects.Clouds", atlas: 0, x: 3725, y: 1710, width: 256, height: 128 }),
      CondimentDripLanded: tx({ id: "Effects.CondimentDripLanded", atlas: 0, x: 778, y: 4007, width: 136, height: 88 }),
      CondimentDrip: tx({ id: "Effects.CondimentDrip", atlas: 0, x: 915, y: 4007, width: 136, height: 88 }),
      HeartBurst: tx({ id: "Effects.HeartBurst", atlas: 0, x: 3763, y: 1448, width: 308, height: 52 }),
      Shadow256: tx({ id: "Effects.Shadow256", atlas: 0, x: 1081, y: 1348, width: 1024, height: 1024 }),
      Spark: tx({ id: "Effects.Spark", atlas: 0, x: 4067, y: 1757, width: 26, height: 38 }),
    },
    Faces: {
      Idle: tx({ id: "Faces.Idle", atlas: 0, x: 2113, y: 1228, width: 1136, height: 150 }),
      Pepperoni: tx({ id: "Faces.Pepperoni", atlas: 0, x: 0, y: 4064, width: 128, height: 30 }),
      Pixel: {
        GreenPepper: tx({ id: "Faces.Pixel.GreenPepper", atlas: 0, x: 3557, y: 91, width: 108, height: 52 }),
        Kiwi: tx({ id: "Faces.Pixel.Kiwi", atlas: 0, x: 3982, y: 1710, width: 96, height: 46 }),
        MandarinOrange: tx({ id: "Faces.Pixel.MandarinOrange", atlas: 0, x: 3293, y: 109, width: 96, height: 34 }),
        Mushroom: tx({ id: "Faces.Pixel.Mushroom", atlas: 0, x: 2363, y: 1707, width: 100, height: 42 }),
        Onion: tx({ id: "Faces.Pixel.Onion", atlas: 0, x: 3666, y: 91, width: 100, height: 50 }),
        Pineapple: tx({ id: "Faces.Pixel.Pineapple", atlas: 0, x: 2464, y: 1707, width: 100, height: 38 }),
        Strawberry: tx({ id: "Faces.Pixel.Strawberry", atlas: 0, x: 3263, y: 1910, width: 84, height: 42 }),
        Tomato: tx({ id: "Faces.Pixel.Tomato", atlas: 0, x: 3390, y: 109, width: 96, height: 34 }),
      },
      Sing: tx({ id: "Faces.Sing", atlas: 0, x: 0, y: 3314, width: 852, height: 150 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3263, y: 1901, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 2971, y: 109, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3132, y: 109, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 129, y: 4064, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3406, y: 1806, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3763, y: 1501, width: 308, height: 208 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 2761, y: 1986, width: 64, height: 80 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 3920, y: 1839, width: 64, height: 80 }),
    },
    Pizza: {
      CutLines: tx({ id: "Pizza.CutLines", atlas: 0, x: 0, y: 2429, width: 894, height: 884 }),
      Dough: tx({ id: "Pizza.Dough", atlas: 0, x: 0, y: 3465, width: 552, height: 541 }),
      Mask: tx({ id: "Pizza.Mask", atlas: 0, x: 553, y: 3465, width: 552, height: 541 }),
      Nail: tx({ id: "Pizza.Nail", atlas: 0, x: 3406, y: 1788, width: 16, height: 16 }),
      Shading: tx({ id: "Pizza.Shading", atlas: 0, x: 0, y: 1348, width: 1080, height: 1080 }),
    },
    Screenshot: tx({ id: "Screenshot", atlas: 0, x: 2113, y: 147, width: 1920, height: 1080 }),
    Shadows: {
      Tomato: tx({ id: "Shadows.Tomato", atlas: 0, x: 4034, y: 113, width: 62, height: 46 }),
    },
    Toppings: {
      Beef: tx({ id: "Toppings.Beef", atlas: 0, x: 4034, y: 160, width: 60, height: 60 }),
      Onion: tx({ id: "Toppings.Onion", atlas: 0, x: 3250, y: 1228, width: 512, height: 278 }),
      Pepperoni0: tx({ id: "Toppings.Pepperoni0", atlas: 0, x: 2619, y: 1470, width: 256, height: 280 }),
      Pepperoni1: tx({ id: "Toppings.Pepperoni1", atlas: 0, x: 2106, y: 1580, width: 256, height: 280 }),
      Pepperoni2: tx({ id: "Toppings.Pepperoni2", atlas: 0, x: 3195, y: 1507, width: 256, height: 280 }),
      Pepperoni: tx({ id: "Toppings.Pepperoni", atlas: 0, x: 1052, y: 4007, width: 86, height: 84 }),
      Pineapple0: tx({ id: "Toppings.Pineapple0", atlas: 0, x: 3663, y: 1839, width: 256, height: 200 }),
      Pineapple1: tx({ id: "Toppings.Pineapple1", atlas: 0, x: 2363, y: 1751, width: 256, height: 180 }),
      Pixel: {
        GreenPepper: tx({ id: "Toppings.Pixel.GreenPepper", atlas: 0, x: 3195, y: 1379, width: 54, height: 52 }),
        Kiwi: tx({ id: "Toppings.Pixel.Kiwi", atlas: 0, x: 3141, y: 1703, width: 48, height: 46 }),
        MandarinOrange: tx({ id: "Toppings.Pixel.MandarinOrange", atlas: 0, x: 3487, y: 109, width: 48, height: 34 }),
        Mushroom: tx({ id: "Toppings.Pixel.Mushroom", atlas: 0, x: 2565, y: 1707, width: 50, height: 42 }),
        Onion: tx({ id: "Toppings.Pixel.Onion", atlas: 0, x: 3141, y: 1613, width: 50, height: 50 }),
        Pineapple: tx({ id: "Toppings.Pixel.Pineapple", atlas: 0, x: 3141, y: 1664, width: 50, height: 38 }),
        Strawberry: tx({ id: "Toppings.Pixel.Strawberry", atlas: 0, x: 3149, y: 1508, width: 42, height: 42 }),
        Tomato: tx({ id: "Toppings.Pixel.Tomato", atlas: 0, x: 3141, y: 1750, width: 48, height: 34 }),
      },
      Tomato: tx({ id: "Toppings.Tomato", atlas: 0, x: 2106, y: 1379, width: 512, height: 200 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
