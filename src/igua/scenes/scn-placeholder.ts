import { BlurFilter, Graphics, Sprite } from "pixi.js";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { UserMediaTexture } from "../../lib/game-engine/user-media-texture";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vequals } from "../../lib/math/vector";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { objCellHuman } from "../objects/cells/obj-cell-human";
import { objCellVirus } from "../objects/cells/obj-cell-virus";

const MicroscopeZIndex = {
    blurryCells: 0,
    focusedCells: 100,
    mediaOpaque: 50,
    mediaTransparent: 150,
};

export function scnPlaceholder() {
    const centerPosition = vnew(renderer.width / 2, renderer.height / 2);
    scene.style.backgroundTint = 0x260080;

    const cameraMaskObj = new Graphics()
        .at(centerPosition)
        .show();

    UserMediaTexture
        .load()
        .then(tx => {
            const shape = "round_rect" as "circle" | "round_rect";
            const margin = shape === "circle" ? 20 : 90;
            const height = renderer.height - (margin * 2);
            const scale = height / tx.height;

            const transparentMediaObjsCount = 20;

            const [opaqueMediaObj, ...transparentMediaObjs] = range(1 + transparentMediaObjsCount)
                .map(() =>
                    Sprite.from(tx)
                        .at(centerPosition)
                        .anchored(0.5, 0.5)
                        .scaled(scale, scale)
                        .masked(cameraMaskObj)
                );

            opaqueMediaObj.zIndexed(MicroscopeZIndex.mediaOpaque).show();

            const transparentMediaMaskObjs = range(transparentMediaObjsCount)
                .map(i => {
                    const scale = 1 - (i / (transparentMediaObjsCount * 8));
                    const maskObj = new Graphics().at(centerPosition).scaled(scale, scale).zIndexed(99999).show();
                    transparentMediaObjs[i]
                        .zIndexed(MicroscopeZIndex.mediaTransparent)
                        .masked(maskObj)
                        .show()
                        .alpha = 0.1;
                    return maskObj;
                });

            for (const obj of [cameraMaskObj, ...transparentMediaMaskObjs]) {
                obj.beginFill(0xffffff);

                if (shape === "circle") {
                    obj.drawCircle(0, 0, height / 2);
                }
                else {
                    const width = scale * tx.width;
                    obj.drawRoundedRect(-width / 2, -height / 2, width, height, 150);
                }
            }
        });

    const blurFilter = new BlurFilter(10, 3, 0.5);
    blurFilter.repeatEdgePixels = true;

    objCellsLayer(24)
        .filtered(blurFilter)
        .pivoted(renderer.width / 2, renderer.height / 2)
        .at(renderer.width / 2, renderer.height / 2)
        .scaled(1.3, 1.3)
        .show()
        .zIndexed(MicroscopeZIndex.blurryCells)
        .alpha = 0.45;

    objCellsLayer(32)
        .zIndexed(MicroscopeZIndex.focusedCells)
        .show();
}

function objCellsLayer(detail: Integer) {
    return container()
        .coro(function* (self) {
            while (true) {
                const [startPosition, targetPosition] = getOutOfBoundsPositions();
                if (Rng.float() > 0.25) {
                    const cellObj = objCellHuman(detail)
                        .at(startPosition)
                        .coro(function* (self) {
                            yield () => vequals(self, targetPosition);
                            self.destroy();
                        })
                        .show(self);
                    cellObj.objCellHuman.targetPosition.at(targetPosition);
                }
                else {
                    objCellVirus()
                        .step(self => {
                            self.moveTowards(targetPosition, 1);
                            if (vequals(self, targetPosition)) {
                                self.destroy();
                            }
                        })
                        .at(startPosition)
                        .show(self);
                }

                yield sleep(Rng.intc(300, 700));
            }
        });
}

function getOutOfBoundsPositions() {
    return Rng.shuffle([
        vnew(renderer.width / 2 + Rng.intp() * (renderer.width / 2 + 100), Rng.int(renderer.height)),
        vnew(Rng.int(renderer.width), renderer.height / 2 + Rng.intp() * (renderer.height / 2 + 100)),
    ]);
}
