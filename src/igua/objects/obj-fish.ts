import { BLEND_MODES, DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";

const prng = new PseudoRng();

const txs = {
    eyes: {
        near: Tx.Fish.EyeNear.split({ count: 3 }),
        far: Tx.Fish.EyeFar.split({ count: 3 }),
    },
    fins: {
        dorsal: Tx.Fish.DorsalFin.split({ count: 3 }),
        rest: Tx.Fish.Fins.split({ count: 3 }),
        tail: Tx.Fish.Tail.split({ count: 3 }),
    },
    mouth: Tx.Fish.Mouth.split({ count: 3 }),
    body: [Tx.Fish.Body],
    shadow: Tx.Fish.Shadow,
};

export function objFish() {
    prng.seed = Rng.intc(999999999999);
    prng.bool();

    const eyesIndex = Rng.int(txs.eyes.far.length);
    const facePosition = vnew(0, Rng.int(-8, 0));

    return container(
        Sprite.from(txs.shadow)
            .coro(function* (self) {
                self.blendMode = BLEND_MODES.MULTIPLY;
                self.alpha = 0.3;
            })
            .mixin(mxnFxBoilDisplacement, { rate: 0.2, scale: 10 }),
        Sprite.from(txs.eyes.far[eyesIndex])
            .at(148, 84)
            .add(facePosition)
            .mixin(mxnFxBoilFace),
        Sprite.from(prng.item(txs.body))
            .at(65, 77),
        Sprite.from(prng.item(txs.fins.dorsal))
            .at(78, 9),
        Sprite.from(prng.item(txs.fins.rest))
            .at(69, 100),
        Sprite.from(prng.item(txs.fins.tail))
            .at(6, 18),
        Sprite.from(prng.item(txs.mouth))
            .at(148, 84)
            .add(facePosition)
            .mixin(mxnFxBoilFace),
        Sprite.from(txs.eyes.near[eyesIndex])
            .at(148, 84)
            .add(facePosition)
            .mixin(mxnFxBoilFace),
    );
}

function mxnFxBoilFace(obj: DisplayObject) {
    const seed = Rng.float(Math.PI * 2);
    return obj
        .step(() => obj.pivot.y = Math.sin(seed + scene.ticker.ticks / 30) * 2);
}
