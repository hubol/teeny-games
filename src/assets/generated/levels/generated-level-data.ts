// This file is generated

import { Container, Sprite } from "pixi.js";

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
  Designer: (): LvlType.Designer => {
    applyLevel({ width: 1920, height: 1080, backgroundTint: 0x408000 });
    return {
      DesignerBackground: d(Tx.Designer.Background, { x: 0, y: 0, scaleX: 3.05, scaleY: 3.05, rotation: 0, originX: 0, originY: 0, tint: 0xffffff }, "BackDecals"),
      Marker: e(r["Marker"], { x: 1336, y: 472, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_1: e(r["Marker"], { x: 1576, y: 600, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_2: e(r["Marker"], { x: 1743, y: 488, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_3: e(r["Marker"], { x: 1528, y: 365, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_4: e(r["Marker"], { x: 1616, y: 269, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_5: e(r["Marker"], { x: 1840, y: 149, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_6: e(r["Marker"], { x: 1648, y: 293, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_7: e(r["Marker"], { x: 1520, y: 141, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_8: e(r["Marker"], { x: 847, y: 424, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_9: e(r["Marker"], { x: 720, y: 205, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_10: e(r["Marker"], { x: 944, y: 85, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_11: e(r["Marker"], { x: 752, y: 229, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_12: e(r["Marker"], { x: 72, y: 405, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
      Marker_13: e(r["Marker"], { x: 24, y: 245, values: { name: "", depth: 0 }, tint: 0xb7ace2 }, "MarkerEntities"),
    };
  },
  Placeholder: (): LvlType.Placeholder => {
    applyLevel({ width: 2032, height: 448, backgroundTint: 0x408000 });
    return {
      FontFlaccid: d(Tx.Font.Flaccid, { x: 160, y: 216, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      Group1: dg(320, 192, "Group 1", "BackDecals"),
      FontErotixLight: d(Tx.Font.ErotixLight, { x: 320, y: 192, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "Group 1", tint: 0xffffff }, "BackDecals"),
      FontErotix: d(Tx.Font.Erotix, { x: 328, y: 232, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "Group 1", tint: 0xffffff }, "BackDecals"),
      Block: e(r["Block"], { x: 0, y: 64, width: 280, height: 224, values: { name: "", visible: true }, tint: 0x000000 }, "Entities"),
      Slope: e(r["Slope"], { x: 0, y: 112, width: 320, height: 176, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x6d1111 }, "Entities"),
      Block_1: e(r["Block"], { x: 240, y: 104, width: 280, height: 224, values: { name: "", visible: true }, tint: 0x000000 }, "Entities"),
      Slope_1: e(r["Slope"], { x: 192, y: 88, width: 320, height: 176, flippedX: false, flippedY: false, values: { name: "", visible: true }, tint: 0x6d1111 }, "Entities"),
      Block_2: e(r["Block"], { x: 512, y: 88, width: 1344, height: 56, values: { name: "", visible: true }, tint: 0x000000 }, "Entities"),
      Block_3: e(r["Block"], { x: 512, y: 128, width: 1344, height: 56, values: { name: "", visible: true }, tint: 0x6d1111 }, "Entities"),
      Block_4: e(r["Block"], { x: 512, y: 168, width: 1344, height: 56, values: { name: "", visible: true }, tint: 0x6d4e11 }, "Entities"),
      Block_5: e(r["Block"], { x: 512, y: 208, width: 1344, height: 56, values: { name: "", visible: true }, tint: 0xed9e04 }, "Entities"),
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
  export type Designer = {
    DesignerBackground: Sprite;
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
    Marker_11: ReturnType<(typeof r)["Marker"]>;
    Marker_12: ReturnType<(typeof r)["Marker"]>;
    Marker_13: ReturnType<(typeof r)["Marker"]>;
  };
  export type Placeholder = {
    FontFlaccid: Sprite;
    Group1: Container<Sprite>;
    FontErotixLight: Sprite;
    FontErotix: Sprite;
    Block: ReturnType<(typeof r)["Block"]>;
    Slope: ReturnType<(typeof r)["Slope"]>;
    Block_1: ReturnType<(typeof r)["Block"]>;
    Slope_1: ReturnType<(typeof r)["Slope"]>;
    Block_2: ReturnType<(typeof r)["Block"]>;
    Block_3: ReturnType<(typeof r)["Block"]>;
    Block_4: ReturnType<(typeof r)["Block"]>;
    Block_5: ReturnType<(typeof r)["Block"]>;
    FontDiggit: Sprite;
    Region: ReturnType<(typeof r)["Region"]>;
    Marker: ReturnType<(typeof r)["Marker"]>;
    Marker_1: ReturnType<(typeof r)["Marker"]>;
    Marker_2: ReturnType<(typeof r)["Marker"]>;
    Marker_3: ReturnType<(typeof r)["Marker"]>;
  };
}
