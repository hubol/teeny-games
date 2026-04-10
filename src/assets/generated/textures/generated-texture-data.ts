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
    DressMy: {
      Scene: tx({ id: "DressMy.Scene", atlas: 0, x: 0, y: 0, width: 3924, height: 268 }),
    },
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 1457, y: 809, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3930, y: 478, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3772, y: 513, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3772, y: 478, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3684, y: 825, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3772, y: 269, width: 308, height: 208 }),
    },
    Fx: {
      Burst0: tx({ id: "Fx.Burst0", atlas: 0, x: 1457, y: 693, width: 540, height: 82 }),
    },
    HotDog: {
      Onions: tx({ id: "HotDog.Onions", atlas: 0, x: 1998, y: 693, width: 88, height: 16 }),
      Relish: tx({ id: "HotDog.Relish", atlas: 0, x: 4056, y: 513, width: 40, height: 30 }),
      Scene: tx({ id: "HotDog.Scene", atlas: 0, x: 0, y: 269, width: 2270, height: 280 }),
    },
    Intro: {
      Background: tx({ id: "Intro.Background", atlas: 0, x: 2682, y: 825, width: 500, height: 280 }),
      Hubol: tx({ id: "Intro.Hubol", atlas: 0, x: 0, y: 693, width: 1456, height: 208 }),
      Lady: tx({ id: "Intro.Lady", atlas: 0, x: 2089, y: 550, width: 1840, height: 274 }),
    },
    Outro: {
      Scene: tx({ id: "Outro.Scene", atlas: 0, x: 1457, y: 825, width: 1224, height: 246 }),
    },
    Soda: {
      DispenserFront: tx({ id: "Soda.DispenserFront", atlas: 0, x: 3183, y: 825, width: 500, height: 81 }),
      Dispenser: tx({ id: "Soda.Dispenser", atlas: 0, x: 2271, y: 269, width: 1500, height: 280 }),
      HeldCup: tx({ id: "Soda.HeldCup", atlas: 0, x: 0, y: 550, width: 2088, height: 142 }),
      IceCube: tx({ id: "Soda.IceCube", atlas: 0, x: 3875, y: 478, width: 26, height: 24 }),
      Pour: tx({ id: "Soda.Pour", atlas: 0, x: 3941, y: 513, width: 114, height: 62 }),
      Splash: tx({ id: "Soda.Splash", atlas: 0, x: 1457, y: 776, width: 392, height: 32 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
