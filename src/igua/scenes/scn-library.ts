import { Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";

export function scnLibrary() {
    objCart()
        .at(92, 78)
        .show();

    objLottie()
        .at(20, 20)
        .step(self => self.objLottie.pedometer += 0.1)
        .show();
}

const txs = {
    lottie: Tx.Lottie.Push.split({ width: 84 }),
    cart: Tx.Library.Cart.split({ count: 3 }),
};

function objLottie() {
    const [txBody, txLegs0, txLegs1, txScarf, txFace, txArm] = txs.lottie;

    const legsObj = Sprite.from(txLegs0);
    const armObj = Sprite.from(txArm);
    const scarfObj = Sprite.from(txScarf);

    const api = {
        pedometer: 0,
    };

    return container(
        container(
            Sprite.from(txBody),
            legsObj,
            scarfObj,
            Sprite.from(txFace).mixin(mxnBoilPivot),
            armObj,
        )
            .step(self => {
                const p = Math.floor(api.pedometer) % 2 === 0;
                legsObj.texture = p ? txLegs0 : txLegs1;
                self.pivot.y = p ? 1 : 0;
                armObj.pivot.y = self.pivot.y;
                scarfObj.pivot.x = -self.pivot.y;
            }),
    )
        .merge({ objLottie: api });
}

function objCart() {
    const [txCart, txWheel0, txWheel1] = txs.cart;
    const txsCart = txCart.split({ count: 4 });

    return container(
        ...txsCart.map((tx, i) =>
            Sprite.from(tx)
                .coro(function* (self) {
                    while (true) {
                        self.pivot.y = Rng.intc(1);
                        yield sleep(150);
                    }
                })
                .at(i * tx.width, 0)
        ),
        ...[txWheel0, txWheel1].map(tx => Sprite.from(tx).mixin(mxnBoilPivot)),
    );
}
