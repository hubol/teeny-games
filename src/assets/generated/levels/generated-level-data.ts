// This file is generated

import { Container, Sprite } from "pixi.js";

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
  Placeholder: (): LvlType.Placeholder => {
    applyLevel({ width: 1632, height: 360, backgroundTint: 0x024809 });
    return {
      LandsSplotch0: d(Tx.Lands.Splotch0, { x: 96, y: 208, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x346a40 }, "BackDecals"),
      LandsSplotch0_1: d(Tx.Lands.Splotch0, { x: 400, y: 24, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x1c8b34 }, "BackDecals"),
      LandsSplotch0_2: d(Tx.Lands.Splotch0, { x: 672, y: 280, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x556a34 }, "BackDecals"),
      LandsSplotch0_3: d(Tx.Lands.Splotch0, { x: 992, y: 48, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x1c8b34 }, "BackDecals"),
      LandsSplotch0_4: d(Tx.Lands.Splotch0, { x: 1280, y: 312, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x346a40 }, "BackDecals"),
      LandsSplotch0_5: d(Tx.Lands.Splotch0, { x: 1424, y: -64, scaleX: -1, scaleY: -1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x556a34 }, "BackDecals"),
      LandsSplotch0_6: d(Tx.Lands.Splotch0, { x: 1688, y: 160, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x1c8b34 }, "BackDecals"),
      LandsFoliage0: d(Tx.Lands.Foliage0, { x: 368, y: 200, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xb2d258 }, "FrontDecals"),
      LandsFoliage0_1: d(Tx.Lands.Foliage0, { x: 584, y: 16, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xb2d258 }, "FrontDecals"),
      LandsFoliage0_2: d(Tx.Lands.Foliage0, { x: 720, y: 208, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xb2d258 }, "FrontDecals"),
      LandsFoliage0_3: d(Tx.Lands.Foliage0, { x: 776, y: 240, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x99ba3d }, "FrontDecals"),
      LandsFlower: d(Tx.Lands.Flower, { x: 691, y: 184, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsFoliage0_4: d(Tx.Lands.Foliage0, { x: 962, y: -1, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x99ba3d }, "FrontDecals"),
      LandsFoliage0_5: d(Tx.Lands.Foliage0, { x: 977, y: 40, scaleX: -1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xb2d258 }, "FrontDecals"),
      LandsFoliage0_6: d(Tx.Lands.Foliage0, { x: 1154, y: 215, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x99ba3d }, "FrontDecals"),
      LandsFoliage0_7: d(Tx.Lands.Foliage0, { x: 1210, y: 247, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xb2d258 }, "FrontDecals"),
      LandsRock0: d(Tx.Lands.Rock0, { x: 34, y: 221, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsRock0_1: d(Tx.Lands.Rock0, { x: 75, y: 241, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsRock0_2: d(Tx.Lands.Rock0, { x: 767, y: 41, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsRock0_3: d(Tx.Lands.Rock0, { x: 884, y: 79, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsRock0_4: d(Tx.Lands.Rock0, { x: 1088, y: 261, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsRock0_5: d(Tx.Lands.Rock0, { x: 1373, y: 39, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsRock0_6: d(Tx.Lands.Rock0, { x: 1551, y: 135, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      LandsDebble: d(Tx.Lands.Debble, { x: 920, y: 288, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "FrontDecals"),
      Region: e(r["Region"], { x: 72, y: 40, width: 240, height: 120, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "RegionEntities"),
      Marker: e(r["Marker"], { x: 120, y: 88, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_1: e(r["Marker"], { x: 184, y: 120, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_2: e(r["Marker"], { x: 280, y: 112, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      Marker_3: e(r["Marker"], { x: 272, y: 64, values: { name: "", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
    };
  },
};

export namespace LvlType {
  export type Placeholder = {
    LandsSplotch0: Sprite;
    LandsSplotch0_1: Sprite;
    LandsSplotch0_2: Sprite;
    LandsSplotch0_3: Sprite;
    LandsSplotch0_4: Sprite;
    LandsSplotch0_5: Sprite;
    LandsSplotch0_6: Sprite;
    LandsFoliage0: Sprite;
    LandsFoliage0_1: Sprite;
    LandsFoliage0_2: Sprite;
    LandsFoliage0_3: Sprite;
    LandsFlower: Sprite;
    LandsFoliage0_4: Sprite;
    LandsFoliage0_5: Sprite;
    LandsFoliage0_6: Sprite;
    LandsFoliage0_7: Sprite;
    LandsRock0: Sprite;
    LandsRock0_1: Sprite;
    LandsRock0_2: Sprite;
    LandsRock0_3: Sprite;
    LandsRock0_4: Sprite;
    LandsRock0_5: Sprite;
    LandsRock0_6: Sprite;
    LandsDebble: Sprite;
    Region: ReturnType<(typeof r)["Region"]>;
    Marker: ReturnType<(typeof r)["Marker"]>;
    Marker_1: ReturnType<(typeof r)["Marker"]>;
    Marker_2: ReturnType<(typeof r)["Marker"]>;
    Marker_3: ReturnType<(typeof r)["Marker"]>;
  };
}
