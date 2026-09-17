import { DEG_TO_RAD, Sprite, Texture } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { cyclic } from "../../../lib/math/number";
import { VectorSimple } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";

function createConfig(
    [body, stroke0, stroke1, face]: Texture[],
    pivot: VectorSimple,
    scale: VectorSimple,
    reverse: boolean,
) {
    return {
        txs: {
            body,
            stroke0,
            stroke1,
            face,
        },
        pivot,
        scale,
        reverse,
    };
}

namespace createConfig {
    export type Type = ReturnType<typeof createConfig>;
}

const configs = {
    down: createConfig(
        Tx.Cole.Down.split({ count: 4 }),
        [49, 165],
        [1, 1],
        false,
    ),
    left: createConfig(
        Tx.Cole.Left.split({ count: 4 }),
        [23, 167],
        [1, 1],
        false,
    ),
    right: createConfig(
        Tx.Cole.Left.split({ count: 4 }),
        [23, 167],
        [-1, 1],
        false,
    ),
    up: createConfig(
        Tx.Cole.Down.split({ count: 4 }),
        [49, 165],
        [1, 1],
        true,
    ),
};

const configsInOrder = [configs.right, configs.down, configs.left, configs.up];

export function objCharacterCole() {
    let facingDegrees = 0;

    const api = {
        get facingDegrees() {
            return facingDegrees;
        },
        set facingDegrees(value) {
            facingDegrees = value;
            const index = Math.floor(cyclic(value + 45, 0, 360) / 90);
            config = configsInOrder[index];
        },
        pedometer: 0,
        strokesCount: 0,
    };

    let bounceY = 0;
    let bounceSpeed = 0;

    let config: createConfig.Type = configs.right;

    const bodyObj = Sprite.from(Texture.EMPTY);
    const strokeObj = Sprite.from(Texture.EMPTY);
    const faceObj = Sprite.from(Texture.EMPTY);

    return container(
        bodyObj,
        strokeObj,
        faceObj,
    )
        .merge({ objCharacterCole: api })
        .autoSorted()
        .step(self => {
            self.pivot.set(config.pivot.x, config.pivot.y - bounceY);
            self.scale.at(config.scale);
            bodyObj.texture = config.txs.body;
            faceObj.texture = config.txs.face;
            faceObj.x = Math.cos(facingDegrees * DEG_TO_RAD) * 12 * self.scale.x;
            strokeObj.texture = api.strokesCount % 2 === 0 ? config.txs.stroke0 : config.txs.stroke1;
            bodyObj.zIndex = config.reverse ? 1 : -1;
            bounceY += bounceSpeed;
            bounceSpeed += 0.2;
            if (bounceY >= 0 && bounceSpeed >= 0) {
                bounceY = 0;
                bounceSpeed = 0;
            }
        })
        .coro(function* () {
            while (true) {
                let previousPedometer = api.pedometer;
                yield () => api.pedometer !== previousPedometer;
                bounceSpeed = -1.3;
                yield () => bounceY === 0 && bounceSpeed === 0;
            }
        });
}
