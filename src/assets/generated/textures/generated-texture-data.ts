// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 32 }];

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
      Background: tx({ id: "Designer.Background", atlas: 0, x: 0, y: 1038, width: 634, height: 356 }),
      ConveyorBelt: tx({ id: "Designer.ConveyorBelt", atlas: 0, x: 1705, y: 0, width: 256, height: 512 }),
    },
    Doll: {
      Arm0: tx({ id: "Doll.Arm0", atlas: 0, x: 0, y: 1724, width: 486, height: 54 }),
      Base: tx({ id: "Doll.Base", atlas: 0, x: 487, y: 1724, width: 164, height: 280 }),
      Button: tx({ id: "Doll.Button", atlas: 0, x: 2014, y: 172, width: 30, height: 30 }),
      EarShadow0: tx({ id: "Doll.EarShadow0", atlas: 0, x: 425, y: 2005, width: 26, height: 42 }),
      Ear0: tx({ id: "Doll.Ear0", atlas: 0, x: 452, y: 2005, width: 26, height: 42 }),
      Eye0: tx({ id: "Doll.Eye0", atlas: 0, x: 2014, y: 21, width: 32, height: 28 }),
      Hair: tx({ id: "Doll.Hair", atlas: 0, x: 652, y: 1981, width: 144, height: 60 }),
      Mouth0: tx({ id: "Doll.Mouth0", atlas: 0, x: 1968, y: 722, width: 66, height: 22 }),
      Mouth1: tx({ id: "Doll.Mouth1", atlas: 0, x: 2014, y: 203, width: 30, height: 30 }),
      Mouth2: tx({ id: "Doll.Mouth2", atlas: 0, x: 427, y: 1779, width: 58, height: 22 }),
      Sclera0: tx({ id: "Doll.Sclera0", atlas: 0, x: 2014, y: 50, width: 32, height: 28 }),
      Screw0: tx({ id: "Doll.Screw0", atlas: 0, x: 2014, y: 79, width: 32, height: 26 }),
      Washer0: tx({ id: "Doll.Washer0", atlas: 0, x: 2014, y: 106, width: 32, height: 32 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 2040, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 0, y: 2005, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 161, y: 2005, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 322, y: 2005, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 1705, y: 722, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 1705, y: 513, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 652, y: 1724, width: 256, height: 256 }),
      GhostBurst: tx({ id: "Fx.GhostBurst", atlas: 0, x: 0, y: 863, width: 1424, height: 174 }),
      ShadowMessy: tx({ id: "Fx.ShadowMessy", atlas: 0, x: 1962, y: 0, width: 86, height: 20 }),
      Star: tx({ id: "Fx.Star", atlas: 0, x: 322, y: 2030, width: 64, height: 16 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 797, y: 1981, width: 40, height: 60 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 838, y: 1981, width: 40, height: 60 }),
      GoButton: tx({ id: "Overlay.GoButton", atlas: 0, x: 0, y: 1779, width: 426, height: 118 }),
    },
    Shapes: {
      Square32: tx({ id: "Shapes.Square32", atlas: 0, x: 2014, y: 139, width: 32, height: 32 }),
    },
    Shuttle: {
      Flames: tx({ id: "Shuttle.Flames", atlas: 0, x: 1425, y: 863, width: 542, height: 860 }),
      Layers: tx({ id: "Shuttle.Layers", atlas: 0, x: 0, y: 0, width: 1704, height: 862 }),
    },
    Skate: {
      Tombstone: tx({ id: "Skate.Tombstone", atlas: 0, x: 635, y: 1038, width: 548, height: 78 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
