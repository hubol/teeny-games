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
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 161, y: 629, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 0, y: 629, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 0, y: 664, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 161, y: 638, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 0, y: 500, width: 256, height: 128 }),
    },
    Fucka: {
      Abdomen: tx({ id: "Fucka.Abdomen", atlas: 0, x: 721, y: 0, width: 288, height: 232 }),
      Body: tx({ id: "Fucka.Body", atlas: 0, x: 0, y: 910, width: 144, height: 232 }),
      Bottoms: tx({ id: "Fucka.Bottoms", atlas: 0, x: 571, y: 233, width: 432, height: 232 }),
      Decoration: tx({ id: "Fucka.Decoration", atlas: 0, x: 145, y: 910, width: 144, height: 232 }),
      Eyes: tx({ id: "Fucka.Eyes", atlas: 0, x: 0, y: 1143, width: 144, height: 232 }),
      Footwear: tx({ id: "Fucka.Footwear", atlas: 0, x: 0, y: 0, width: 720, height: 232 }),
      Hair: tx({ id: "Fucka.Hair", atlas: 0, x: 0, y: 1376, width: 144, height: 232 }),
      Mouth: tx({ id: "Fucka.Mouth", atlas: 0, x: 0, y: 1609, width: 144, height: 232 }),
      Mullet: tx({ id: "Fucka.Mullet", atlas: 0, x: 355, y: 699, width: 288, height: 232 }),
      Nose: tx({ id: "Fucka.Nose", atlas: 0, x: 145, y: 1143, width: 144, height: 232 }),
      Penis: tx({ id: "Fucka.Penis", atlas: 0, x: 145, y: 1376, width: 144, height: 232 }),
      Pubes: tx({ id: "Fucka.Pubes", atlas: 0, x: 145, y: 1609, width: 144, height: 232 }),
      Top: tx({ id: "Fucka.Top", atlas: 0, x: 571, y: 466, width: 432, height: 232 }),
      Underwear: tx({ id: "Fucka.Underwear", atlas: 0, x: 644, y: 699, width: 288, height: 232 }),
    },
    Heart: tx({ id: "Heart", atlas: 0, x: 161, y: 663, width: 22, height: 20 }),
    Nudes: {
      BadlyDressed: tx({ id: "Nudes.BadlyDressed", atlas: 0, x: 0, y: 233, width: 570, height: 266 }),
      DemoFag: tx({ id: "Nudes.DemoFag", atlas: 0, x: 0, y: 699, width: 354, height: 210 }),
    },
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
