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
    Designer: {
      Background: tx({ id: "Designer.Background", atlas: 0, x: 0, y: 0, width: 634, height: 356 }),
      ConveyorBelt: tx({ id: "Designer.ConveyorBelt", atlas: 0, x: 635, y: 0, width: 256, height: 512 }),
    },
    Doll: {
      Arm0: tx({ id: "Doll.Arm0", atlas: 0, x: 0, y: 357, width: 486, height: 54 }),
      Base: tx({ id: "Doll.Base", atlas: 0, x: 0, y: 740, width: 164, height: 280 }),
      Button: tx({ id: "Doll.Button", atlas: 0, x: 309, y: 577, width: 30, height: 30 }),
      EarShadow0: tx({ id: "Doll.EarShadow0", atlas: 0, x: 551, y: 482, width: 26, height: 42 }),
      Ear0: tx({ id: "Doll.Ear0", atlas: 0, x: 578, y: 482, width: 26, height: 42 }),
      Eye0: tx({ id: "Doll.Eye0", atlas: 0, x: 487, y: 357, width: 32, height: 28 }),
      Mouth0: tx({ id: "Doll.Mouth0", atlas: 0, x: 427, y: 482, width: 66, height: 22 }),
      Mouth1: tx({ id: "Doll.Mouth1", atlas: 0, x: 340, y: 577, width: 30, height: 30 }),
      Mouth2: tx({ id: "Doll.Mouth2", atlas: 0, x: 492, y: 505, width: 58, height: 22 }),
      Sclera0: tx({ id: "Doll.Sclera0", atlas: 0, x: 520, y: 357, width: 32, height: 28 }),
      Screw0: tx({ id: "Doll.Screw0", atlas: 0, x: 553, y: 357, width: 32, height: 26 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 892, y: 0, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 427, y: 412, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 427, y: 447, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 309, y: 531, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 165, y: 740, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 0, y: 531, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 422, y: 531, width: 256, height: 256 }),
      ShadowMessy: tx({ id: "Fx.ShadowMessy", atlas: 0, x: 309, y: 556, width: 86, height: 20 }),
      Star: tx({ id: "Fx.Star", atlas: 0, x: 427, y: 513, width: 64, height: 16 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 588, y: 357, width: 40, height: 60 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 588, y: 418, width: 40, height: 60 }),
      GoButton: tx({ id: "Overlay.GoButton", atlas: 0, x: 0, y: 412, width: 426, height: 118 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
