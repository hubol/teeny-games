// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 14 }];

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
      Body: tx({ id: "Fish.Body", atlas: 0, x: 0, y: 935, width: 126, height: 64 }),
      DorsalFin: tx({ id: "Fish.DorsalFin", atlas: 0, x: 0, y: 0, width: 312, height: 90 }),
      EyeFar: tx({ id: "Fish.EyeFar", atlas: 0, x: 0, y: 661, width: 192, height: 64 }),
      EyeNear: tx({ id: "Fish.EyeNear", atlas: 0, x: 0, y: 726, width: 192, height: 64 }),
      Fins: tx({ id: "Fish.Fins", atlas: 0, x: 0, y: 91, width: 312, height: 68 }),
      Mouth: tx({ id: "Fish.Mouth", atlas: 0, x: 0, y: 791, width: 192, height: 64 }),
      Tail: tx({ id: "Fish.Tail", atlas: 0, x: 0, y: 498, width: 216, height: 162 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 926, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 0, y: 856, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 0, y: 891, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 0, y: 1000, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 369, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 160, width: 308, height: 208 }),
    },
    Overlay: {
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 127, y: 935, width: 108, height: 44 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
