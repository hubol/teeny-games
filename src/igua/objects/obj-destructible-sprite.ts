import { Texture } from "pixi.js";
import { Integer } from "../../lib/math/number-alias-types";
import { IRectangle } from "../../lib/math/rectangle";
import { TextureProcessing } from "../../lib/pixi/texture-processing";

interface TextureFrame extends IRectangle {
    opaquePixelsCount: Integer;
}

const textureFramesCache: Record<Integer, WeakMap<Texture, ReadonlyArray<TextureFrame>>> = {};

function getTextureFrames(tx: Texture, size: Integer) {
    if (!textureFramesCache[size]) {
        textureFramesCache[size] = new WeakMap();
    }

    const cached = textureFramesCache[size].get(tx);
    if (cached) {
        return cached;
    }

    const frames = new Array<TextureFrame>();

    const tw = tx.width;
    const th = tx.height;

    const data = TextureProcessing.toRgbaArray(tx);

    for (let fx = 0; fx < tw; fx += size) {
        for (let fy = 0; fy < th; fy += size) {
            const w = Math.min(size, tw - fx);
            const h = Math.min(size, th - fy);

            let opaquePixelsCount = 0;

            for (let dx = 0; dx < w; dx++) {
                for (let dy = 0; dy < h; dy++) {
                    const x = fx + dx;
                    const y = fy + dy;

                    const i = y * tw + x;
                    const a = data[i * 4 + 3];
                    if (a >= 1) {
                        opaquePixelsCount += 1;
                    }
                }
            }

            if (opaquePixelsCount > 0) {
                frames.push({ x: fx, y: fy, width: w, height: h, opaquePixelsCount });
            }
        }
    }

    textureFramesCache[size].set(tx, frames);

    return frames;
}

export function objDestructibleSprite(tx: Texture, size: Integer) {
    console.log(getTextureFrames(tx, size));
}
