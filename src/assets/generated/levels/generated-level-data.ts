// This file is generated

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
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
  export type Placeholder = ReturnType<(typeof Lvl)["Placeholder"]>;
}
