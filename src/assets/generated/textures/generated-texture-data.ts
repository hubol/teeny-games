// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 104 }];

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
      Balloon: {
        Layers: tx({ id: "Characters.Balloon.Layers", atlas: 0, x: 2113, y: 1228, width: 1364, height: 322 }),
      },
      Chicken: {
        Black: tx({ id: "Characters.Chicken.Black", atlas: 0, x: 1183, y: 3882, width: 264, height: 112 }),
        Brown: tx({ id: "Characters.Chicken.Brown", atlas: 0, x: 1204, y: 2524, width: 264, height: 112 }),
        Gray: tx({ id: "Characters.Chicken.Gray", atlas: 0, x: 1204, y: 2637, width: 264, height: 112 }),
        Runners: {
          Black: {
            East: tx({ id: "Characters.Chicken.Runners.Black.East", atlas: 0, x: 1365, y: 2750, width: 76, height: 34 }),
            North: tx({ id: "Characters.Chicken.Runners.Black.North", atlas: 0, x: 1365, y: 3995, width: 76, height: 34 }),
            South: tx({ id: "Characters.Chicken.Runners.Black.South", atlas: 0, x: 1450, y: 4039, width: 76, height: 34 }),
          },
          Brown: {
            East: tx({ id: "Characters.Chicken.Runners.Brown.East", atlas: 0, x: 1527, y: 4039, width: 76, height: 34 }),
            North: tx({ id: "Characters.Chicken.Runners.Brown.North", atlas: 0, x: 1604, y: 4039, width: 76, height: 34 }),
            South: tx({ id: "Characters.Chicken.Runners.Brown.South", atlas: 0, x: 1681, y: 4039, width: 76, height: 34 }),
          },
          Gray: {
            East: tx({ id: "Characters.Chicken.Runners.Gray.East", atlas: 0, x: 895, y: 3399, width: 76, height: 34 }),
            North: tx({ id: "Characters.Chicken.Runners.Gray.North", atlas: 0, x: 972, y: 3399, width: 76, height: 34 }),
            South: tx({ id: "Characters.Chicken.Runners.Gray.South", atlas: 0, x: 1990, y: 1348, width: 76, height: 34 }),
          },
        },
      },
      George: {
        Runner: {
          East: tx({ id: "Characters.George.Runner.East", atlas: 0, x: 1088, y: 4054, width: 84, height: 42 }),
          North: tx({ id: "Characters.George.Runner.North", atlas: 0, x: 1280, y: 4039, width: 84, height: 40 }),
          South: tx({ id: "Characters.George.Runner.South", atlas: 0, x: 1280, y: 3995, width: 84, height: 40 }),
        },
        Walk: tx({ id: "Characters.George.Walk", atlas: 0, x: 2971, y: 0, width: 318, height: 112 }),
      },
      Magnet: tx({ id: "Characters.Magnet", atlas: 0, x: 3290, y: 0, width: 312, height: 106 }),
      Mystery: tx({ id: "Characters.Mystery", atlas: 0, x: 4034, y: 308, width: 48, height: 48 }),
      Pete: {
        Runner: {
          East: tx({ id: "Characters.Pete.Runner.East", atlas: 0, x: 1737, y: 3112, width: 76, height: 46 }),
          North: tx({ id: "Characters.Pete.Runner.North", atlas: 0, x: 1990, y: 1383, width: 76, height: 46 }),
          South: tx({ id: "Characters.Pete.Runner.South", atlas: 0, x: 1990, y: 1430, width: 76, height: 46 }),
        },
        Walk: tx({ id: "Characters.Pete.Walk", atlas: 0, x: 1409, y: 3086, width: 240, height: 112 }),
      },
      Runner: {
        HoldingStringNorth: tx({ id: "Characters.Runner.HoldingStringNorth", atlas: 0, x: 1737, y: 3159, width: 68, height: 38 }),
        HoldingStringSouth: tx({ id: "Characters.Runner.HoldingStringSouth", atlas: 0, x: 4021, y: 0, width: 68, height: 38 }),
        Shadow: tx({ id: "Characters.Runner.Shadow", atlas: 0, x: 1417, y: 2937, width: 34, height: 38 }),
      },
      Stopwatch: tx({ id: "Characters.Stopwatch", atlas: 0, x: 2067, y: 1348, width: 32, height: 38 }),
      Tuna: tx({ id: "Characters.Tuna", atlas: 0, x: 0, y: 0, width: 2970, height: 146 }),
    },
    Condiments: {
      Drawer: tx({ id: "Condiments.Drawer", atlas: 0, x: 895, y: 2989, width: 286, height: 128 }),
      HotSauce: tx({ id: "Condiments.HotSauce", atlas: 0, x: 1883, y: 2524, width: 192, height: 132 }),
      Oregano: tx({ id: "Condiments.Oregano", atlas: 0, x: 1686, y: 2863, width: 192, height: 118 }),
      Parmesan: tx({ id: "Condiments.Parmesan", atlas: 0, x: 1184, y: 2898, width: 232, height: 82 }),
      Ranch: tx({ id: "Condiments.Ranch", atlas: 0, x: 1686, y: 2738, width: 200, height: 124 }),
    },
    Containers: {
      GreenPepper: tx({ id: "Containers.GreenPepper", atlas: 0, x: 1650, y: 2985, width: 224, height: 126 }),
      Happy: {
        GreenPepper: tx({ id: "Containers.Happy.GreenPepper", atlas: 0, x: 1580, y: 3434, width: 224, height: 126 }),
        Kiwi: tx({ id: "Containers.Happy.Kiwi", atlas: 0, x: 1469, y: 2524, width: 208, height: 102 }),
        MandarinOrange: tx({ id: "Containers.Happy.MandarinOrange", atlas: 0, x: 1182, y: 2989, width: 272, height: 96 }),
        Mushroom: tx({ id: "Containers.Happy.Mushroom", atlas: 0, x: 890, y: 3945, width: 292, height: 108 }),
        Onion: tx({ id: "Containers.Happy.Onion", atlas: 0, x: 1188, y: 2789, width: 272, height: 104 }),
        Pineapple: tx({ id: "Containers.Happy.Pineapple", atlas: 0, x: 1461, y: 2750, width: 224, height: 234 }),
        Strawberry: tx({ id: "Containers.Happy.Strawberry", atlas: 0, x: 1678, y: 2524, width: 204, height: 106 }),
        Tomato: tx({ id: "Containers.Happy.Tomato", atlas: 0, x: 3603, y: 53, width: 288, height: 90 }),
      },
      Kiwi: tx({ id: "Containers.Kiwi", atlas: 0, x: 1469, y: 2627, width: 208, height: 102 }),
      MandarinOrange: tx({ id: "Containers.MandarinOrange", atlas: 0, x: 1066, y: 3680, width: 272, height: 96 }),
      Mushroom: tx({ id: "Containers.Mushroom", atlas: 0, x: 895, y: 2789, width: 292, height: 108 }),
      Onion: tx({ id: "Containers.Onion", atlas: 0, x: 1066, y: 3777, width: 272, height: 104 }),
      Pepperoni: tx({ id: "Containers.Pepperoni", atlas: 0, x: 553, y: 3945, width: 336, height: 149 }),
      Pineapple: tx({ id: "Containers.Pineapple", atlas: 0, x: 1580, y: 3199, width: 224, height: 234 }),
      Strawberry: tx({ id: "Containers.Strawberry", atlas: 0, x: 1678, y: 2631, width: 204, height: 106 }),
      Tomato: tx({ id: "Containers.Tomato", atlas: 0, x: 895, y: 2898, width: 288, height: 90 }),
    },
    Effects: {
      Bubble68: tx({ id: "Effects.Bubble68", atlas: 0, x: 0, y: 4007, width: 544, height: 56 }),
      Clouds: tx({ id: "Effects.Clouds", atlas: 0, x: 1323, y: 3399, width: 256, height: 128 }),
      CondimentDripLanded: tx({ id: "Effects.CondimentDripLanded", atlas: 0, x: 3892, y: 53, width: 136, height: 88 }),
      CondimentDrip: tx({ id: "Effects.CondimentDrip", atlas: 0, x: 1580, y: 3561, width: 136, height: 88 }),
      HeartBurst: tx({ id: "Effects.HeartBurst", atlas: 0, x: 3603, y: 0, width: 308, height: 52 }),
      Shadow256: tx({ id: "Effects.Shadow256", atlas: 0, x: 1081, y: 1499, width: 1024, height: 1024 }),
      Spark: tx({ id: "Effects.Spark", atlas: 0, x: 1524, y: 2985, width: 26, height: 38 }),
    },
    Faces: {
      Idle: tx({ id: "Faces.Idle", atlas: 0, x: 0, y: 1348, width: 1136, height: 150 }),
      Pepperoni: tx({ id: "Faces.Pepperoni", atlas: 0, x: 1182, y: 3086, width: 128, height: 30 }),
      Pixel: {
        GreenPepper: tx({ id: "Faces.Pixel.GreenPepper", atlas: 0, x: 3912, y: 0, width: 108, height: 52 }),
        Kiwi: tx({ id: "Faces.Pixel.Kiwi", atlas: 0, x: 1183, y: 4039, width: 96, height: 46 }),
        MandarinOrange: tx({ id: "Faces.Pixel.MandarinOrange", atlas: 0, x: 991, y: 4054, width: 96, height: 34 }),
        Mushroom: tx({ id: "Faces.Pixel.Mushroom", atlas: 0, x: 890, y: 4054, width: 100, height: 42 }),
        Onion: tx({ id: "Faces.Pixel.Onion", atlas: 0, x: 1081, y: 2524, width: 100, height: 50 }),
        Pineapple: tx({ id: "Faces.Pixel.Pineapple", atlas: 0, x: 3451, y: 107, width: 100, height: 38 }),
        Strawberry: tx({ id: "Faces.Pixel.Strawberry", atlas: 0, x: 1365, y: 4039, width: 84, height: 42 }),
        Tomato: tx({ id: "Faces.Pixel.Tomato", atlas: 0, x: 1183, y: 3995, width: 96, height: 34 }),
      },
      Sing: tx({ id: "Faces.Sing", atlas: 0, x: 1137, y: 1348, width: 852, height: 150 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 1469, y: 2738, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 1204, y: 2750, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3290, y: 107, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 0, y: 4064, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 1323, y: 3528, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 895, y: 2580, width: 308, height: 208 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 1883, y: 2657, width: 64, height: 80 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 4031, y: 1228, width: 64, height: 80 }),
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 1066, y: 3882, width: 108, height: 44 }),
    },
    Pizza: {
      Cheese: tx({ id: "Pizza.Cheese", atlas: 0, x: 1455, y: 2985, width: 68, height: 56 }),
      CutLines: tx({ id: "Pizza.CutLines", atlas: 0, x: 0, y: 2580, width: 894, height: 884 }),
      Dough: tx({ id: "Pizza.Dough", atlas: 0, x: 3478, y: 1228, width: 552, height: 541 }),
      Mask: tx({ id: "Pizza.Mask", atlas: 0, x: 0, y: 3465, width: 552, height: 541 }),
      Nail: tx({ id: "Pizza.Nail", atlas: 0, x: 1280, y: 4080, width: 16, height: 16 }),
      Sauce: tx({ id: "Pizza.Sauce", atlas: 0, x: 4034, y: 86, width: 60, height: 56 }),
      Shading: tx({ id: "Pizza.Shading", atlas: 0, x: 0, y: 1499, width: 1080, height: 1080 }),
    },
    Screenshot: tx({ id: "Screenshot", atlas: 0, x: 2113, y: 147, width: 1920, height: 1080 }),
    Shadows: {
      Tomato: tx({ id: "Shadows.Tomato", atlas: 0, x: 4034, y: 39, width: 62, height: 46 }),
    },
    Toppings: {
      Beef: tx({ id: "Toppings.Beef", atlas: 0, x: 4034, y: 143, width: 60, height: 60 }),
      Onion: tx({ id: "Toppings.Onion", atlas: 0, x: 553, y: 3465, width: 512, height: 278 }),
      Pepperoni0: tx({ id: "Toppings.Pepperoni0", atlas: 0, x: 895, y: 3118, width: 256, height: 280 }),
      Pepperoni1: tx({ id: "Toppings.Pepperoni1", atlas: 0, x: 1066, y: 3399, width: 256, height: 280 }),
      Pepperoni2: tx({ id: "Toppings.Pepperoni2", atlas: 0, x: 1152, y: 3118, width: 256, height: 280 }),
      Pepperoni: tx({ id: "Toppings.Pepperoni", atlas: 0, x: 1650, y: 3112, width: 86, height: 84 }),
      Pineapple0: tx({ id: "Toppings.Pineapple0", atlas: 0, x: 1339, y: 3657, width: 256, height: 200 }),
      Pineapple1: tx({ id: "Toppings.Pineapple1", atlas: 0, x: 1448, y: 3858, width: 256, height: 180 }),
      Pixel: {
        GreenPepper: tx({ id: "Toppings.Pixel.GreenPepper", atlas: 0, x: 4034, y: 204, width: 54, height: 52 }),
        Kiwi: tx({ id: "Toppings.Pixel.Kiwi", atlas: 0, x: 4034, y: 357, width: 48, height: 46 }),
        MandarinOrange: tx({ id: "Toppings.Pixel.MandarinOrange", atlas: 0, x: 1506, y: 3042, width: 48, height: 34 }),
        Mushroom: tx({ id: "Toppings.Pixel.Mushroom", atlas: 0, x: 1455, y: 3042, width: 50, height: 42 }),
        Onion: tx({ id: "Toppings.Pixel.Onion", atlas: 0, x: 4034, y: 257, width: 50, height: 50 }),
        Pineapple: tx({ id: "Toppings.Pixel.Pineapple", atlas: 0, x: 3552, y: 107, width: 50, height: 38 }),
        Strawberry: tx({ id: "Toppings.Pixel.Strawberry", atlas: 0, x: 1417, y: 2894, width: 42, height: 42 }),
        Tomato: tx({ id: "Toppings.Pixel.Tomato", atlas: 0, x: 4034, y: 404, width: 48, height: 34 }),
      },
      Tomato: tx({ id: "Toppings.Tomato", atlas: 0, x: 553, y: 3744, width: 512, height: 200 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
