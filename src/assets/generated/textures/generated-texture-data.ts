// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 10 }];

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
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 2359, y: 199, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 2359, y: 129, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 2359, y: 164, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 2359, y: 208, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2359, y: 0, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 2050, y: 0, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 2616, y: 0, width: 256, height: 256 }),
    },
    Overlay: {
      FovInner: tx({ id: "Overlay.FovInner", atlas: 0, x: 0, y: 0, width: 1024, height: 1024 }),
      Fov: tx({ id: "Overlay.Fov", atlas: 0, x: 1025, y: 0, width: 1024, height: 1024 }),
      WarningError: tx({ id: "Overlay.WarningError", atlas: 0, x: 2488, y: 199, width: 108, height: 44 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
