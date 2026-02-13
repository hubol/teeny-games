// This file is generated

const atlases = [{ url: require("./atlas0.png"), texturesCount: 38 }];

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
      Boys: tx({ id: "Boot.Boys", atlas: 0, x: 433, y: 1119, width: 124, height: 72 }),
      For: tx({ id: "Boot.For", atlas: 0, x: 4011, y: 665, width: 84, height: 44 }),
      Hear: tx({ id: "Boot.Hear", atlas: 0, x: 3374, y: 129, width: 114, height: 52 }),
      It: tx({ id: "Boot.It", atlas: 0, x: 4031, y: 268, width: 50, height: 56 }),
      Lets: tx({ id: "Boot.Lets", atlas: 0, x: 3251, y: 129, width: 122, height: 48 }),
      The: tx({ id: "Boot.The", atlas: 0, x: 3489, y: 129, width: 88, height: 48 }),
    },
    Done: tx({ id: "Done", atlas: 0, x: 1298, y: 689, width: 96, height: 42 }),
    Ending: tx({ id: "Ending", atlas: 0, x: 2355, y: 456, width: 500, height: 280 }),
    Font: {
      Diggit: tx({ id: "Font.Diggit", atlas: 0, x: 577, y: 886, width: 128, height: 8 }),
      ErotixLight: tx({ id: "Font.ErotixLight", atlas: 0, x: 721, y: 653, width: 160, height: 34 }),
      Erotix: tx({ id: "Font.Erotix", atlas: 0, x: 3935, y: 233, width: 160, height: 34 }),
      Flaccid: tx({ id: "Font.Flaccid", atlas: 0, x: 1195, y: 922, width: 102, height: 24 }),
      GoodBoy: tx({ id: "Font.GoodBoy", atlas: 0, x: 3251, y: 0, width: 256, height: 128 }),
      OldMaiden: tx({ id: "Font.OldMaiden", atlas: 0, x: 3722, y: 456, width: 308, height: 208 }),
    },
    Fucka: {
      Abdomen: tx({ id: "Fucka.Abdomen", atlas: 0, x: 3722, y: 665, width: 288, height: 232 }),
      Body: tx({ id: "Fucka.Body", atlas: 0, x: 3935, y: 0, width: 144, height: 232 }),
      Bottoms: tx({ id: "Fucka.Bottoms", atlas: 0, x: 0, y: 1119, width: 432, height: 232 }),
      Decoration: tx({ id: "Fucka.Decoration", atlas: 0, x: 0, y: 420, width: 1008, height: 232 }),
      Eyes: tx({ id: "Fucka.Eyes", atlas: 0, x: 1050, y: 922, width: 144, height: 232 }),
      Footwear: tx({ id: "Fucka.Footwear", atlas: 0, x: 0, y: 653, width: 720, height: 232 }),
      Hair: tx({ id: "Fucka.Hair", atlas: 0, x: 2300, y: 737, width: 144, height: 232 }),
      Mouth: tx({ id: "Fucka.Mouth", atlas: 0, x: 2856, y: 456, width: 432, height: 232 }),
      Mullet: tx({ id: "Fucka.Mullet", atlas: 0, x: 3289, y: 456, width: 432, height: 232 }),
      Nose: tx({ id: "Fucka.Nose", atlas: 0, x: 721, y: 689, width: 576, height: 232 }),
      Penis: tx({ id: "Fucka.Penis", atlas: 0, x: 2445, y: 737, width: 144, height: 232 }),
      Pubes: tx({ id: "Fucka.Pubes", atlas: 0, x: 2856, y: 689, width: 288, height: 232 }),
      Top: tx({ id: "Fucka.Top", atlas: 0, x: 0, y: 886, width: 576, height: 232 }),
      Underwear: tx({ id: "Fucka.Underwear", atlas: 0, x: 1497, y: 189, width: 1296, height: 232 }),
    },
    Heart: tx({ id: "Heart", atlas: 0, x: 577, y: 895, width: 22, height: 20 }),
    Nudes: {
      BadlyDressed: tx({ id: "Nudes.BadlyDressed", atlas: 0, x: 2794, y: 189, width: 1140, height: 266 }),
      DemoFag: tx({ id: "Nudes.DemoFag", atlas: 0, x: 577, y: 922, width: 472, height: 210 }),
      Long: tx({ id: "Nudes.Long", atlas: 0, x: 0, y: 0, width: 3250, height: 188 }),
      Pinkerton: tx({ id: "Nudes.Pinkerton", atlas: 0, x: 1009, y: 422, width: 728, height: 266 }),
      Slut: tx({ id: "Nudes.Slut", atlas: 0, x: 0, y: 189, width: 1496, height: 230 }),
      Tall: tx({ id: "Nudes.Tall", atlas: 0, x: 1738, y: 422, width: 616, height: 312 }),
    },
    Palette: tx({ id: "Palette", atlas: 0, x: 4031, y: 325, width: 24, height: 48 }),
    SurpriseDressUp: tx({ id: "SurpriseDressUp", atlas: 0, x: 1298, y: 735, width: 500, height: 280 }),
    UseMouse: tx({ id: "UseMouse", atlas: 0, x: 1799, y: 735, width: 500, height: 280 }),
  };
}

export const GeneratedTextureData = {
  atlases,
  txs,
};
