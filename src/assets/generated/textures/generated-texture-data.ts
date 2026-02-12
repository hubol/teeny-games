// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 34 }];

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
    Boot: {
      Boys: tx({ id: "Boot.Boys", atlas: 0, x: 2067, y: 422, width: 124, height: 72 }),
      For: tx({ id: "Boot.For", atlas: 0, x: 2657, y: 675, width: 84, height: 44 }),
      Hear: tx({ id: "Boot.Hear", atlas: 0, x: 3982, y: 211, width: 114, height: 52 }),
      It: tx({ id: "Boot.It", atlas: 0, x: 2742, y: 675, width: 50, height: 56 }),
      Lets: tx({ id: "Boot.Lets", atlas: 0, x: 2067, y: 495, width: 122, height: 48 }),
      The: tx({ id: "Boot.The", atlas: 0, x: 2568, y: 675, width: 88, height: 48 }),
    },
    Ending: tx({ id: "Ending", atlas: 0, x: 2828, y: 466, width: 500, height: 280 }),
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 2211, y: 224, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 2211, y: 189, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 2372, y: 189, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 3982, y: 264, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 2568, y: 546, width: 256, height: 128 }),
    },
    Fucka: {
      Abdomen: tx({ id: "Fucka.Abdomen", atlas: 0, x: 3001, y: 747, width: 288, height: 232 }),
      Body: tx({ id: "Fucka.Body", atlas: 0, x: 3762, y: 699, width: 144, height: 232 }),
      Bottoms: tx({ id: "Fucka.Bottoms", atlas: 0, x: 3329, y: 466, width: 432, height: 232 }),
      Decoration: tx({ id: "Fucka.Decoration", atlas: 0, x: 2601, y: 0, width: 1008, height: 232 }),
      Eyes: tx({ id: "Fucka.Eyes", atlas: 0, x: 3907, y: 699, width: 144, height: 232 }),
      Footwear: tx({ id: "Fucka.Footwear", atlas: 0, x: 1490, y: 189, width: 720, height: 232 }),
      Hair: tx({ id: "Fucka.Hair", atlas: 0, x: 3290, y: 932, width: 144, height: 232 }),
      Mouth: tx({ id: "Fucka.Mouth", atlas: 0, x: 3329, y: 699, width: 432, height: 232 }),
      Mullet: tx({ id: "Fucka.Mullet", atlas: 0, x: 2568, y: 747, width: 432, height: 232 }),
      Nose: tx({ id: "Fucka.Nose", atlas: 0, x: 1490, y: 422, width: 576, height: 232 }),
      Penis: tx({ id: "Fucka.Penis", atlas: 0, x: 3435, y: 932, width: 144, height: 232 }),
      Pubes: tx({ id: "Fucka.Pubes", atlas: 0, x: 3762, y: 466, width: 288, height: 232 }),
      Top: tx({ id: "Fucka.Top", atlas: 0, x: 2828, y: 233, width: 576, height: 232 }),
      Underwear: tx({ id: "Fucka.Underwear", atlas: 0, x: 3405, y: 233, width: 576, height: 232 }),
    },
    Heart: tx({ id: "Heart", atlas: 0, x: 3610, y: 211, width: 22, height: 20 }),
    Nudes: {
      BadlyDressed: tx({ id: "Nudes.BadlyDressed", atlas: 0, x: 0, y: 189, width: 760, height: 266 }),
      DemoFag: tx({ id: "Nudes.DemoFag", atlas: 0, x: 3610, y: 0, width: 472, height: 210 }),
      Long: tx({ id: "Nudes.Long", atlas: 0, x: 0, y: 0, width: 2600, height: 188 }),
      Pinkerton: tx({ id: "Nudes.Pinkerton", atlas: 0, x: 761, y: 189, width: 728, height: 266 }),
      Tall: tx({ id: "Nudes.Tall", atlas: 0, x: 2211, y: 233, width: 616, height: 312 }),
    },
    Palette: tx({ id: "Palette", atlas: 0, x: 2793, y: 675, width: 24, height: 48 }),
    UseMouse: tx({ id: "UseMouse", atlas: 0, x: 2067, y: 546, width: 500, height: 280 }),
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
