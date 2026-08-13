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
    Doll: {
      Arm0: tx({ id: "Doll.Arm0", atlas: 0, x: 0, y: 0, width: 486, height: 54 }),
      Base: tx({ id: "Doll.Base", atlas: 0, x: 309, y: 55, width: 164, height: 280 }),
      EarShadow0: tx({ id: "Doll.EarShadow0", atlas: 0, x: 0, y: 289, width: 26, height: 42 }),
      Ear0: tx({ id: "Doll.Ear0", atlas: 0, x: 27, y: 289, width: 26, height: 42 }),
      Eye0: tx({ id: "Doll.Eye0", atlas: 0, x: 474, y: 55, width: 32, height: 28 }),
      Sclera0: tx({ id: "Doll.Sclera0", atlas: 0, x: 474, y: 84, width: 32, height: 28 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 500, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 0, y: 465, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 161, y: 465, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 0, y: 264, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 336, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 55, width: 308, height: 208 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 257, y: 264, width: 40, height: 60 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 257, y: 325, width: 40, height: 60 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
