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
      Shadow: d(Tx.Fx.ShadowMessy, { x: 1156, y: 1024, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x1a0f44 }, "BackDecals"),
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
  Skate: (): LvlType.Skate => {
    applyLevel({ width: 12528, height: 8736, backgroundTint: 0x1a0f44 });
    return {
      SkateStars: d(Tx.Skate.Stars, { x: 616, y: 432, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_1: d(Tx.Skate.Stars, { x: 960, y: 912, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_2: d(Tx.Skate.Stars, { x: 1467, y: 1311, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_3: d(Tx.Skate.Stars, { x: 1576, y: 392, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_4: d(Tx.Skate.Stars, { x: 1920, y: 800, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_5: d(Tx.Skate.Stars, { x: 2427, y: 1271, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_6: d(Tx.Skate.Stars, { x: 2560, y: 2064, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_7: d(Tx.Skate.Stars, { x: 2904, y: 2544, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_8: d(Tx.Skate.Stars, { x: 3411, y: 2943, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_9: d(Tx.Skate.Stars, { x: 3520, y: 2024, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_10: d(Tx.Skate.Stars, { x: 3864, y: 2432, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_11: d(Tx.Skate.Stars, { x: 4371, y: 2903, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_12: d(Tx.Skate.Stars, { x: 4088, y: 3600, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_13: d(Tx.Skate.Stars, { x: 4184, y: 4248, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_14: d(Tx.Skate.Stars, { x: 4467, y: 4671, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_15: d(Tx.Skate.Stars, { x: 4968, y: 3640, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_16: d(Tx.Skate.Stars, { x: 4568, y: 4048, scaleX: -3, scaleY: -3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_17: d(Tx.Skate.Stars, { x: 5899, y: 4439, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_18: d(Tx.Skate.Stars, { x: 5224, y: 5144, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_19: d(Tx.Skate.Stars, { x: 5568, y: 5624, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_20: d(Tx.Skate.Stars, { x: 6075, y: 6023, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_21: d(Tx.Skate.Stars, { x: 6072, y: 4896, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_22: d(Tx.Skate.Stars, { x: 6528, y: 5512, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_23: d(Tx.Skate.Stars, { x: 7035, y: 5983, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_24: d(Tx.Skate.Stars, { x: 6299, y: 6727, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_25: d(Tx.Skate.Stars, { x: 7587, y: 5207, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_26: d(Tx.Skate.Stars, { x: 4560, y: 840, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_27: d(Tx.Skate.Stars, { x: 4904, y: 1320, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_28: d(Tx.Skate.Stars, { x: 5411, y: 1719, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_29: d(Tx.Skate.Stars, { x: 5520, y: 800, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_30: d(Tx.Skate.Stars, { x: 5864, y: 1208, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_31: d(Tx.Skate.Stars, { x: 6371, y: 1679, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_32: d(Tx.Skate.Stars, { x: 6088, y: 2376, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_33: d(Tx.Skate.Stars, { x: 6184, y: 3024, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_34: d(Tx.Skate.Stars, { x: 6467, y: 3447, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_35: d(Tx.Skate.Stars, { x: 6968, y: 2416, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_36: d(Tx.Skate.Stars, { x: 6568, y: 2824, scaleX: -3, scaleY: -3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_37: d(Tx.Skate.Stars, { x: 7899, y: 3215, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_38: d(Tx.Skate.Stars, { x: 7224, y: 3920, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_39: d(Tx.Skate.Stars, { x: 7568, y: 4400, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_40: d(Tx.Skate.Stars, { x: 8072, y: 3672, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_41: d(Tx.Skate.Stars, { x: 8528, y: 4288, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_42: d(Tx.Skate.Stars, { x: 9035, y: 4759, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_43: d(Tx.Skate.Stars, { x: 6376, y: -1128, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_44: d(Tx.Skate.Stars, { x: 6720, y: -648, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_45: d(Tx.Skate.Stars, { x: 7227, y: -249, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_46: d(Tx.Skate.Stars, { x: 7336, y: -1168, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_47: d(Tx.Skate.Stars, { x: 7680, y: -760, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_48: d(Tx.Skate.Stars, { x: 9019, y: -777, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_49: d(Tx.Skate.Stars, { x: 8736, y: -80, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_50: d(Tx.Skate.Stars, { x: 8000, y: 1056, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_51: d(Tx.Skate.Stars, { x: 7611, y: 1703, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_52: d(Tx.Skate.Stars, { x: 9616, y: -40, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_53: d(Tx.Skate.Stars, { x: 9216, y: 368, scaleX: -3, scaleY: -3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_54: d(Tx.Skate.Stars, { x: 9043, y: 1471, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_55: d(Tx.Skate.Stars, { x: 8368, y: 2176, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_56: d(Tx.Skate.Stars, { x: 8712, y: 2656, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_57: d(Tx.Skate.Stars, { x: 9216, y: 1928, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_58: d(Tx.Skate.Stars, { x: 10344, y: 2320, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_59: d(Tx.Skate.Stars, { x: 11427, y: 3255, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_60: d(Tx.Skate.Stars, { x: 11176, y: 1648, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_61: d(Tx.Skate.Stars, { x: 11667, y: -3417, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_62: d(Tx.Skate.Stars, { x: 11384, y: -2720, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_63: d(Tx.Skate.Stars, { x: 12264, y: -2680, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_64: d(Tx.Skate.Stars, { x: 11864, y: -2272, scaleX: -3, scaleY: -3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_65: d(Tx.Skate.Stars, { x: 11691, y: -1169, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_66: d(Tx.Skate.Stars, { x: 11016, y: -464, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_67: d(Tx.Skate.Stars, { x: 11360, y: 16, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_68: d(Tx.Skate.Stars, { x: 11864, y: -712, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_69: d(Tx.Skate.Stars, { x: 12992, y: -320, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_70: d(Tx.Skate.Stars, { x: 14075, y: 615, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_71: d(Tx.Skate.Stars, { x: 14032, y: -3456, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_72: d(Tx.Skate.Stars, { x: 13632, y: -3048, scaleX: -3, scaleY: -3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_73: d(Tx.Skate.Stars, { x: 13459, y: -1945, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_74: d(Tx.Skate.Stars, { x: 13632, y: -1488, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_75: d(Tx.Skate.Stars, { x: 14760, y: -1096, scaleX: -3, scaleY: 3, rotation: 180, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateStars_76: d(Tx.Skate.Stars, { x: 15843, y: -161, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "ParallaxDecals1"),
      SkateCloud0: d(Tx.Skate.Cloud0, { x: 3017, y: 2358, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_1: d(Tx.Skate.Cloud0, { x: 2244, y: 1682, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_2: d(Tx.Skate.Cloud0, { x: 2889, y: 1765, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_3: d(Tx.Skate.Cloud0, { x: 4046, y: 2731, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_4: d(Tx.Skate.Cloud0, { x: 4691, y: 2814, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_5: d(Tx.Skate.Cloud0, { x: 4017, y: 3334, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_6: d(Tx.Skate.Cloud0, { x: 4681, y: 3398, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_7: d(Tx.Skate.Cloud0, { x: 7177, y: 2262, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_8: d(Tx.Skate.Cloud0, { x: 7049, y: 1669, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_9: d(Tx.Skate.Cloud0, { x: 8206, y: 2635, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_10: d(Tx.Skate.Cloud0, { x: 8851, y: 2718, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_11: d(Tx.Skate.Cloud0, { x: 8177, y: 3238, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_12: d(Tx.Skate.Cloud0, { x: 8841, y: 3302, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_13: d(Tx.Skate.Cloud0, { x: 10017, y: 3654, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_14: d(Tx.Skate.Cloud0, { x: 9889, y: 3061, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_15: d(Tx.Skate.Cloud0, { x: 11046, y: 4027, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_16: d(Tx.Skate.Cloud0, { x: 11691, y: 4110, scaleX: -3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_17: d(Tx.Skate.Cloud0, { x: 11017, y: 4630, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      SkateCloud0_18: d(Tx.Skate.Cloud0, { x: 11681, y: 4694, scaleX: 3, scaleY: 3, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x21164a }, "ParallaxDecals0"),
      ShapesSquare32: d(Tx.Shapes.Square32, { x: 8338, y: 4726, scaleX: 1, scaleY: 70, rotation: 0, originX: 0.5, originY: 0, tint: 0x454545 }, "BackDecals"),
      ShapesSquare32_1: d(Tx.Shapes.Square32, { x: 7977, y: 5406, scaleX: 1, scaleY: 70, rotation: 0, originX: 0.5, originY: 0, tint: 0x454545 }, "BackDecals"),
      ShapesSquare32_2: d(Tx.Shapes.Square32, { x: 7741, y: 5761, scaleX: 1, scaleY: 70, rotation: 0, originX: 0.5, originY: 0, tint: 0x454545 }, "BackDecals"),
      ShapesSquare32_3: d(Tx.Shapes.Square32, { x: 8199, y: 4970, scaleX: 1, scaleY: 70, rotation: 0, originX: 0.5, originY: 0, tint: 0x454545 }, "BackDecals"),
      DesignerBackground: d(Tx.Designer.Background, { x: -2896, y: 5824, scaleX: 3.05, scaleY: 3.05, rotation: 0, originX: 0, originY: 0, tint: 0xffffff }, "BackDecals"),
      ShapesSquare32_4: d(Tx.Shapes.Square32, { x: 1560, y: 1997, scaleX: 46, scaleY: 36, rotation: 33.981616608327556, originX: 0, originY: 0, tint: 0x291f51 }, "BackDecals"),
      ShapesSquare32_5: d(Tx.Shapes.Square32, { x: 2784, y: 2808, scaleX: 170, scaleY: 36, rotation: 49.71225247777801, originX: 0, originY: 0, tint: 0x291f51 }, "BackDecals"),
      ShapesSquare32_6: d(Tx.Shapes.Square32, { x: 4092, y: 6925, scaleX: 331, scaleY: 45, rotation: 0, originX: 0, originY: 0, tint: 0x291f51 }, "BackDecals"),
      ShapesSquare32_7: d(Tx.Shapes.Square32, { x: 6312, y: 8540, scaleX: 135, scaleY: 8, rotation: 294.80180001289955, originX: 0, originY: 0, tint: 0x929292 }, "BackDecals"),
      ShapesSquare32_8: d(Tx.Shapes.Square32, { x: 7016, y: 6784, scaleX: 17, scaleY: 11, rotation: 0, originX: 0, originY: 0, tint: 0x291f51 }, "BackDecals"),
      SkateGrass0: d(Tx.Skate.Grass0, { x: 858, y: 1939, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x291f51 }, "BackDecals"),
      SkateTombstoneEnvironment: d(Tx.Skate.TombstoneEnvironment, { x: 2024, y: 2288, scaleX: -1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xe5dce9 }, "BackDecals"),
      SkateTombstoneEnvironment_1: d(Tx.Skate.TombstoneEnvironment, { x: 2432, y: 2560, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xe5dce9 }, "BackDecals"),
      ShapesSquare32_9: d(Tx.Shapes.Square32, { x: 6560, y: 7016, scaleX: 30, scaleY: 45, rotation: 0, originX: 0, originY: 0, tint: 0x291f51 }, "BackDecals"),
      Block: e(r["Block"], { x: 744, y: 1960, width: 760, height: 712, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope: e(r["Slope"], { x: 1504, y: 1960, width: 216, height: 144, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_1: e(r["Slope"], { x: 3696, y: 3880, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_2: e(r["Slope"], { x: 6160, y: 6784, width: 216, height: 144, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Block_1: e(r["Block"], { x: 6384, y: 6928, width: 416, height: 704, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_3: e(r["Slope"], { x: 6800, y: 6784, width: 216, height: 144, flippedX: false, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_4: e(r["Slope"], { x: 7016, y: 6520, width: 224, height: 264, flippedX: false, flippedY: false, values: { name: "", visible: true }, tint: 0x929292 }, "Entities"),
      Slope_5: e(r["Slope"], { x: 7240, y: 6040, width: 224, height: 480, flippedX: false, flippedY: false, values: { name: "", visible: true }, tint: 0x929292 }, "Entities"),
      Slope_6: e(r["Slope"], { x: 7464, y: 5560, width: 224, height: 480, flippedX: false, flippedY: false, values: { name: "", visible: true }, tint: 0x929292 }, "Entities"),
      Slope_7: e(r["Slope"], { x: 7688, y: 5080, width: 224, height: 480, flippedX: false, flippedY: false, values: { name: "", visible: true }, tint: 0x929292 }, "Entities"),
      Slope_8: e(r["Slope"], { x: 7912, y: 4600, width: 224, height: 480, flippedX: false, flippedY: false, values: { name: "", visible: true }, tint: 0x929292 }, "Entities"),
      Slope_9: e(r["Slope"], { x: 1720, y: 2104, width: 216, height: 144, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_10: e(r["Slope"], { x: 1936, y: 2248, width: 216, height: 144, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_11: e(r["Slope"], { x: 2152, y: 2392, width: 216, height: 144, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_12: e(r["Slope"], { x: 2368, y: 2536, width: 216, height: 144, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_13: e(r["Slope"], { x: 2584, y: 2680, width: 216, height: 144, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_14: e(r["Slope"], { x: 2800, y: 2824, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_15: e(r["Slope"], { x: 3024, y: 3088, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_16: e(r["Slope"], { x: 3248, y: 3352, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_17: e(r["Slope"], { x: 3472, y: 3616, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_18: e(r["Slope"], { x: 4816, y: 5200, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_19: e(r["Slope"], { x: 3920, y: 4144, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_20: e(r["Slope"], { x: 4144, y: 4408, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_21: e(r["Slope"], { x: 4368, y: 4672, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_22: e(r["Slope"], { x: 4592, y: 4936, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_23: e(r["Slope"], { x: 5936, y: 6520, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_24: e(r["Slope"], { x: 5040, y: 5464, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_25: e(r["Slope"], { x: 5264, y: 5728, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_26: e(r["Slope"], { x: 5488, y: 5992, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_27: e(r["Slope"], { x: 5712, y: 6256, width: 224, height: 264, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Block_2: e(r["Block"], { x: -8, y: 1960, width: 760, height: 712, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      Slope_28: e(r["Slope"], { x: 352, y: 1904, width: 504, height: 64, flippedX: true, flippedY: false, values: { name: "", visible: true }, tint: 0x291f51 }, "Entities"),
      SkateGrass0_1: d(Tx.Skate.Grass0, { x: 902, y: 1950, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "TerrainDecals"),
      SkateGrass0_2: d(Tx.Skate.Grass0, { x: 1195, y: 1948, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "TerrainDecals"),
      SkateGrass0_3: d(Tx.Skate.Grass0, { x: 1242, y: 1941, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "TerrainDecals"),
      SkateTombstoneEnvironment_2: d(Tx.Skate.TombstoneEnvironment, { x: 752, y: 2121, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateTombstoneEnvironment_3: d(Tx.Skate.TombstoneEnvironment, { x: 968, y: 2145, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateTombstoneEnvironment_4: d(Tx.Skate.TombstoneEnvironment, { x: 1184, y: 2161, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateLetterR: d(Tx.Skate.LetterR, { x: 752, y: 2117, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateLetterI: d(Tx.Skate.LetterI, { x: 968, y: 2141, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateLetterP: d(Tx.Skate.LetterP, { x: 1184, y: 2157, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateTombstoneEnvironment_5: d(Tx.Skate.TombstoneEnvironment, { x: 1776, y: 2296, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateTombstoneEnvironment_6: d(Tx.Skate.TombstoneEnvironment, { x: 2176, y: 2560, scaleX: 1.67, scaleY: 1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0: d(Tx.Skate.Caution0, { x: 8113, y: 4766, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_1: d(Tx.Skate.Caution0, { x: 8009, y: 4990, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_2: d(Tx.Skate.Caution0, { x: 7905, y: 5214, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_3: d(Tx.Skate.Caution0, { x: 7801, y: 5438, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_4: d(Tx.Skate.Caution0, { x: 7697, y: 5662, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_5: d(Tx.Skate.Caution0, { x: 7593, y: 5886, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_6: d(Tx.Skate.Caution0, { x: 7489, y: 6110, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_7: d(Tx.Skate.Caution0, { x: 7385, y: 6334, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateCaution0_8: d(Tx.Skate.Caution0, { x: 7280, y: 6558, scaleX: -1.67, scaleY: -1.67, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      ShapesSquare32_10: d(Tx.Shapes.Square32, { x: 7284, y: 6660, scaleX: 5, scaleY: 5, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x929292 }, "TerrainDecals"),
      SkateCaution0_9: d(Tx.Skate.Caution0, { x: 7184, y: 6670, scaleX: -1.67, scaleY: -1.67, rotation: 16.55874568147068, originX: 0.5, originY: 0.5, tint: 0xffffff }, "TerrainDecals"),
      SkateGrass0_4: d(Tx.Skate.Grass0, { x: 1641, y: 2055, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_5: d(Tx.Skate.Grass0, { x: 1693, y: 2130, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_6: d(Tx.Skate.Grass0, { x: 1759, y: 2123, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_7: d(Tx.Skate.Grass0, { x: 2025, y: 2404, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_8: d(Tx.Skate.Grass0, { x: 2077, y: 2479, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_9: d(Tx.Skate.Grass0, { x: 2143, y: 2472, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_10: d(Tx.Skate.Grass0, { x: 2251, y: 2467, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_11: d(Tx.Skate.Grass0, { x: 2303, y: 2542, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_12: d(Tx.Skate.Grass0, { x: 2369, y: 2535, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_13: d(Tx.Skate.Grass0, { x: 2542, y: 2783, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_14: d(Tx.Skate.Grass0, { x: 2626, y: 2762, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_15: d(Tx.Skate.Grass0, { x: 2692, y: 2755, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x291f51 }, "FrontDecals"),
      SkateGrass0_16: d(Tx.Skate.Grass0, { x: 2768, y: 2846, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_17: d(Tx.Skate.Grass0, { x: 2820, y: 2921, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_18: d(Tx.Skate.Grass0, { x: 2886, y: 2914, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_19: d(Tx.Skate.Grass0, { x: 3074, y: 3149, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x291f51 }, "FrontDecals"),
      SkateGrass0_20: d(Tx.Skate.Grass0, { x: 3014, y: 3280, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_21: d(Tx.Skate.Grass0, { x: 3150, y: 3240, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_22: d(Tx.Skate.Grass0, { x: 3156, y: 3364, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_23: d(Tx.Skate.Grass0, { x: 3208, y: 3439, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_24: d(Tx.Skate.Grass0, { x: 3293, y: 3387, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_25: d(Tx.Skate.Grass0, { x: 3446, y: 3603, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_26: d(Tx.Skate.Grass0, { x: 3386, y: 3734, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_27: d(Tx.Skate.Grass0, { x: 3522, y: 3694, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_28: d(Tx.Skate.Grass0, { x: 3528, y: 3818, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_29: d(Tx.Skate.Grass0, { x: 3580, y: 3893, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_30: d(Tx.Skate.Grass0, { x: 3665, y: 3841, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_31: d(Tx.Skate.Grass0, { x: 3873, y: 4086, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_32: d(Tx.Skate.Grass0, { x: 3813, y: 4217, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_33: d(Tx.Skate.Grass0, { x: 3949, y: 4177, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_34: d(Tx.Skate.Grass0, { x: 4011, y: 4245, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_35: d(Tx.Skate.Grass0, { x: 4007, y: 4376, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_36: d(Tx.Skate.Grass0, { x: 4092, y: 4324, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_37: d(Tx.Skate.Grass0, { x: 4216, y: 4578, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_38: d(Tx.Skate.Grass0, { x: 4268, y: 4653, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_39: d(Tx.Skate.Grass0, { x: 4380, y: 4663, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_40: d(Tx.Skate.Grass0, { x: 4497, y: 4830, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_41: d(Tx.Skate.Grass0, { x: 4558, y: 4990, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_42: d(Tx.Skate.Grass0, { x: 4726, y: 5111, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_43: d(Tx.Skate.Grass0, { x: 4722, y: 5186, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_44: d(Tx.Skate.Grass0, { x: 4834, y: 5196, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_45: d(Tx.Skate.Grass0, { x: 4951, y: 5363, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_46: d(Tx.Skate.Grass0, { x: 5012, y: 5523, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_47: d(Tx.Skate.Grass0, { x: 5062, y: 5582, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_48: d(Tx.Skate.Grass0, { x: 5230, y: 5703, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_49: d(Tx.Skate.Grass0, { x: 5226, y: 5778, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_50: d(Tx.Skate.Grass0, { x: 5338, y: 5788, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_51: d(Tx.Skate.Grass0, { x: 5455, y: 5955, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_52: d(Tx.Skate.Grass0, { x: 5516, y: 6115, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_53: d(Tx.Skate.Grass0, { x: 5566, y: 6118, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_54: d(Tx.Skate.Grass0, { x: 5702, y: 6271, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_55: d(Tx.Skate.Grass0, { x: 5730, y: 6314, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_56: d(Tx.Skate.Grass0, { x: 5810, y: 6356, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_57: d(Tx.Skate.Grass0, { x: 5927, y: 6523, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_58: d(Tx.Skate.Grass0, { x: 6041, y: 6644, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_59: d(Tx.Skate.Grass0, { x: 6316, y: 6884, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_60: d(Tx.Skate.Grass0, { x: 6381, y: 6954, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_61: d(Tx.Skate.Grass0, { x: 6436, y: 6920, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_62: d(Tx.Skate.Grass0, { x: 6497, y: 6957, scaleX: 2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_63: d(Tx.Skate.Grass0, { x: 6549, y: 6917, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_64: d(Tx.Skate.Grass0, { x: 6715, y: 6923, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_65: d(Tx.Skate.Grass0, { x: 6786, y: 6947, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      SkateGrass0_66: d(Tx.Skate.Grass0, { x: 6829, y: 6903, scaleX: -2, scaleY: 2, rotation: 0, originX: 0.5, originY: 0.5, tint: 0x3d316b }, "FrontDecals"),
      BeginFlightRegion: e(r["Region"], { x: 8136, y: 3416, width: 1232, height: 1344, values: { name: "BeginFlightRegion", depth: 0 }, tint: 0x00ff00 }, "RegionEntities"),
      StartMarker: e(r["Marker"], { x: 1128, y: 1944, values: { name: "StartMarker", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
    };
  },
};

export namespace LvlType {
  export type Designer = {
    DesignerBackground: Sprite;
    Shadow: Sprite;
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
  export type Skate = {
    SkateStars: Sprite;
    SkateStars_1: Sprite;
    SkateStars_2: Sprite;
    SkateStars_3: Sprite;
    SkateStars_4: Sprite;
    SkateStars_5: Sprite;
    SkateStars_6: Sprite;
    SkateStars_7: Sprite;
    SkateStars_8: Sprite;
    SkateStars_9: Sprite;
    SkateStars_10: Sprite;
    SkateStars_11: Sprite;
    SkateStars_12: Sprite;
    SkateStars_13: Sprite;
    SkateStars_14: Sprite;
    SkateStars_15: Sprite;
    SkateStars_16: Sprite;
    SkateStars_17: Sprite;
    SkateStars_18: Sprite;
    SkateStars_19: Sprite;
    SkateStars_20: Sprite;
    SkateStars_21: Sprite;
    SkateStars_22: Sprite;
    SkateStars_23: Sprite;
    SkateStars_24: Sprite;
    SkateStars_25: Sprite;
    SkateStars_26: Sprite;
    SkateStars_27: Sprite;
    SkateStars_28: Sprite;
    SkateStars_29: Sprite;
    SkateStars_30: Sprite;
    SkateStars_31: Sprite;
    SkateStars_32: Sprite;
    SkateStars_33: Sprite;
    SkateStars_34: Sprite;
    SkateStars_35: Sprite;
    SkateStars_36: Sprite;
    SkateStars_37: Sprite;
    SkateStars_38: Sprite;
    SkateStars_39: Sprite;
    SkateStars_40: Sprite;
    SkateStars_41: Sprite;
    SkateStars_42: Sprite;
    SkateStars_43: Sprite;
    SkateStars_44: Sprite;
    SkateStars_45: Sprite;
    SkateStars_46: Sprite;
    SkateStars_47: Sprite;
    SkateStars_48: Sprite;
    SkateStars_49: Sprite;
    SkateStars_50: Sprite;
    SkateStars_51: Sprite;
    SkateStars_52: Sprite;
    SkateStars_53: Sprite;
    SkateStars_54: Sprite;
    SkateStars_55: Sprite;
    SkateStars_56: Sprite;
    SkateStars_57: Sprite;
    SkateStars_58: Sprite;
    SkateStars_59: Sprite;
    SkateStars_60: Sprite;
    SkateStars_61: Sprite;
    SkateStars_62: Sprite;
    SkateStars_63: Sprite;
    SkateStars_64: Sprite;
    SkateStars_65: Sprite;
    SkateStars_66: Sprite;
    SkateStars_67: Sprite;
    SkateStars_68: Sprite;
    SkateStars_69: Sprite;
    SkateStars_70: Sprite;
    SkateStars_71: Sprite;
    SkateStars_72: Sprite;
    SkateStars_73: Sprite;
    SkateStars_74: Sprite;
    SkateStars_75: Sprite;
    SkateStars_76: Sprite;
    SkateCloud0: Sprite;
    SkateCloud0_1: Sprite;
    SkateCloud0_2: Sprite;
    SkateCloud0_3: Sprite;
    SkateCloud0_4: Sprite;
    SkateCloud0_5: Sprite;
    SkateCloud0_6: Sprite;
    SkateCloud0_7: Sprite;
    SkateCloud0_8: Sprite;
    SkateCloud0_9: Sprite;
    SkateCloud0_10: Sprite;
    SkateCloud0_11: Sprite;
    SkateCloud0_12: Sprite;
    SkateCloud0_13: Sprite;
    SkateCloud0_14: Sprite;
    SkateCloud0_15: Sprite;
    SkateCloud0_16: Sprite;
    SkateCloud0_17: Sprite;
    SkateCloud0_18: Sprite;
    ShapesSquare32: Sprite;
    ShapesSquare32_1: Sprite;
    ShapesSquare32_2: Sprite;
    ShapesSquare32_3: Sprite;
    DesignerBackground: Sprite;
    ShapesSquare32_4: Sprite;
    ShapesSquare32_5: Sprite;
    ShapesSquare32_6: Sprite;
    ShapesSquare32_7: Sprite;
    ShapesSquare32_8: Sprite;
    SkateGrass0: Sprite;
    SkateTombstoneEnvironment: Sprite;
    SkateTombstoneEnvironment_1: Sprite;
    ShapesSquare32_9: Sprite;
    Block: ReturnType<(typeof r)["Block"]>;
    Slope: ReturnType<(typeof r)["Slope"]>;
    Slope_1: ReturnType<(typeof r)["Slope"]>;
    Slope_2: ReturnType<(typeof r)["Slope"]>;
    Block_1: ReturnType<(typeof r)["Block"]>;
    Slope_3: ReturnType<(typeof r)["Slope"]>;
    Slope_4: ReturnType<(typeof r)["Slope"]>;
    Slope_5: ReturnType<(typeof r)["Slope"]>;
    Slope_6: ReturnType<(typeof r)["Slope"]>;
    Slope_7: ReturnType<(typeof r)["Slope"]>;
    Slope_8: ReturnType<(typeof r)["Slope"]>;
    Slope_9: ReturnType<(typeof r)["Slope"]>;
    Slope_10: ReturnType<(typeof r)["Slope"]>;
    Slope_11: ReturnType<(typeof r)["Slope"]>;
    Slope_12: ReturnType<(typeof r)["Slope"]>;
    Slope_13: ReturnType<(typeof r)["Slope"]>;
    Slope_14: ReturnType<(typeof r)["Slope"]>;
    Slope_15: ReturnType<(typeof r)["Slope"]>;
    Slope_16: ReturnType<(typeof r)["Slope"]>;
    Slope_17: ReturnType<(typeof r)["Slope"]>;
    Slope_18: ReturnType<(typeof r)["Slope"]>;
    Slope_19: ReturnType<(typeof r)["Slope"]>;
    Slope_20: ReturnType<(typeof r)["Slope"]>;
    Slope_21: ReturnType<(typeof r)["Slope"]>;
    Slope_22: ReturnType<(typeof r)["Slope"]>;
    Slope_23: ReturnType<(typeof r)["Slope"]>;
    Slope_24: ReturnType<(typeof r)["Slope"]>;
    Slope_25: ReturnType<(typeof r)["Slope"]>;
    Slope_26: ReturnType<(typeof r)["Slope"]>;
    Slope_27: ReturnType<(typeof r)["Slope"]>;
    Block_2: ReturnType<(typeof r)["Block"]>;
    Slope_28: ReturnType<(typeof r)["Slope"]>;
    SkateGrass0_1: Sprite;
    SkateGrass0_2: Sprite;
    SkateGrass0_3: Sprite;
    SkateTombstoneEnvironment_2: Sprite;
    SkateTombstoneEnvironment_3: Sprite;
    SkateTombstoneEnvironment_4: Sprite;
    SkateLetterR: Sprite;
    SkateLetterI: Sprite;
    SkateLetterP: Sprite;
    SkateTombstoneEnvironment_5: Sprite;
    SkateTombstoneEnvironment_6: Sprite;
    SkateCaution0: Sprite;
    SkateCaution0_1: Sprite;
    SkateCaution0_2: Sprite;
    SkateCaution0_3: Sprite;
    SkateCaution0_4: Sprite;
    SkateCaution0_5: Sprite;
    SkateCaution0_6: Sprite;
    SkateCaution0_7: Sprite;
    SkateCaution0_8: Sprite;
    ShapesSquare32_10: Sprite;
    SkateCaution0_9: Sprite;
    SkateGrass0_4: Sprite;
    SkateGrass0_5: Sprite;
    SkateGrass0_6: Sprite;
    SkateGrass0_7: Sprite;
    SkateGrass0_8: Sprite;
    SkateGrass0_9: Sprite;
    SkateGrass0_10: Sprite;
    SkateGrass0_11: Sprite;
    SkateGrass0_12: Sprite;
    SkateGrass0_13: Sprite;
    SkateGrass0_14: Sprite;
    SkateGrass0_15: Sprite;
    SkateGrass0_16: Sprite;
    SkateGrass0_17: Sprite;
    SkateGrass0_18: Sprite;
    SkateGrass0_19: Sprite;
    SkateGrass0_20: Sprite;
    SkateGrass0_21: Sprite;
    SkateGrass0_22: Sprite;
    SkateGrass0_23: Sprite;
    SkateGrass0_24: Sprite;
    SkateGrass0_25: Sprite;
    SkateGrass0_26: Sprite;
    SkateGrass0_27: Sprite;
    SkateGrass0_28: Sprite;
    SkateGrass0_29: Sprite;
    SkateGrass0_30: Sprite;
    SkateGrass0_31: Sprite;
    SkateGrass0_32: Sprite;
    SkateGrass0_33: Sprite;
    SkateGrass0_34: Sprite;
    SkateGrass0_35: Sprite;
    SkateGrass0_36: Sprite;
    SkateGrass0_37: Sprite;
    SkateGrass0_38: Sprite;
    SkateGrass0_39: Sprite;
    SkateGrass0_40: Sprite;
    SkateGrass0_41: Sprite;
    SkateGrass0_42: Sprite;
    SkateGrass0_43: Sprite;
    SkateGrass0_44: Sprite;
    SkateGrass0_45: Sprite;
    SkateGrass0_46: Sprite;
    SkateGrass0_47: Sprite;
    SkateGrass0_48: Sprite;
    SkateGrass0_49: Sprite;
    SkateGrass0_50: Sprite;
    SkateGrass0_51: Sprite;
    SkateGrass0_52: Sprite;
    SkateGrass0_53: Sprite;
    SkateGrass0_54: Sprite;
    SkateGrass0_55: Sprite;
    SkateGrass0_56: Sprite;
    SkateGrass0_57: Sprite;
    SkateGrass0_58: Sprite;
    SkateGrass0_59: Sprite;
    SkateGrass0_60: Sprite;
    SkateGrass0_61: Sprite;
    SkateGrass0_62: Sprite;
    SkateGrass0_63: Sprite;
    SkateGrass0_64: Sprite;
    SkateGrass0_65: Sprite;
    SkateGrass0_66: Sprite;
    BeginFlightRegion: ReturnType<(typeof r)["Region"]>;
    StartMarker: ReturnType<(typeof r)["Marker"]>;
  };
}
