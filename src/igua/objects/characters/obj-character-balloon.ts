import { Graphics, Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { holdf } from "../../../lib/game-engine/routines/hold";
import { sleep } from "../../../lib/game-engine/routines/sleep";
import { vnew } from "../../../lib/math/vector-type";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";

export function objCharacterBalloon() {
    const balloonObj = objPuppetBalloon();
    return container(
        balloonObj,
    );
}

function objPuppetBalloon() {
    const [
        txBox,
        txBoxOpened,
        txStringTied,
        txStringSnapBalloon,
        txStringSnapBox,
        txStringSnapped,
        txBalloonShape,
        txBalloonHighlights,
        txBalloonDemo,
        txFace,
        txTinyString,
    ] = Tx.Characters.Balloon.Layers.split({ width: 124 });

    const api = {
        isBoxOpen: false,
        isStringSnapped: false,
        boxOffset: vnew(),
        balloonOffset: vnew(),
    };

    const collisionObjs = [
        new Graphics().beginFill(0xff0000).drawRect(10, 1, 105, 115),
        new Graphics().beginFill(0xff0000).drawRect(57, 113, 12, 127),
        new Graphics().beginFill(0xff0000).drawRect(12, 227, 104, 83),
    ]
        .map(obj => obj.invisible());

    return container(
        container(
            Sprite.from(txBox),
            Sprite.from(txBoxOpened).step(self => self.visible = api.isBoxOpen),
            Sprite.from(txStringSnapBox)
                .invisible()
                .coro(function* (self) {
                    yield () => api.isStringSnapped;
                    self.visible = true;
                    yield () => api.boxOffset.y > 0;
                    let previousBoxFallOffset = api.boxOffset.y;
                    yield holdf(() => {
                        if (api.boxOffset.y === previousBoxFallOffset) {
                            return true;
                        }

                        previousBoxFallOffset = api.boxOffset.y;
                        return false;
                    }, 20);
                    self.destroy();
                }),
            collisionObjs[2],
        )
            .step(self => self.at(api.boxOffset)),
        container(
            Sprite.from(txStringTied)
                .coro(function* (self) {
                    yield () => api.isStringSnapped;
                    self.texture = txStringSnapBalloon;
                    yield sleep(333);
                    self.texture = txStringSnapped;
                }),
            Sprite.from(txBalloonShape)
                .tinted(0xFF8492),
            Sprite.from(txBalloonHighlights)
                .tinted(0xFFCD92),
            Sprite.from(txFace)
                .mixin(mxnFxBoil, "pivot"),
            Sprite.from(txTinyString),
            collisionObjs[0],
            collisionObjs[1],
        )
            .step(self => self.at(api.balloonOffset)),
    )
        .collisionShape(CollisionShape.DisplayObjects, collisionObjs)
        .scaled(2, 2)
        .merge({ objPuppetBalloon: api });
}
