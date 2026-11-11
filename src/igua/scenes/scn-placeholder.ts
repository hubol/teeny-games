import { BlurFilter, Graphics, Sprite } from "pixi.js";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { UserMediaTexture } from "../../lib/game-engine/user-media-texture";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { vequals } from "../../lib/math/vector";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";
import { objCellHuman } from "../objects/cells/obj-cell-human";
import { objCellVirus } from "../objects/cells/obj-cell-virus";

export function scnPlaceholder() {
    const margin = 20;
    scene.style.backgroundTint = 0x260080;

    const userObj = container()
        .zIndexed(999)
        .show();

    const maskObj = new Graphics()
        .beginFill(0xffffff)
        .drawCircle(renderer.width / 2, renderer.height / 2, renderer.height / 2 - margin)
        .show();

    UserMediaTexture
        .load()
        .then(tx => {
            const scale = (renderer.height - (margin * 2)) / tx.height;
            Sprite.from(tx)
                .anchored(0.5, 0.5)
                .at(renderer.width / 2, renderer.height / 2)
                .scaled(-scale, scale)
                .masked(maskObj)
                .show(userObj);
        });

    const blurFilter = new BlurFilter(10, 3, 0.5);
    blurFilter.repeatEdgePixels = true;

    objCellsLayer(24)
        .filtered(blurFilter)
        .pivoted(renderer.width / 2, renderer.height / 2)
        .at(renderer.width / 2, renderer.height / 2)
        .scaled(1.3, 1.3)
        .show()
        .alpha = 0.45;

    objCellsLayer(32)
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
