// This file is generated

import { OgmoEntityResolvers as r } from "../../../igua/ogmo/entity-resolvers";
import { OgmoFactory } from "../../../igua/ogmo/factory";
import { Tx } from "../../../assets/textures";

const { createEntity: e, createDecal: d, applyLevel, createDecalGroup: dg } = OgmoFactory;

export const Lvl = {
  Kitty: () => {
    applyLevel({ width: 480, height: 270, backgroundTint: 0x462b87 });
    return {
      KittyStars: d(Tx.Kitty.Stars, { x: 240, y: 136, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      KittyUfo: d(Tx.Kitty.Ufo, { x: 376, y: 360, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, tint: 0xffffff }, "BackDecals"),
      PlanetGroup: dg(165, 64, "PlanetGroup", "BackDecals"),
      KittyPlanet: d(Tx.Kitty.Planet, { x: 240, y: 128, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0xffffff }, "BackDecals"),
      WorldGrass0: d(Tx.World.Grass0, { x: 199, y: 64, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      WorldGrass0_1: d(Tx.World.Grass0, { x: 241, y: 77, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      WorldGrass0_2: d(Tx.World.Grass0, { x: 281, y: 65, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      WorldGrass0_3: d(Tx.World.Grass0, { x: 301, y: 85, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      WorldSquiggleLine20px56px: d(Tx.World.SquiggleLine20px56px, { x: 174, y: 130, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x469fdf }, "BackDecals"),
      WorldSquiggleLine20px56px_1: d(Tx.World.SquiggleLine20px56px, { x: 165, y: 143, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x469fdf }, "BackDecals"),
      WorldGrass0_4: d(Tx.World.Grass0, { x: 179, y: 101, scaleX: 1, scaleY: -1, rotation: 90, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      WorldGrass0_5: d(Tx.World.Grass0, { x: 165, y: 163, scaleX: 1, scaleY: -1, rotation: 90, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      WorldGrass0_6: d(Tx.World.Grass0, { x: 327, y: 125, scaleX: -1, scaleY: -1, rotation: 270, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      WorldSpeckles64px32px: d(Tx.World.Speckles64px32px, { x: 262, y: 180, scaleX: 1, scaleY: 1, rotation: 0, originX: 0.5, originY: 0.5, groupName: "PlanetGroup", tint: 0x2c7e64 }, "BackDecals"),
      KittyStartMarker: e(r["Marker"], { x: 246, y: 60, values: { name: "KittyStartMarker", depth: 0 }, tint: 0x00ff00 }, "MarkerEntities"),
    };
  },
};

export namespace LvlType {
  export type Kitty = ReturnType<(typeof Lvl)["Kitty"]>;
}
