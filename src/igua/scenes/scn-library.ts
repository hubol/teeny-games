import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { renderer } from "../current-pixi-renderer";
import { mxnArrowKeys } from "../mixins/mxn-arrow-keys";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnClampPosition } from "../mixins/mxn-clamp-position";
import { mxnCollectible } from "../mixins/mxn-collectible";
import { mxnMoved } from "../mixins/mxn-moved";
import { objLibraryBook } from "../objects/obj-library-book";
import { objLibrarySpawn } from "../objects/obj-library-spawn";

export function scnLibrary() {
    Sprite.from(Tx.Library.BackgroundBarnes)
        .mixin(mxnBoilDisplacement, { rate: 0.0125, scale: 2 })
        .show();

    {
        function getSpawnPosition() {
            return vnew(Rng.intc(20, renderer.width - 20), Rng.intc(20, renderer.height - 20));
        }

        container()
            .coro(function* (self) {
                while (true) {
                    if (Rng.float() < 0.25) {
                        objLibrarySpawn(
                            "disappears_fast",
                            objLibraryBook().mixin(mxnCollectible),
                        )
                            .at(getSpawnPosition())
                            .show(self);
                    }

                    objLibrarySpawn(
                        "default",
                        objLibraryBook().mixin(mxnCollectible),
                    )
                        .at(getSpawnPosition())
                        .show(self);

                    yield () => self.children.length === 0;
                }
            })
            .show();
    }

    const cartObj = objCart().at(75, 56);
    const lottieObj = objLottie()
        .at(-100, 0)
        .mixin(mxnMoved)
        .handles("moved", (self) => self.objLottie.pedometer += 0.1);

    const lottieAndCartObj = container(cartObj, lottieObj)
        .mixin(mxnClampPosition, { xmin: -70, xmax: 350, ymin: -40, ymax: 190 })
        .coro(function* () {
            yield interpvr(lottieObj).to(0, 0).over(1000);
            yield interp(lottieObj.objLottie, "armExtendedUnit").to(1).over(300);
            lottieAndCartObj.mixin(
                mxnArrowKeys,
                {
                    acceleration: 0.2,
                    deceleration: 0.1,
                    max: 3,
                },
            );
        })
        .at(20, 20)
        .zIndexed(999)
        .show();
}

const txs = {
    lottie: Tx.Lottie.Push.split({ width: 84 }),
    cart: Tx.Library.Cart.split({ count: 3 }),
};

function objLottie() {
    const [txBody, txLegs0, txLegs1, txScarf, txFace, txArm] = txs.lottie;

    const legsObj = Sprite.from(txLegs0);
    const armMaskObj = new Graphics().beginFill(0xff0000).drawRect(36, 0, 51, 89);
    const armObj = Sprite.from(txArm).masked(armMaskObj);
    const scarfObj = Sprite.from(txScarf);

    const api = {
        pedometer: 0,
        armExtendedUnit: 0,
    };

    return container(
        container(
            Sprite.from(txBody),
            legsObj,
            scarfObj,
            Sprite.from(txFace).mixin(mxnBoilPivot),
            armObj,
            armMaskObj,
        )
            .step(self => {
                const p = Math.floor(api.pedometer) % 2 === 0;
                legsObj.texture = p ? txLegs0 : txLegs1;
                self.pivot.y = p ? 1 : 0;
                armObj.pivot.y = self.pivot.y;
                scarfObj.pivot.x = -self.pivot.y;
                armObj.position.at(-30, 24).scale(1 - api.armExtendedUnit).vround();
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
