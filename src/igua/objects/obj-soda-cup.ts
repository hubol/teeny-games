import { Sprite } from "pixi.js";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { blendColor } from "../../lib/color/blend-color";
import { holdf } from "../../lib/game-engine/routines/hold";
import { interp } from "../../lib/game-engine/routines/interp";
import { sleepf } from "../../lib/game-engine/routines/sleep";
import { nlerp } from "../../lib/math/number";
import { RgbInt } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { MapRgbFilter } from "../../lib/pixi/filters/map-rgb-filter";
import { SpriteAlphaMaskFilter } from "../../lib/pixi/filters/sprite-alpha-mask-filter";
import { scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objIndexedSprite } from "./utils/obj-indexed-sprite";

const [
    txInside,
    txLipBack,
    txSodaSurface,
    txIce,
    txOutside,
    txHand,
    txSpill0,
    txSpill1,
    txSpill2,
    txSpillLoop0,
    txSpillLoop1,
    txSpillLoop2,
    txSpillEnd1,
    txSpillEnd0,
    txSpillEnd2,
    txSpillEnd3,
    txSpillEnd4,
    txMask,
] = Tx.Soda.HeldCup.split({ width: 116 });

export function objSodaCup() {
    let sodaLevel = 0;
    let sodaTint = 0;
    let iceLevel = 0;

    const maskObj = Sprite.from(txMask);
    const maskFilter = new SpriteAlphaMaskFilter(maskObj);
    const tintFilter = new MapRgbFilter();

    const api = {
        fillWith(fill: objSodaCup.Fill) {
            if (fill.kind === "soda") {
                if (sodaLevel < 1) {
                    sodaTint = fill.tint;
                }
                else {
                    sodaTint = blendColor(sodaTint, fill.tint, 6 / sodaLevel);
                }

                sodaLevel = Math.min(sodaLevel + 1, 110);
                tintFilter.red = sodaTint;
            }
            else {
                iceLevel = Math.min(iceLevel + 1, 100);
            }
        },
        splash() {
            objSodaSplash().at(Rng.int(20, 82), Rng.int(50, 59)).show(sodaSurfaceObj);
        },
        maskFilter,
    };

    const sodaSurfaceObj = container(
        Sprite.from(txSodaSurface)
            .mixin(mxnBoilPivot),
    );

    return container(
        Sprite.from(txInside),
        Sprite.from(txLipBack),
        sodaSurfaceObj
            .step(self => {
                self.y = nlerp(80, 0, sodaLevel / 100);
            })
            .coro(function* (self) {
                self.filters = [tintFilter, maskFilter];
            }),
        Sprite.from(txIce)
            .step(self => self.y = nlerp(80, 0, iceLevel / 100))
            .filtered(maskFilter)
            .mixin(mxnBoilPivot),
        Sprite.from(txOutside),
        container()
            .coro(function* (self) {
                while (true) {
                    yield () => sodaLevel >= 108;
                    const spillObj = objSodaSpill().show(self);
                    const drainObj = container()
                        .step(() => {
                            if (scene.ticker.ticks % 3 === 0 && sodaLevel > 100) {
                                sodaLevel--;
                            }
                        })
                        .show(self);
                    yield holdf(() => sodaLevel <= 100, 4);
                    drainObj.destroy();
                    spillObj.objSodaSpill.isEnding = true;
                }
            })
            .filtered(tintFilter),
        Sprite.from(txHand),
        maskObj,
    )
        .merge({ objSodaCup: api })
        .pivoted(51, 123);
}

function objSodaSpill() {
    const api = {
        isEnding: false,
    };

    const txsStart = [
        txSpill0,
        txSpill1,
        txSpill2,
    ];

    const txsLoop = [
        txSpillLoop0,
        txSpillLoop1,
        txSpillLoop2,
    ];

    const txsEnd = [
        txSpillEnd0,
        txSpillEnd1,
        txSpillEnd2,
        txSpillEnd3,
        txSpillEnd4,
    ];

    return Sprite.from(txSpill0)
        .merge({ objSodaSpill: api })
        .coro(function* (self) {
            for (const tx of txsStart) {
                self.texture = tx;
                yield sleepf(Rng.intc(3, 5));
            }

            while (true) {
                for (const tx of txsLoop) {
                    self.texture = tx;
                    yield sleepf(Rng.intc(3, 5));

                    if (api.isEnding) {
                        self.coro(function* () {
                            for (const tx of txsEnd) {
                                self.texture = tx;
                                yield sleepf(Rng.intc(3, 5));
                            }
                            self.destroy();
                        });
                        return;
                    }
                }
            }
        });
}

const txsSplash = Tx.Soda.Splash.split({ width: 56 });

function objSodaSplash() {
    return objIndexedSprite(txsSplash)
        .anchored(0.5, 1)
        .scaled(Rng.intp(), 1)
        .coro(function* (self) {
            self.play(Sfx.Soda.Splash.rate(0.9, 1.1));
            yield interp(self, "textureIndex").to(self.textures.length).over(Rng.int(450, 700));
            self.destroy();
        });
}

export namespace objSodaCup {
    export type Fill = { kind: "ice" } | { kind: "soda"; tint: RgbInt };
}
