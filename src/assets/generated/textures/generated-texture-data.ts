// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 21 }];

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
      Body: tx({ id: "Fish.Body", atlas: 0, x: 2466, y: 369, width: 126, height: 64 }),
      DorsalFin: tx({ id: "Fish.DorsalFin", atlas: 0, x: 2600, y: 0, width: 312, height: 90 }),
      EyeFar: tx({ id: "Fish.EyeFar", atlas: 0, x: 2273, y: 360, width: 192, height: 64 }),
      EyeNear: tx({ id: "Fish.EyeNear", atlas: 0, x: 2273, y: 425, width: 192, height: 64 }),
      Fins: tx({ id: "Fish.Fins", atlas: 0, x: 2913, y: 0, width: 312, height: 68 }),
      Mouth: tx({ id: "Fish.Mouth", atlas: 0, x: 3535, y: 0, width: 192, height: 64 }),
      Shadow: tx({ id: "Fish.Shadow", atlas: 0, x: 2600, y: 254, width: 214, height: 180 }),
      Tail: tx({ id: "Fish.Tail", atlas: 0, x: 2600, y: 91, width: 216, height: 162 }),
    },
    Foliage: {
      Kelp0: tx({ id: "Foliage.Kelp0", atlas: 0, x: 2136, y: 231, width: 136, height: 322 }),
      Kelp1: tx({ id: "Foliage.Kelp1", atlas: 0, x: 1921, y: 231, width: 214, height: 338 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 2466, y: 360, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3728, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3889, y: 0, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3728, y: 35, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2273, y: 231, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3226, y: 0, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 2913, y: 69, width: 256, height: 256 }),
      WaterSurface: tx({ id: "Fx.WaterSurface", atlas: 0, x: 0, y: 231, width: 1920, height: 58 }),
    },
    Kelp: tx({ id: "Kelp", atlas: 0, x: 2535, y: 0, width: 64, height: 342 }),
    Nyfish: {
      Layers: tx({ id: "Nyfish.Layers", atlas: 0, x: 0, y: 0, width: 2534, height: 230 }),
    },
    Overlay: {
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 2466, y: 434, width: 108, height: 44 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
