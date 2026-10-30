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
    Background: tx({ id: "Background", atlas: 0, x: 0, y: 0, width: 2560, height: 360 }),
    Clouds: tx({ id: "Clouds", atlas: 0, x: 2561, y: 0, width: 640, height: 182 }),
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3843, y: 169, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3843, y: 0, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3843, y: 35, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3980, y: 70, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2550, y: 544, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 2241, y: 361, width: 308, height: 208 }),
    },
    HubolWalk: tx({ id: "HubolWalk", atlas: 0, x: 3843, y: 70, width: 136, height: 98 }),
    Hubol: tx({ id: "Hubol", atlas: 0, x: 0, y: 361, width: 2240, height: 360 }),
    KirsiWalk: tx({ id: "KirsiWalk", atlas: 0, x: 3972, y: 169, width: 120, height: 104 }),
    Kirsi: tx({ id: "Kirsi", atlas: 0, x: 0, y: 722, width: 2030, height: 360 }),
    Mall: tx({ id: "Mall", atlas: 0, x: 3202, y: 0, width: 640, height: 360 }),
    Mask: tx({ id: "Mask", atlas: 0, x: 2561, y: 183, width: 640, height: 360 }),
    Mystery: tx({ id: "Mystery", atlas: 0, x: 3202, y: 361, width: 640, height: 360 }),
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
