import { Sprite, Texture } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { container } from "../../lib/pixi/container";
import { scene, sceneStack } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { scnHotDog } from "./scn-hot-dog";

const [
    txBody,
    txFace,
    txMouth,
    txMouthAgape,
    txSoda,
    txLets,
    txDress,
    txMy,
    txDog,
] = Tx.DressMy.Scene.split({ width: 436 });

export function scnDressMy() {
    const mouthObj = Sprite.from(txMouth);

    const sceneObj = container(
        container(
            Sprite.from(txBody),
            container(
                Sprite.from(txFace),
                mouthObj,
            )
                .mixin(mxnBoilPivot),
        )
            .mixin(mxnBoilPivot)
            .at(0, 300)
            .coro(function* (self) {
                yield interpvr(self).factor(factor.sine).to(0, 0).over(400);
            }),
    )
        .at(50, 13)
        .show();

    function* say(tx: Texture, sfx: Sound) {
        const soundInstance = sfx.playInstance();
        Sprite.from(tx).show(sceneObj);
        mouthObj.texture = txMouthAgape;
        yield () => soundInstance.isEnded;
        mouthObj.texture = txMouth;
        yield sleep(333);
    }

    scene.stage
        .coro(function* () {
            yield* say(txSoda, Sfx.Dialog.DressMy.Soda);
            yield* say(txLets, Sfx.Dialog.DressMy.Lets);
            yield* say(txDress, Sfx.Dialog.DressMy.Dress);
            yield* say(txMy, Sfx.Dialog.DressMy.My);
            yield* say(txDog, Sfx.Dialog.DressMy.Dog);
            yield sleep(500);
            sceneStack.replace(scnHotDog, { useGameplay: false });
        });
}
