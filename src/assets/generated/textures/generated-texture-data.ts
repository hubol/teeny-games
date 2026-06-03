// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 15 }];

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
    Bee: tx({ id: "Bee", atlas: 0, x: 912, y: 538, width: 96, height: 56 }),
    Character: {
      Idle: tx({ id: "Character.Idle", atlas: 0, x: 0, y: 0, width: 872, height: 206 }),
      Shadow: tx({ id: "Character.Shadow", atlas: 0, x: 0, y: 207, width: 654, height: 206 }),
      Walk: tx({ id: "Character.Walk", atlas: 0, x: 0, y: 414, width: 654, height: 206 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 0, y: 1007, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 0, y: 972, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 161, y: 972, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 912, y: 416, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 655, y: 416, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 655, y: 207, width: 308, height: 208 }),
    },
    Lands: {
      Debble: tx({ id: "Lands.Debble", atlas: 0, x: 873, y: 0, width: 126, height: 128 }),
      Flower: tx({ id: "Lands.Flower", atlas: 0, x: 873, y: 129, width: 82, height: 60 }),
      Foliage0: tx({ id: "Lands.Foliage0", atlas: 0, x: 912, y: 441, width: 98, height: 96 }),
      Rock0: tx({ id: "Lands.Rock0", atlas: 0, x: 322, y: 972, width: 84, height: 42 }),
      Splotch0: tx({ id: "Lands.Splotch0", atlas: 0, x: 0, y: 621, width: 482, height: 350 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
