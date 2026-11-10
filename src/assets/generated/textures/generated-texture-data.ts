// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 17 }];

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
      Body: tx({ id: "Fish.Body", atlas: 0, x: 322, y: 209, width: 126, height: 64 }),
      DorsalFin: tx({ id: "Fish.DorsalFin", atlas: 0, x: 0, y: 343, width: 312, height: 90 }),
      EyeFar: tx({ id: "Fish.EyeFar", atlas: 0, x: 0, y: 941, width: 192, height: 64 }),
      EyeNear: tx({ id: "Fish.EyeNear", atlas: 0, x: 193, y: 941, width: 192, height: 64 }),
      Fins: tx({ id: "Fish.Fins", atlas: 0, x: 0, y: 434, width: 312, height: 68 }),
      Mouth: tx({ id: "Fish.Mouth", atlas: 0, x: 386, y: 941, width: 192, height: 64 }),
      Shadow: tx({ id: "Fish.Shadow", atlas: 0, x: 217, y: 760, width: 214, height: 180 }),
      Tail: tx({ id: "Fish.Tail", atlas: 0, x: 0, y: 760, width: 216, height: 162 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 923, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 257, y: 503, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 313, y: 338, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 431, y: 274, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 65, y: 209, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 65, y: 0, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 0, y: 503, width: 256, height: 256 }),
    },
    Kelp: tx({ id: "Kelp", atlas: 0, x: 0, y: 0, width: 64, height: 342 }),
    Overlay: {
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 322, y: 274, width: 108, height: 44 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
