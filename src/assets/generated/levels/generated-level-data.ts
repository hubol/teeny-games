// This file is generated

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
  Main: () => {
    applyLevel({ width: 744, height: 776, backgroundTint: 0x20154f });
    return {
      RecipeBookOpened: d(Tx.World.RecipeBookOpened, { x: 315, y: 578, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      ItemWhiskyGlass: d(Tx.Item.WhiskyGlass, { x: 408, y: 232, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      RecipeBook: d(Tx.World.RecipeBookClosed, { x: 392, y: 576, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      Item: e(r["Item"], { x: 64, y: 152, values: { itemId: "Potato", name: "" } }, "Entities"),
      Item_1: e(r["Item"], { x: 128, y: 96, values: { itemId: "Potato", name: "" } }, "Entities"),
      Item_2: e(r["Item"], { x: 40, y: 48, values: { itemId: "Potato", name: "" } }, "Entities"),
      Item_3: e(r["Item"], { x: 216, y: 224, values: { itemId: "Peeler", name: "" } }, "Entities"),
      Item_4: e(r["Item"], { x: 336, y: 224, values: { itemId: "Grater", name: "" } }, "Entities"),
      Item_5: e(r["Item"], { x: 272, y: 168, values: { itemId: "Hammer", name: "" } }, "Entities"),
      Item_6: e(r["Item"], { x: 424, y: 88, values: { itemId: "Garlic", name: "" } }, "Entities"),
      Item_7: e(r["Item"], { x: 648, y: 208, values: { itemId: "Cigarette", name: "" } }, "Entities"),
      Item_8: e(r["Item"], { x: 504, y: 336, values: { itemId: "Lighter", name: "" } }, "Entities"),
      Item_9: e(r["Item"], { x: 232, y: 368, values: { itemId: "Egg", name: "" } }, "Entities"),
      MixingBowlItem: e(r["Item"], { x: 56, y: 552, values: { itemId: "MixingBowl", name: "MixingBowlItem" } }, "Entities"),
      Item_10: e(r["Item"], { x: 656, y: 384, values: { itemId: "Scooper", name: "" } }, "Entities"),
      Item_11: e(r["Item"], { x: 64, y: 344, values: { itemId: "Flour", name: "" } }, "Entities"),
      Item_12: e(r["Item"], { x: 368, y: 344, values: { itemId: "HalfCup", name: "" } }, "Entities"),
      Item_13: e(r["Item"], { x: 584, y: 488, values: { itemId: "Onion", name: "" } }, "Entities"),
      Item_14: e(r["Item"], { x: 608, y: 568, values: { itemId: "Carrot", name: "" } }, "Entities"),
      Item_15: e(r["Item"], { x: 592, y: 664, values: { itemId: "Salt", name: "" } }, "Entities"),
      Item_16: e(r["Item"], { x: 688, y: 624, values: { itemId: "Pepper", name: "" } }, "Entities"),
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
