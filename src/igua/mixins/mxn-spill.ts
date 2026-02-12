import { Container, IRendererRenderOptions, Matrix, RenderTexture, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { sleepf } from "../../lib/game-engine/routines/sleep";
import { vnew } from "../../lib/math/vector-type";
import { renderer } from "../current-pixi-renderer";
import { scene } from "../globals";

export function mxnSpill(obj: Container) {
    const tx = Tx.Ending;

    const matrix = new Matrix();
    const renderTx = RenderTexture.create({ width: renderer.width, height: renderer.height });
    const renderOptions: IRendererRenderOptions = { renderTexture: renderTx, transform: matrix, clear: false };

    obj.autoSorted();
    const wtfObj = Sprite.from(tx).zIndexed(-1).show(obj);
    Sprite.from(renderTx).tinted(scene.style.backgroundTint).zIndexed(-2).show(obj);

    return obj
        .on("destroyed", () => renderTx.destroy())
        .coro(function* () {
            const units = [
                vnew(1, 0),
                vnew(1, 1),
                vnew(0, 1),
                vnew(-1, 1),
                vnew(-1, 0),
                vnew(-1, -1),
                vnew(0, -1),
                vnew(1, -1),
            ];

            for (let i = 0; i < 500; i += 2) {
                for (const unit of units) {
                    matrix.tx = i * unit.x;
                    matrix.ty = i * unit.y;
                    renderer.render(wtfObj, renderOptions);
                }
                yield sleepf(1);
            }
        });
}
