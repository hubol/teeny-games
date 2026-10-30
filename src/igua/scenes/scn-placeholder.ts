import { Sprite } from "pixi.js";
import { UserMediaTexture } from "../../lib/game-engine/user-media-texture";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { objOverlayFov } from "../objects/overlay/obj-overlay-fov";

export function scnPlaceholder() {
    const userObj = container().show();

    UserMediaTexture
        .load()
        .then(tx => {
            const scale = renderer.height / tx.height;
            Sprite.from(tx)
                .anchored(0.5, 0.5)
                .at(renderer.width / 2, renderer.height / 2)
                .scaled(-scale, scale)
                .show(userObj);
        });

    objOverlayFov()
        .at(renderer.width / 2, renderer.height / 2)
        .scaled(-1080 / 1024, 1080 / 1024)
        .show()
        .objOverlayFov
        .tint = 0x260080;
}
