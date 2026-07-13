// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 56 }];

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
    Background: tx({ id: "Background", atlas: 0, x: 0, y: 0, width: 2112, height: 1200 }),
    Characters: {
      Chicken: {
        Black: tx({ id: "Characters.Chicken.Black", atlas: 0, x: 2050, y: 1511, width: 264, height: 112 }),
        Brown: tx({ id: "Characters.Chicken.Brown", atlas: 0, x: 2315, y: 1538, width: 264, height: 112 }),
        Gray: tx({ id: "Characters.Chicken.Gray", atlas: 0, x: 2050, y: 1624, width: 264, height: 112 }),
      },
      George: {
        Walk: tx({ id: "Characters.George.Walk", atlas: 0, x: 3747, y: 1337, width: 318, height: 112 }),
      },
      Magnet: tx({ id: "Characters.Magnet", atlas: 0, x: 3747, y: 1450, width: 312, height: 106 }),
      Pete: {
        Walk: tx({ id: "Characters.Pete.Walk", atlas: 0, x: 2050, y: 1737, width: 240, height: 112 }),
      },
      Tuna: tx({ id: "Characters.Tuna", atlas: 0, x: 0, y: 1201, width: 1024, height: 508 }),
    },
    Containers: {
      GreenPepper: tx({ id: "Containers.GreenPepper", atlas: 0, x: 2837, y: 1667, width: 224, height: 126 }),
      Happy: {
        GreenPepper: tx({ id: "Containers.Happy.GreenPepper", atlas: 0, x: 3062, y: 1729, width: 224, height: 126 }),
        Mushroom: tx({ id: "Containers.Happy.Mushroom", atlas: 0, x: 3795, y: 0, width: 292, height: 108 }),
        Onion: tx({ id: "Containers.Happy.Onion", atlas: 0, x: 2563, y: 1433, width: 272, height: 104 }),
        Tomato: tx({ id: "Containers.Happy.Tomato", atlas: 0, x: 553, y: 1819, width: 288, height: 90 }),
      },
      Mushroom: tx({ id: "Containers.Mushroom", atlas: 0, x: 553, y: 1710, width: 292, height: 108 }),
      Onion: tx({ id: "Containers.Onion", atlas: 0, x: 2836, y: 1433, width: 272, height: 104 }),
      Pepperoni: tx({ id: "Containers.Pepperoni", atlas: 0, x: 3747, y: 1187, width: 336, height: 149 }),
      Tomato: tx({ id: "Containers.Tomato", atlas: 0, x: 553, y: 1910, width: 288, height: 90 }),
    },
    Effects: {
      Bubble68: tx({ id: "Effects.Bubble68", atlas: 0, x: 3250, y: 0, width: 544, height: 56 }),
      Clouds: tx({ id: "Effects.Clouds", atlas: 0, x: 2580, y: 1538, width: 256, height: 64 }),
      HeartBurst: tx({ id: "Effects.HeartBurst", atlas: 0, x: 3250, y: 57, width: 308, height: 52 }),
      Shadow256: tx({ id: "Effects.Shadow256", atlas: 0, x: 1025, y: 1201, width: 1024, height: 1024 }),
      Spark: tx({ id: "Effects.Spark", atlas: 0, x: 3768, y: 57, width: 26, height: 38 }),
    },
    Faces: {
      Idle: tx({ id: "Faces.Idle", atlas: 0, x: 2113, y: 0, width: 1136, height: 150 }),
      Pepperoni: tx({ id: "Faces.Pepperoni", atlas: 0, x: 3062, y: 1667, width: 128, height: 30 }),
      Pixel: {
        GreenPepper: tx({ id: "Faces.Pixel.GreenPepper", atlas: 0, x: 3076, y: 1232, width: 108, height: 52 }),
        Mushroom: tx({ id: "Faces.Pixel.Mushroom", atlas: 0, x: 3559, y: 57, width: 100, height: 42 }),
        Onion: tx({ id: "Faces.Pixel.Onion", atlas: 0, x: 3660, y: 57, width: 100, height: 50 }),
        Tomato: tx({ id: "Faces.Pixel.Tomato", atlas: 0, x: 3572, y: 109, width: 144, height: 34 }),
      },
      Sing: tx({ id: "Faces.Sing", atlas: 0, x: 3194, y: 1036, width: 852, height: 150 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3062, y: 1698, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3250, y: 110, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3411, y: 110, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 2315, y: 1511, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2837, y: 1538, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3747, y: 1557, width: 308, height: 208 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 3109, y: 1285, width: 64, height: 80 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 3109, y: 1366, width: 64, height: 80 }),
    },
    Pizza: {
      CutLines: tx({ id: "Pizza.CutLines", atlas: 0, x: 3194, y: 151, width: 894, height: 884 }),
      Dough: tx({ id: "Pizza.Dough", atlas: 0, x: 3194, y: 1187, width: 552, height: 541 }),
      Mask: tx({ id: "Pizza.Mask", atlas: 0, x: 0, y: 1710, width: 552, height: 541 }),
      Nail: tx({ id: "Pizza.Nail", atlas: 0, x: 3174, y: 1285, width: 16, height: 16 }),
      Shading: tx({ id: "Pizza.Shading", atlas: 0, x: 2113, y: 151, width: 1080, height: 1080 }),
    },
    Shadows: {
      Tomato: tx({ id: "Shadows.Tomato", atlas: 0, x: 3109, y: 1447, width: 62, height: 46 }),
    },
    Toppings: {
      Beef: tx({ id: "Toppings.Beef", atlas: 0, x: 846, y: 1710, width: 60, height: 60 }),
      Onion: tx({ id: "Toppings.Onion", atlas: 0, x: 2050, y: 1232, width: 512, height: 278 }),
      Pepperoni0: tx({ id: "Toppings.Pepperoni0", atlas: 0, x: 553, y: 2001, width: 256, height: 280 }),
      Pepperoni1: tx({ id: "Toppings.Pepperoni1", atlas: 0, x: 0, y: 2252, width: 256, height: 280 }),
      Pepperoni2: tx({ id: "Toppings.Pepperoni2", atlas: 0, x: 257, y: 2252, width: 256, height: 280 }),
      Pepperoni: tx({ id: "Toppings.Pepperoni", atlas: 0, x: 3094, y: 1538, width: 86, height: 84 }),
      Pineapple0: tx({ id: "Toppings.Pineapple0", atlas: 0, x: 2580, y: 1603, width: 256, height: 200 }),
      Pineapple1: tx({ id: "Toppings.Pineapple1", atlas: 0, x: 2315, y: 1651, width: 256, height: 180 }),
      Pixel: {
        GreenPepper: tx({ id: "Toppings.Pixel.GreenPepper", atlas: 0, x: 907, y: 1710, width: 54, height: 52 }),
        Mushroom: tx({ id: "Toppings.Pixel.Mushroom", atlas: 0, x: 3717, y: 108, width: 50, height: 42 }),
        Onion: tx({ id: "Toppings.Pixel.Onion", atlas: 0, x: 962, y: 1710, width: 50, height: 50 }),
        Tomato: tx({ id: "Toppings.Pixel.Tomato", atlas: 0, x: 4047, y: 1036, width: 48, height: 34 }),
      },
      Tomato: tx({ id: "Toppings.Tomato", atlas: 0, x: 2563, y: 1232, width: 512, height: 200 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
