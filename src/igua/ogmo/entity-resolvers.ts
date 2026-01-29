import { Graphics } from "pixi.js";
import { OgmoEntityResolverBase } from "../../assets/generated/levels/generated-ogmo-project-data";
import { objSolidBlock, objSolidSlope } from "../objects/obj-terrain";
import { objMarker } from "../objects/utils/obj-marker";

export const OgmoEntityResolvers = {
    "Block": objSolidBlock,
    "Slope": objSolidSlope,
    "Marker": objMarker,
    "Region": () => new Graphics().beginFill(0x00ff00).drawRect(0, 0, 1, 1).invisible(),
} satisfies OgmoEntityResolverBase;
