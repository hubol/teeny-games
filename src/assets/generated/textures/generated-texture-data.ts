// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 22 }];

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
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 1917, y: 0, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 473, y: 629, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 473, y: 664, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 761, y: 233, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 473, y: 500, width: 256, height: 128 }),
    },
    Fucka: {
      Abdomen: tx({ id: "Fucka.Abdomen", atlas: 0, x: 761, y: 0, width: 288, height: 232 }),
      Body: tx({ id: "Fucka.Body", atlas: 0, x: 1154, y: 233, width: 144, height: 232 }),
      Bottoms: tx({ id: "Fucka.Bottoms", atlas: 0, x: 0, y: 711, width: 432, height: 232 }),
      Decoration: tx({ id: "Fucka.Decoration", atlas: 0, x: 1050, y: 0, width: 288, height: 232 }),
      Eyes: tx({ id: "Fucka.Eyes", atlas: 0, x: 1299, y: 233, width: 144, height: 232 }),
      Footwear: tx({ id: "Fucka.Footwear", atlas: 0, x: 0, y: 267, width: 720, height: 232 }),
      Hair: tx({ id: "Fucka.Hair", atlas: 0, x: 1444, y: 233, width: 144, height: 232 }),
      Mouth: tx({ id: "Fucka.Mouth", atlas: 0, x: 1589, y: 233, width: 144, height: 232 }),
      Mullet: tx({ id: "Fucka.Mullet", atlas: 0, x: 433, y: 711, width: 432, height: 232 }),
      Nose: tx({ id: "Fucka.Nose", atlas: 0, x: 1734, y: 233, width: 144, height: 232 }),
      Penis: tx({ id: "Fucka.Penis", atlas: 0, x: 1879, y: 233, width: 144, height: 232 }),
      Pubes: tx({ id: "Fucka.Pubes", atlas: 0, x: 1339, y: 0, width: 288, height: 232 }),
      Top: tx({ id: "Fucka.Top", atlas: 0, x: 721, y: 267, width: 432, height: 232 }),
      Underwear: tx({ id: "Fucka.Underwear", atlas: 0, x: 1628, y: 0, width: 288, height: 232 }),
    },
    Heart: tx({ id: "Heart", atlas: 0, x: 2024, y: 9, width: 22, height: 20 }),
    Nudes: {
      BadlyDressed: tx({ id: "Nudes.BadlyDressed", atlas: 0, x: 0, y: 0, width: 760, height: 266 }),
      DemoFag: tx({ id: "Nudes.DemoFag", atlas: 0, x: 0, y: 500, width: 472, height: 210 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
