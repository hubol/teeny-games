// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 16 }];

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
    Cell: {
      Human: {
        Face: tx({ id: "Cell.Human.Face", atlas: 0, x: 2307, y: 123, width: 152, height: 38 }),
        Mitochondrion0: tx({ id: "Cell.Human.Mitochondrion0", atlas: 0, x: 2460, y: 123, width: 26, height: 24 }),
        Mitochondrion1: tx({ id: "Cell.Human.Mitochondrion1", atlas: 0, x: 2487, y: 53, width: 18, height: 26 }),
        Nucleus: tx({ id: "Cell.Human.Nucleus", atlas: 0, x: 2475, y: 196, width: 42, height: 40 }),
      },
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 2307, y: 162, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 2307, y: 53, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 2307, y: 88, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 2416, y: 171, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2050, y: 53, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 2519, y: 0, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 2050, y: 182, width: 256, height: 256 }),
    },
    Overlay: {
      FovInner: tx({ id: "Overlay.FovInner", atlas: 0, x: 0, y: 0, width: 1024, height: 1024 }),
      Fov: tx({ id: "Overlay.Fov", atlas: 0, x: 1025, y: 0, width: 1024, height: 1024 }),
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 2307, y: 171, width: 108, height: 44 }),
    },
    Virus: {
      Layers: tx({ id: "Virus.Layers", atlas: 0, x: 2050, y: 0, width: 468, height: 52 }),
      Outline: tx({ id: "Virus.Outline", atlas: 0, x: 2416, y: 196, width: 58, height: 58 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
