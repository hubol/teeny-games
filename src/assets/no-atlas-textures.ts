import { Texture, WRAP_MODES } from "pixi.js";
import { TextureProcessing } from "../lib/pixi/texture-processing";
import { Tx } from "./textures";

// For tiled textures,
// I think it is not possible to keep them stored in a texture atlas.
// For this reason, it is necessary to extract textures to be tiled
// to their own textures.

// It bothered me to modify textures in the Tx "namespace".
// So instead, non-atlased textures are added to the NoAtlasTx "namespace".

export let NoAtlasTx: NoAtlasTextures = {} as any;

type NoAtlasTextures = Awaited<ReturnType<typeof createNoAtlasTx>>;

async function createNoAtlasTx(tx: typeof Tx) {
    return {
        Fx: {
            Displacement: await repeat(tx.Fx.Displacement, WRAP_MODES.MIRRORED_REPEAT),
        },
    };
}

function repeat(tx: Texture, wrapMode = WRAP_MODES.REPEAT) {
    return TextureProcessing.extractFromAtlas(tx, { wrapMode });
}

export async function loadNoAtlasTextures(tx: typeof Tx) {
    NoAtlasTx = await createNoAtlasTx(tx);
}
