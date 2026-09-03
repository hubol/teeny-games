// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 49 }];

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
      Arm0: tx({ id: "Doll.Arm0", atlas: 0, x: 0, y: 1987, width: 486, height: 54 }),
      Base: tx({ id: "Doll.Base", atlas: 0, x: 976, y: 1724, width: 164, height: 280 }),
      Button: tx({ id: "Doll.Button", atlas: 0, x: 944, y: 1079, width: 30, height: 30 }),
      EarShadow0: tx({ id: "Doll.EarShadow0", atlas: 0, x: 1398, y: 1264, width: 26, height: 42 }),
      Ear0: tx({ id: "Doll.Ear0", atlas: 0, x: 1398, y: 1307, width: 26, height: 42 }),
      Eye0: tx({ id: "Doll.Eye0", atlas: 0, x: 487, y: 2010, width: 32, height: 28 }),
      Hair: tx({ id: "Doll.Hair", atlas: 0, x: 1298, y: 1948, width: 144, height: 60 }),
      Leg: tx({ id: "Doll.Leg", atlas: 0, x: 1141, y: 1650, width: 216, height: 148 }),
      Mouth0: tx({ id: "Doll.Mouth0", atlas: 0, x: 1358, y: 1650, width: 66, height: 22 }),
      Mouth1: tx({ id: "Doll.Mouth1", atlas: 0, x: 944, y: 1276, width: 30, height: 30 }),
      Mouth2: tx({ id: "Doll.Mouth2", atlas: 0, x: 487, y: 1987, width: 58, height: 22 }),
      Sclera0: tx({ id: "Doll.Sclera0", atlas: 0, x: 1387, y: 1038, width: 32, height: 28 }),
      Screw0: tx({ id: "Doll.Screw0", atlas: 0, x: 1387, y: 1067, width: 32, height: 26 }),
      Sock: tx({ id: "Doll.Sock", atlas: 0, x: 1141, y: 1799, width: 216, height: 148 }),
      Washer0: tx({ id: "Doll.Washer0", atlas: 0, x: 1387, y: 1094, width: 32, height: 32 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 487, y: 2040, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 976, y: 2005, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 1137, y: 2005, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 1298, y: 2009, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 1141, y: 1264, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 635, y: 1079, width: 308, height: 208 }),
    },
    Fx: {
      Displacement: tx({ id: "Fx.Displacement", atlas: 0, x: 1141, y: 1393, width: 256, height: 256 }),
      GhostBurst: tx({ id: "Fx.GhostBurst", atlas: 0, x: 0, y: 863, width: 1424, height: 174 }),
      Heart: tx({ id: "Fx.Heart", atlas: 0, x: 944, y: 1127, width: 174, height: 148 }),
      ShadowMessy: tx({ id: "Fx.ShadowMessy", atlas: 0, x: 1962, y: 151, width: 86, height: 20 }),
      Star: tx({ id: "Fx.Star", atlas: 0, x: 1358, y: 1673, width: 64, height: 16 }),
    },
    Overlay: {
      CursorDown: tx({ id: "Overlay.CursorDown", atlas: 0, x: 1358, y: 1690, width: 40, height: 60 }),
      Cursor: tx({ id: "Overlay.Cursor", atlas: 0, x: 1968, y: 312, width: 40, height: 60 }),
      GoButton: tx({ id: "Overlay.GoButton", atlas: 0, x: 549, y: 1908, width: 426, height: 118 }),
    },
    Shapes: {
      Square32: tx({ id: "Shapes.Square32", atlas: 0, x: 1401, y: 2009, width: 32, height: 32 }),
    },
    Shuttle: {
      Debris: tx({ id: "Shuttle.Debris", atlas: 0, x: 616, y: 2027, width: 78, height: 20 }),
      Flames: tx({ id: "Shuttle.Flames", atlas: 0, x: 1425, y: 863, width: 542, height: 860 }),
      Layers: tx({ id: "Shuttle.Layers", atlas: 0, x: 0, y: 0, width: 1704, height: 862 }),
    },
    Skate: {
      Caution0: tx({ id: "Skate.Caution0", atlas: 0, x: 1962, y: 0, width: 84, height: 150 }),
      Celestial0: tx({ id: "Skate.Celestial0", atlas: 0, x: 1962, y: 239, width: 82, height: 72 }),
      Celestial1: tx({ id: "Skate.Celestial1", atlas: 0, x: 1141, y: 1948, width: 54, height: 54 }),
      Celestial2: tx({ id: "Skate.Celestial2", atlas: 0, x: 1196, y: 1948, width: 54, height: 54 }),
      Cloud0: tx({ id: "Skate.Cloud0", atlas: 0, x: 635, y: 1038, width: 326, height: 40 }),
      Dash: tx({ id: "Skate.Dash", atlas: 0, x: 976, y: 1038, width: 410, height: 88 }),
      Grass0: tx({ id: "Skate.Grass0", atlas: 0, x: 1119, y: 1127, width: 16, height: 32 }),
      Hill0: tx({ id: "Skate.Hill0", atlas: 0, x: 0, y: 1395, width: 634, height: 512 }),
      LetterI: tx({ id: "Skate.LetterI", atlas: 0, x: 1119, y: 1160, width: 18, height: 30 }),
      LetterP: tx({ id: "Skate.LetterP", atlas: 0, x: 1399, y: 1690, width: 22, height: 32 }),
      LetterR: tx({ id: "Skate.LetterR", atlas: 0, x: 520, y: 2010, width: 20, height: 28 }),
      Stars: tx({ id: "Skate.Stars", atlas: 0, x: 1141, y: 1127, width: 274, height: 136 }),
      TombstoneEnvironment: tx({ id: "Skate.TombstoneEnvironment", atlas: 0, x: 1962, y: 172, width: 84, height: 66 }),
      Tombstone: tx({ id: "Skate.Tombstone", atlas: 0, x: 0, y: 1908, width: 548, height: 78 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
