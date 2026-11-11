// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 25 }];

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
    Fish: {
      Body: tx({ id: "Fish.Body", atlas: 0, x: 3946, y: 209, width: 126, height: 64 }),
      DorsalFin: tx({ id: "Fish.DorsalFin", atlas: 0, x: 3150, y: 0, width: 312, height: 90 }),
      EyeFar: tx({ id: "Fish.EyeFar", atlas: 0, x: 2338, y: 231, width: 192, height: 64 }),
      EyeNear: tx({ id: "Fish.EyeNear", atlas: 0, x: 2338, y: 296, width: 192, height: 64 }),
      Fins: tx({ id: "Fish.Fins", atlas: 0, x: 3463, y: 0, width: 312, height: 68 }),
      Mouth: tx({ id: "Fish.Mouth", atlas: 0, x: 2338, y: 361, width: 192, height: 64 }),
      Shadow: tx({ id: "Fish.Shadow", atlas: 0, x: 3150, y: 348, width: 214, height: 180 }),
      Tail: tx({ id: "Fish.Tail", atlas: 0, x: 3407, y: 198, width: 216, height: 162 }),
    },
    Foliage: {
      Kelp0: tx({ id: "Foliage.Kelp0", atlas: 0, x: 2201, y: 231, width: 136, height: 322 }),
      Kelp1: tx({ id: "Foliage.Kelp1", atlas: 0, x: 1986, y: 231, width: 214, height: 338 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3624, y: 198, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3624, y: 209, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3785, y: 209, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3733, y: 244, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3463, y: 69, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3776, y: 0, width: 308, height: 208 }),
    },
    Furniture: {
      Castle: tx({ id: "Furniture.Castle", atlas: 0, x: 2535, y: 0, width: 614, height: 396 }),
      Rock0: tx({ id: "Furniture.Rock0", atlas: 0, x: 3836, y: 244, width: 62, height: 36 }),
      Rock1: tx({ id: "Furniture.Rock1", atlas: 0, x: 3365, y: 348, width: 26, height: 18 }),
      Rock2: tx({ id: "Furniture.Rock2", atlas: 0, x: 3392, y: 348, width: 14, height: 8 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 3150, y: 91, width: 256, height: 256 }),
      WaterSurface: tx({ id: "Fx.WaterSurface", atlas: 0, x: 0, y: 231, width: 1920, height: 58 }),
    },
    Kelp: tx({ id: "Kelp", atlas: 0, x: 1921, y: 231, width: 64, height: 342 }),
    Nyfish: {
      Layers: tx({ id: "Nyfish.Layers", atlas: 0, x: 0, y: 0, width: 2534, height: 230 }),
    },
    Overlay: {
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 3624, y: 244, width: 108, height: 44 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
