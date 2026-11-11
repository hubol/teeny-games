// This file is generated

import { Container, Sprite } from "pixi.js";

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
  Aquarium: (): LvlType.Aquarium => {
    applyLevel({ width: 1920, height: 1080, backgroundTint: 0x808080 });
    return {
      FurnitureCastle: d(Tx.Furniture.Castle, { x: 565, y: 597, scaleX: 0.5, scaleY: 0.5, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x9f9f9f }, "BackDecals"),
      KelpGroup0: dg(208, 368, "KelpGroup0", "BackDecals"),
      FoliageKelp0: d(Tx.Foliage.Kelp0, { x: 208, y: 680, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup0", tint: 0x565656 }, "BackDecals"),
      FoliageKelp1: d(Tx.Foliage.Kelp1, { x: 287, y: 572, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup0", tint: 0x565656 }, "BackDecals"),
      FoliageKelp0_1: d(Tx.Foliage.Kelp0, { x: 256, y: 368, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup0", tint: 0x565656 }, "BackDecals"),
      KelpGroup2: dg(1320, 400, "KelpGroup2", "BackDecals"),
      FoliageKelp0_2: d(Tx.Foliage.Kelp0, { x: 1344, y: 648, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup2", tint: 0x565656 }, "BackDecals"),
      FoliageKelp1_1: d(Tx.Foliage.Kelp1, { x: 1407, y: 548, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup2", tint: 0x565656 }, "BackDecals"),
      FoliageKelp0_3: d(Tx.Foliage.Kelp0, { x: 1320, y: 400, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup2", tint: 0x565656 }, "BackDecals"),
      KelpGroup1: dg(816, 464, "KelpGroup1", "BackDecals"),
      FoliageKelp0_4: d(Tx.Foliage.Kelp0, { x: 899, y: 536, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup1", tint: 0x565656 }, "BackDecals"),
      FoliageKelp1_2: d(Tx.Foliage.Kelp1, { x: 816, y: 464, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup1", tint: 0x565656 }, "BackDecals"),
      FurnitureCastle_1: d(Tx.Furniture.Castle, { x: 560, y: 592, scaleX: 0.5, scaleY: 0.5, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      FurnitureRock1: d(Tx.Furniture.Rock1, { x: 49, y: 703, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xa9a9a9 }, "SandDecals"),
      FurnitureRock0: d(Tx.Furniture.Rock0, { x: 918, y: 715, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_1: d(Tx.Furniture.Rock0, { x: 982, y: 739, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_1: d(Tx.Furniture.Rock1, { x: 971, y: 706, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_2: d(Tx.Furniture.Rock0, { x: 1198, y: 691, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_2: d(Tx.Furniture.Rock1, { x: 792, y: 680, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_3: d(Tx.Furniture.Rock1, { x: 743, y: 688, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_3: d(Tx.Furniture.Rock0, { x: 1282, y: 722, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_4: d(Tx.Furniture.Rock0, { x: 1220, y: 755, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_4: d(Tx.Furniture.Rock1, { x: 1276, y: 765, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock2: d(Tx.Furniture.Rock2, { x: 1307, y: 778, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_5: d(Tx.Furniture.Rock0, { x: 1499, y: 683, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_6: d(Tx.Furniture.Rock0, { x: 1575, y: 704, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_7: d(Tx.Furniture.Rock0, { x: 1668, y: 698, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_5: d(Tx.Furniture.Rock1, { x: 1621, y: 729, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_8: d(Tx.Furniture.Rock0, { x: 206, y: 1027, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_9: d(Tx.Furniture.Rock0, { x: 281, y: 1060, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_10: d(Tx.Furniture.Rock0, { x: 182, y: 1074, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_11: d(Tx.Furniture.Rock0, { x: 156, y: 1060, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_12: d(Tx.Furniture.Rock0, { x: 130, y: 1073, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_13: d(Tx.Furniture.Rock0, { x: 171, y: 1064, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_6: d(Tx.Furniture.Rock1, { x: 1616, y: 1062, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock2_1: d(Tx.Furniture.Rock2, { x: 1647, y: 1075, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_7: d(Tx.Furniture.Rock1, { x: 1651, y: 1071, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock2_2: d(Tx.Furniture.Rock2, { x: 1682, y: 1084, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_8: d(Tx.Furniture.Rock1, { x: 1668, y: 1065, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock2_3: d(Tx.Furniture.Rock2, { x: 1699, y: 1078, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_14: d(Tx.Furniture.Rock0, { x: 70, y: 716, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock0_15: d(Tx.Furniture.Rock0, { x: 2, y: 750, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      FurnitureRock1_9: d(Tx.Furniture.Rock1, { x: 57, y: 751, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xc4c4c4 }, "SandDecals"),
      KelpGroup4: dg(48, 632, "KelpGroup4", "FrontDecals"),
      FoliageKelp0_5: d(Tx.Foliage.Kelp0, { x: 48, y: 944, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup4", tint: 0x454545 }, "FrontDecals"),
      FoliageKelp1_3: d(Tx.Foliage.Kelp1, { x: 127, y: 836, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup4", tint: 0x454545 }, "FrontDecals"),
      FoliageKelp0_6: d(Tx.Foliage.Kelp0, { x: 96, y: 632, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup4", tint: 0x454545 }, "FrontDecals"),
      KelpGroup6: dg(1816, 688, "KelpGroup6", "FrontDecals"),
      FoliageKelp0_7: d(Tx.Foliage.Kelp0, { x: 1840, y: 936, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup6", tint: 0x454545 }, "FrontDecals"),
      FoliageKelp1_4: d(Tx.Foliage.Kelp1, { x: 1903, y: 836, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup6", tint: 0x454545 }, "FrontDecals"),
      FoliageKelp0_8: d(Tx.Foliage.Kelp0, { x: 1816, y: 688, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup6", tint: 0x454545 }, "FrontDecals"),
      KelpGroup5: dg(360, 952, "KelpGroup5", "FrontDecals"),
      FoliageKelp0_9: d(Tx.Foliage.Kelp0, { x: 443, y: 1040, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup5", tint: 0x454545 }, "FrontDecals"),
      FoliageKelp1_5: d(Tx.Foliage.Kelp1, { x: 360, y: 968, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup5", tint: 0x454545 }, "FrontDecals"),
      FoliageKelp0_10: d(Tx.Foliage.Kelp0, { x: 1555, y: 1024, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup5", tint: 0x454545 }, "FrontDecals"),
      FoliageKelp1_6: d(Tx.Foliage.Kelp1, { x: 1472, y: 952, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "KelpGroup5", tint: 0x454545 }, "FrontDecals"),
      WaterSurface: dg(968, 18, "WaterSurface", "FrontDecals"),
      FxWaterSurface: d(Tx.Fx.WaterSurface, { x: 968, y: 32, scaleX: 2, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "WaterSurface", tint: 0xffffff }, "FrontDecals"),
      FxWaterSurface_1: d(Tx.Fx.WaterSurface, { x: 1015, y: 18, scaleX: 2.125, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "WaterSurface", tint: 0x2a2a2a }, "FrontDecals"),
      Marker: e(r["Marker"], { x: 112, y: 592, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_1: e(r["Marker"], { x: 280, y: 344, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_2: e(r["Marker"], { x: 504, y: 568, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_3: e(r["Marker"], { x: 704, y: 272, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_4: e(r["Marker"], { x: 848, y: 424, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_5: e(r["Marker"], { x: 1120, y: 696, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_6: e(r["Marker"], { x: 1336, y: 416, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_7: e(r["Marker"], { x: 1688, y: 296, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_8: e(r["Marker"], { x: 1696, y: 768, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_9: e(r["Marker"], { x: -72, y: 192, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_10: e(r["Marker"], { x: 1168, y: 136, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
    };
  },
  Placeholder: (): LvlType.Placeholder => {
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
  export type Aquarium = {
    FurnitureCastle: Sprite;
    KelpGroup0: Container<Sprite>;
    FoliageKelp0: Sprite;
    FoliageKelp1: Sprite;
    FoliageKelp0_1: Sprite;
    KelpGroup2: Container<Sprite>;
    FoliageKelp0_2: Sprite;
    FoliageKelp1_1: Sprite;
    FoliageKelp0_3: Sprite;
    KelpGroup1: Container<Sprite>;
    FoliageKelp0_4: Sprite;
    FoliageKelp1_2: Sprite;
    FurnitureCastle_1: Sprite;
    FurnitureRock1: Sprite;
    FurnitureRock0: Sprite;
    FurnitureRock0_1: Sprite;
    FurnitureRock1_1: Sprite;
    FurnitureRock0_2: Sprite;
    FurnitureRock1_2: Sprite;
    FurnitureRock1_3: Sprite;
    FurnitureRock0_3: Sprite;
    FurnitureRock0_4: Sprite;
    FurnitureRock1_4: Sprite;
    FurnitureRock2: Sprite;
    FurnitureRock0_5: Sprite;
    FurnitureRock0_6: Sprite;
    FurnitureRock0_7: Sprite;
    FurnitureRock1_5: Sprite;
    FurnitureRock0_8: Sprite;
    FurnitureRock0_9: Sprite;
    FurnitureRock0_10: Sprite;
    FurnitureRock0_11: Sprite;
    FurnitureRock0_12: Sprite;
    FurnitureRock0_13: Sprite;
    FurnitureRock1_6: Sprite;
    FurnitureRock2_1: Sprite;
    FurnitureRock1_7: Sprite;
    FurnitureRock2_2: Sprite;
    FurnitureRock1_8: Sprite;
    FurnitureRock2_3: Sprite;
    FurnitureRock0_14: Sprite;
    FurnitureRock0_15: Sprite;
    FurnitureRock1_9: Sprite;
    KelpGroup4: Container<Sprite>;
    FoliageKelp0_5: Sprite;
    FoliageKelp1_3: Sprite;
    FoliageKelp0_6: Sprite;
    KelpGroup6: Container<Sprite>;
    FoliageKelp0_7: Sprite;
    FoliageKelp1_4: Sprite;
    FoliageKelp0_8: Sprite;
    KelpGroup5: Container<Sprite>;
    FoliageKelp0_9: Sprite;
    FoliageKelp1_5: Sprite;
    FoliageKelp0_10: Sprite;
    FoliageKelp1_6: Sprite;
    WaterSurface: Container<Sprite>;
    FxWaterSurface: Sprite;
    FxWaterSurface_1: Sprite;
    Marker: ReturnType<(typeof r)["Marker"]>;
    Marker_1: ReturnType<(typeof r)["Marker"]>;
    Marker_2: ReturnType<(typeof r)["Marker"]>;
    Marker_3: ReturnType<(typeof r)["Marker"]>;
    Marker_4: ReturnType<(typeof r)["Marker"]>;
    Marker_5: ReturnType<(typeof r)["Marker"]>;
    Marker_6: ReturnType<(typeof r)["Marker"]>;
    Marker_7: ReturnType<(typeof r)["Marker"]>;
    Marker_8: ReturnType<(typeof r)["Marker"]>;
    Marker_9: ReturnType<(typeof r)["Marker"]>;
    Marker_10: ReturnType<(typeof r)["Marker"]>;
  };
  export type Placeholder = {
    FontFlaccid: Sprite;
    Group1: Container<Sprite>;
    FontErotixLight: Sprite;
    FontErotix: Sprite;
    Block: ReturnType<(typeof r)["Block"]>;
    FontDiggit: Sprite;
    Region: ReturnType<(typeof r)["Region"]>;
    Marker: ReturnType<(typeof r)["Marker"]>;
    Marker_1: ReturnType<(typeof r)["Marker"]>;
    Marker_2: ReturnType<(typeof r)["Marker"]>;
    Marker_3: ReturnType<(typeof r)["Marker"]>;
  };
}
