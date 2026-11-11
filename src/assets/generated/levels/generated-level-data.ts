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
