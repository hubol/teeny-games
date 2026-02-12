// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 23 }];

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
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 3180, y: 337, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 3180, y: 267, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3180, y: 302, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3980, y: 362, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3835, y: 233, width: 256, height: 128 }),
    },
    Fucka: {
      Abdomen: tx({ id: "Fucka.Abdomen", atlas: 0, x: 1299, y: 189, width: 288, height: 232 }),
      Body: tx({ id: "Fucka.Body", atlas: 0, x: 2455, y: 189, width: 144, height: 232 }),
      Bottoms: tx({ id: "Fucka.Bottoms", atlas: 0, x: 0, y: 189, width: 432, height: 232 }),
      Decoration: tx({ id: "Fucka.Decoration", atlas: 0, x: 1588, y: 189, width: 288, height: 232 }),
      Eyes: tx({ id: "Fucka.Eyes", atlas: 0, x: 3835, y: 362, width: 144, height: 232 }),
      Footwear: tx({ id: "Fucka.Footwear", atlas: 0, x: 3362, y: 0, width: 720, height: 232 }),
      Hair: tx({ id: "Fucka.Hair", atlas: 0, x: 2600, y: 267, width: 144, height: 232 }),
      Mouth: tx({ id: "Fucka.Mouth", atlas: 0, x: 2745, y: 267, width: 144, height: 232 }),
      Mullet: tx({ id: "Fucka.Mullet", atlas: 0, x: 433, y: 189, width: 432, height: 232 }),
      Nose: tx({ id: "Fucka.Nose", atlas: 0, x: 2890, y: 267, width: 144, height: 232 }),
      Penis: tx({ id: "Fucka.Penis", atlas: 0, x: 3035, y: 267, width: 144, height: 232 }),
      Pubes: tx({ id: "Fucka.Pubes", atlas: 0, x: 1877, y: 189, width: 288, height: 232 }),
      Top: tx({ id: "Fucka.Top", atlas: 0, x: 866, y: 189, width: 432, height: 232 }),
      Underwear: tx({ id: "Fucka.Underwear", atlas: 0, x: 2166, y: 189, width: 288, height: 232 }),
    },
    Heart: tx({ id: "Heart", atlas: 0, x: 3309, y: 337, width: 22, height: 20 }),
    Nudes: {
      BadlyDressed: tx({ id: "Nudes.BadlyDressed", atlas: 0, x: 2601, y: 0, width: 760, height: 266 }),
      DemoFag: tx({ id: "Nudes.DemoFag", atlas: 0, x: 3362, y: 233, width: 472, height: 210 }),
      Long: tx({ id: "Nudes.Long", atlas: 0, x: 0, y: 0, width: 2600, height: 188 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
