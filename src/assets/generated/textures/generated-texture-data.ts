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
    Designer: {
      ConveyorBelt: tx({ id: "Designer.ConveyorBelt", atlas: 0, x: 0, y: 0, width: 256, height: 512 }),
    },
    Doll: {
      Arm0: tx({ id: "Doll.Arm0", atlas: 0, x: 257, y: 0, width: 486, height: 54 }),
      Base: tx({ id: "Doll.Base", atlas: 0, x: 0, y: 722, width: 164, height: 280 }),
      Button: tx({ id: "Doll.Button", atlas: 0, x: 586, y: 101, width: 30, height: 30 }),
      EarShadow0: tx({ id: "Doll.EarShadow0", atlas: 0, x: 698, y: 55, width: 26, height: 42 }),
      Ear0: tx({ id: "Doll.Ear0", atlas: 0, x: 698, y: 98, width: 26, height: 42 }),
      Eye0: tx({ id: "Doll.Eye0", atlas: 0, x: 487, y: 80, width: 32, height: 28 }),
      Mouth0: tx({ id: "Doll.Mouth0", atlas: 0, x: 590, y: 55, width: 66, height: 22 }),
      Mouth1: tx({ id: "Doll.Mouth1", atlas: 0, x: 553, y: 107, width: 30, height: 30 }),
      Mouth2: tx({ id: "Doll.Mouth2", atlas: 0, x: 590, y: 78, width: 58, height: 22 }),
      Sclera0: tx({ id: "Doll.Sclera0", atlas: 0, x: 520, y: 80, width: 32, height: 28 }),
      Screw0: tx({ id: "Doll.Screw0", atlas: 0, x: 553, y: 80, width: 32, height: 26 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 1014, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 165, y: 979, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 326, y: 979, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 487, y: 55, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 744, y: 0, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 513, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 165, y: 722, width: 256, height: 256 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 422, y: 55, width: 40, height: 60 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 657, y: 55, width: 40, height: 60 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
