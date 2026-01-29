// This file is generated.

import { OgmoFactory } from "../../../igua/ogmo/factory";

export namespace OgmoEntities {
  export type Block = OgmoFactory.EntityBase<{ name: string; visible: boolean }>;
  export type Slope = OgmoFactory.EntityBase<{ name: string; visible: boolean }>;
  export type Marker = OgmoFactory.EntityBase<{ name: string; depth: number }>;
  export type Region = OgmoFactory.EntityBase<{ name: string; depth: number }>;
}

export interface OgmoEntityResolverBase {
  Block: (entity: OgmoEntities.Block) => unknown;
  Slope: (entity: OgmoEntities.Slope) => unknown;
  Marker: (entity: OgmoEntities.Marker) => unknown;
  Region: (entity: OgmoEntities.Region) => unknown;
}
