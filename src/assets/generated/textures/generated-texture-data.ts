// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 42 }];

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
      Critter: {
        Back: tx({ id: "Character.Critter.Back", atlas: 0, x: 2842, y: 1500, width: 840, height: 278 }),
        Body: tx({ id: "Character.Critter.Body", atlas: 0, x: 3683, y: 1500, width: 280, height: 278 }),
        Bottoms: tx({ id: "Character.Critter.Bottoms", atlas: 0, x: 2842, y: 1779, width: 840, height: 278 }),
        Ears: tx({ id: "Character.Critter.Ears", atlas: 0, x: 0, y: 2082, width: 840, height: 278 }),
        Eyes: tx({ id: "Character.Critter.Eyes", atlas: 0, x: 1441, y: 1221, width: 1400, height: 278 }),
        Footwear: tx({ id: "Character.Critter.Footwear", atlas: 0, x: 0, y: 3764, width: 560, height: 278 }),
        Hairs: tx({ id: "Character.Critter.Hairs", atlas: 0, x: 1441, y: 1500, width: 1400, height: 278 }),
        Hats: tx({ id: "Character.Critter.Hats", atlas: 0, x: 2842, y: 1221, width: 1120, height: 278 }),
        Mouths: tx({ id: "Character.Critter.Mouths", atlas: 0, x: 1921, y: 942, width: 1680, height: 278 }),
        Mullet: tx({ id: "Character.Critter.Mullet", atlas: 0, x: 561, y: 3764, width: 560, height: 278 }),
        Noses: tx({ id: "Character.Critter.Noses", atlas: 0, x: 0, y: 2361, width: 840, height: 278 }),
        Sideburns: tx({ id: "Character.Critter.Sideburns", atlas: 0, x: 615, y: 3367, width: 560, height: 278 }),
        Tops: tx({ id: "Character.Critter.Tops", atlas: 0, x: 1441, y: 1779, width: 1400, height: 278 }),
      },
      Pete: {
        Arm: tx({ id: "Character.Pete.Arm", atlas: 0, x: 3761, y: 0, width: 290, height: 682 }),
        UpperBody: tx({ id: "Character.Pete.UpperBody", atlas: 0, x: 0, y: 0, width: 3760, height: 710 }),
      },
    },
    Fish: {
      Body: tx({ id: "Fish.Body", atlas: 0, x: 3964, y: 1205, width: 126, height: 64 }),
      DorsalFin: tx({ id: "Fish.DorsalFin", atlas: 0, x: 1122, y: 3985, width: 312, height: 90 }),
      EyeFar: tx({ id: "Fish.EyeFar", atlas: 0, x: 2535, y: 874, width: 192, height: 64 }),
      EyeNear: tx({ id: "Fish.EyeNear", atlas: 0, x: 3859, y: 1075, width: 192, height: 64 }),
      Fins: tx({ id: "Fish.Fins", atlas: 0, x: 3602, y: 1006, width: 312, height: 68 }),
      Mouth: tx({ id: "Fish.Mouth", atlas: 0, x: 3859, y: 1140, width: 192, height: 64 }),
      Shadow: tx({ id: "Fish.Shadow", atlas: 0, x: 2752, y: 711, width: 214, height: 180 }),
      Tail: tx({ id: "Fish.Tail", atlas: 0, x: 2535, y: 711, width: 216, height: 162 }),
    },
    Foliage: {
      Kelp0: tx({ id: "Foliage.Kelp0", atlas: 0, x: 3761, y: 683, width: 136, height: 322 }),
      Kelp1: tx({ id: "Foliage.Kelp1", atlas: 0, x: 1122, y: 3646, width: 214, height: 338 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 1441, y: 1210, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 1750, y: 1001, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 1750, y: 1036, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 2728, y: 892, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3602, y: 1075, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 1441, y: 1001, width: 308, height: 208 }),
    },
    Furniture: {
      Castle: tx({ id: "Furniture.Castle", atlas: 0, x: 0, y: 3367, width: 614, height: 396 }),
      Rock0: tx({ id: "Furniture.Rock0", atlas: 0, x: 3898, y: 683, width: 62, height: 36 }),
      Rock1: tx({ id: "Furniture.Rock1", atlas: 0, x: 0, y: 4076, width: 26, height: 18 }),
      Rock2: tx({ id: "Furniture.Rock2", atlas: 0, x: 1570, y: 1210, width: 14, height: 8 }),
    },
    Fx: {
      ColorTest: tx({ id: "Fx.ColorTest", atlas: 0, x: 0, y: 1001, width: 1440, height: 1080 }),
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 3683, y: 1779, width: 256, height: 256 }),
      GodRay: tx({ id: "Fx.GodRay", atlas: 0, x: 0, y: 2640, width: 732, height: 726 }),
      WaterSurface: tx({ id: "Fx.WaterSurface", atlas: 0, x: 0, y: 942, width: 1920, height: 58 }),
    },
    Kelp: tx({ id: "Kelp", atlas: 0, x: 3963, y: 683, width: 64, height: 342 }),
    Nyfish: {
      Layers: tx({ id: "Nyfish.Layers", atlas: 0, x: 0, y: 711, width: 2534, height: 230 }),
    },
    Overlay: {
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 3915, y: 1026, width: 108, height: 44 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
