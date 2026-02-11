// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 8 }];

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
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 828, y: 281, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 828, y: 211, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 828, y: 246, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 828, y: 290, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 571, y: 211, width: 256, height: 128 }),
    },
    Heart: tx({ id: "Heart", atlas: 0, x: 989, y: 0, width: 22, height: 20 }),
    Nudes: {
      BadlyDressed: tx({ id: "Nudes.BadlyDressed", atlas: 0, x: 0, y: 0, width: 570, height: 266 }),
      DemoFag: tx({ id: "Nudes.DemoFag", atlas: 0, x: 571, y: 0, width: 354, height: 210 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
