// This file is generated

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
  DressUp: () => {
    applyLevel({ width: 500, height: 280, backgroundTint: 0x800045 });
    return {
      TextMarker0: e(r["Marker"], { x: 80, y: 56, values: { name: "TextMarker0", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker1: e(r["Marker"], { x: 72, y: 128, values: { name: "TextMarker1", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker2: e(r["Marker"], { x: 96, y: 184, values: { name: "TextMarker2", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker3: e(r["Marker"], { x: 72, y: 240, values: { name: "TextMarker3", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker4: e(r["Marker"], { x: 336, y: 40, values: { name: "TextMarker4", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker5: e(r["Marker"], { x: 448, y: 72, values: { name: "TextMarker5", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker6: e(r["Marker"], { x: 368, y: 120, values: { name: "TextMarker6", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker7: e(r["Marker"], { x: 432, y: 160, values: { name: "TextMarker7", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker8: e(r["Marker"], { x: 376, y: 216, values: { name: "TextMarker8", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      TextMarker9: e(r["Marker"], { x: 432, y: 256, values: { name: "TextMarker9", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
      FuckaMarker: e(r["Marker"], { x: 168, y: 24, values: { name: "FuckaMarker", depth: 0 }, tint: 0x2400ff }, "MarkerEntities"),
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
  Start: () => {
    applyLevel({ width: 500, height: 280, backgroundTint: 0x5537a8 });
    return {
      TextGroup: dg(143, 49, "TextGroup", "BackDecals"),
      BootLets: d(Tx.Boot.Lets, { x: 143, y: 50, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "TextGroup", tint: 0xffffff }, "BackDecals"),
      BootHear: d(Tx.Boot.Hear, { x: 340, y: 49, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "TextGroup", tint: 0xffffff }, "BackDecals"),
      BootIt: d(Tx.Boot.It, { x: 157, y: 133, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "TextGroup", tint: 0xffffff }, "BackDecals"),
      BootFor: d(Tx.Boot.For, { x: 307, y: 135, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "TextGroup", tint: 0xffffff }, "BackDecals"),
      BootThe: d(Tx.Boot.The, { x: 145, y: 221, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "TextGroup", tint: 0xffffff }, "BackDecals"),
      BootBoys: d(Tx.Boot.Boys, { x: 332, y: 230, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "TextGroup", tint: 0xffffff }, "BackDecals"),
    };
  },
};

export namespace LvlType {
  export type DressUp = ReturnType<(typeof Lvl)["DressUp"]>;
  export type Placeholder = ReturnType<(typeof Lvl)["Placeholder"]>;
  export type Start = ReturnType<(typeof Lvl)["Start"]>;
}
