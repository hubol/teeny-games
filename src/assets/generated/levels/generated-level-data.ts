// This file is generated

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
  Main: () => {
    applyLevel({ width: 1480, height: 776, backgroundTint: 0x20154f });
    return {
      ShapesRadiatingRectangle64px32px: d(Tx.Shapes.RadiatingRectangle64px32px, { x: 1160, y: 200, scaleX: 7, scaleY: 9, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc13e3e }, "BackDecals"),
      RecipeBookOpened: d(Tx.World.RecipeBookOpened, { x: 683, y: 578, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      RecipeBook: d(Tx.World.RecipeBookClosed, { x: 760, y: 576, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      WorldTools: d(Tx.World.Tools, { x: 1160, y: 200, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x4b1c1c }, "BackDecals"),
      ShapesMess0: d(Tx.Shapes.Mess0, { x: 1083, y: 295, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc13e3e }, "BackDecals"),
      ShapesMess0_1: d(Tx.Shapes.Mess0, { x: 976, y: 193, scaleX: 1, scaleY: 1, rotation: 90, originX: 0.5, originY: 0.5, tint: 0xc13e3e }, "BackDecals"),
      ShapesMess0_2: d(Tx.Shapes.Mess0, { x: 938, y: 260, scaleX: 1, scaleY: 1, rotation: 270, originX: 0.5, originY: 0.5, tint: 0x20154f }, "BackDecals"),
      ShapesMess0_3: d(Tx.Shapes.Mess0, { x: 1214, y: 349, scaleX: 1, scaleY: 1, rotation: 360, originX: 0.5, originY: 0.5, tint: 0x48204b }, "BackDecals"),
      ShapesMess0_4: d(Tx.Shapes.Mess0, { x: 1062, y: 61, scaleX: 1, scaleY: 1, rotation: 360, originX: 0.5, originY: 0.5, tint: 0x48204b }, "BackDecals"),
      ShapesSquare32: d(Tx.Shapes.Square32, { x: -3, y: -10, scaleX: 19.5, scaleY: 8, rotation: 0, originX: 0, originY: 0, tint: 0x2b5214 }, "BackDecals"),
      ShapesSquare32_1: d(Tx.Shapes.Square32, { x: -185, y: 188, scaleX: 19.5, scaleY: 8, rotation: 0, originX: 0, originY: 0, tint: 0x2b5214 }, "BackDecals"),
      ShapesSquare32_2: d(Tx.Shapes.Square32, { x: -308, y: 378, scaleX: 19.5, scaleY: 8, rotation: 0, originX: 0, originY: 0, tint: 0x2b5214 }, "BackDecals"),
      ShapesSquare32_3: d(Tx.Shapes.Square32, { x: -217, y: 565, scaleX: 19.5, scaleY: 8, rotation: 0, originX: 0, originY: 0, tint: 0x2b5214 }, "BackDecals"),
      CharacterChicken: d(Tx.Character.Chicken, { x: 256, y: 306, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      CharacterChicken_1: d(Tx.Character.Chicken, { x: 403, y: 296, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      CharacterChicken_2: d(Tx.Character.Chicken, { x: 137, y: 252, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      Item: e(r["Item"], { x: 448, y: 96, values: { itemId: "Potato", name: "" } }, "Entities"),
      Item_1: e(r["Item"], { x: 544, y: 112, values: { itemId: "Potato", name: "" } }, "Entities"),
      Item_2: e(r["Item"], { x: 336, y: 120, values: { itemId: "Potato", name: "" } }, "Entities"),
      Item_3: e(r["Item"], { x: 1046, y: 208, values: { itemId: "Peeler", name: "" } }, "Entities"),
      Item_4: e(r["Item"], { x: 1152, y: 219, values: { itemId: "Grater", name: "" } }, "Entities"),
      Item_5: e(r["Item"], { x: 1104, y: 154, values: { itemId: "Hammer", name: "" } }, "Entities"),
      Item_6: e(r["Item"], { x: 216, y: 416, values: { itemId: "Garlic", name: "" } }, "Entities"),
      Item_7: e(r["Item"], { x: 1272, y: 384, values: { itemId: "Cigarette", name: "" } }, "Entities"),
      Item_8: e(r["Item"], { x: 1264, y: 232, values: { itemId: "Lighter", name: "" } }, "Entities"),
      Item_9: e(r["Item"], { x: 328, y: 256, values: { itemId: "Egg", name: "" } }, "Entities"),
      MixingBowlItem: e(r["Item"], { x: 952, y: 432, values: { itemId: "MixingBowl", name: "MixingBowlItem" } }, "Entities"),
      Item_10: e(r["Item"], { x: 1200, y: 156, values: { itemId: "Scooper", name: "" } }, "Entities"),
      Item_11: e(r["Item"], { x: 536, y: 416, values: { itemId: "Flour", name: "" } }, "Entities"),
      Item_12: e(r["Item"], { x: 872, y: 344, values: { itemId: "HalfCup", name: "" } }, "Entities"),
      Item_13: e(r["Item"], { x: 128, y: 560, values: { itemId: "Onion", name: "" } }, "Entities"),
      Item_14: e(r["Item"], { x: 232, y: 656, values: { itemId: "Carrot", name: "" } }, "Entities"),
      Item_15: e(r["Item"], { x: 1096, y: 664, values: { itemId: "Salt", name: "" } }, "Entities"),
      Item_16: e(r["Item"], { x: 1192, y: 624, values: { itemId: "Pepper", name: "" } }, "Entities"),
    };
  },
  Placeholder: () => {
    applyLevel({ width: 500, height: 280, backgroundTint: 0x408000 });
    return {
      FontFlaccid: d(Tx.Font.Flaccid, { x: 160, y: 216, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      Group1: dg(320, 192, "Group 1", "BackDecals"),
      FontErotixLight: d(Tx.Font.ErotixLight, { x: 320, y: 192, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "Group 1", tint: 0xffffff }, "BackDecals"),
      FontErotix: d(Tx.Font.Erotix, { x: 328, y: 232, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "Group 1", tint: 0xffffff }, "BackDecals"),
      Block: e(r["Block"], { x: 0, y: 192, width: 176, height: 88, values: { name: "", visible: true }, tint: 0x000000 }, "Entities"),
      FontDiggit: d(Tx.Font.Diggit, { x: 408, y: 32, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      Region: e(r["Region"], { x: 72, y: 40, width: 240, height: 120, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "RegionEntities"),
      Marker: e(r["Marker"], { x: 120, y: 88, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_1: e(r["Marker"], { x: 184, y: 120, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_2: e(r["Marker"], { x: 280, y: 112, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_3: e(r["Marker"], { x: 272, y: 64, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
    };
  },
};

export namespace LvlType {
  export type Main = ReturnType<(typeof Lvl)["Main"]>;
  export type Placeholder = ReturnType<(typeof Lvl)["Placeholder"]>;
}
