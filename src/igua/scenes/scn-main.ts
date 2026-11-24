import { AlphaFilter, ColorSource, DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Tx } from "../../assets/textures";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interp, interpc } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { AdjustColor } from "../../lib/pixi/adjust-color";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { renderer } from "../current-pixi-renderer";
import { XbrFilter } from "../filters/xbr-filter";
import { scene } from "../globals";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objCharacterCritter } from "../objects/character/obj-character-critter";

export function scnMain() {
    // scene.style.backgroundTint = 0x808080;

    new Graphics()
        .beginFill(0xffffff)
        .drawRect(0, 0, 2000, 2000)
        .mixin(mxnFxRngTint)
        .show();

    Sprite.from(Tx.Grass)
        .mixin(mxnFxRngTint)
        .mixin(mxnFxBoilDisplacement)
        .show();

    const critterObj = objMutableCritter()
        .at(180, 100)
        .show();

    objGuitarHero(critterObj)
        .at(1150, 0)
        .show();
}

function objGuitarHeroNote() {
    const changeRequest = objCharacterCritter.createChangeRequest();

    const tint = changeRequest.kind === "color"
        ? changeRequest.value
        : AdjustColor.hsv(0, 0, Rng.float(20, 100)).toPixi();

    const api = {
        changeRequest,
    };

    return container(
        new Graphics()
            .beginFill(tint)
            .drawCircle(0, 0, 40),
        // objText
        //     .MediumBoldIrregular(changeRequest.id, { tint: 0x000000, align: "center" })
        //     .anchored(0.5, 0.5),
    )
        .merge({ objGuitarHeroNote: api });
}

function objMutableCritter() {
    let args = objCharacterCritter.createArgs();
    const changeRequests = new Array<objCharacterCritter.ChangeRequest>();

    const api = {
        submitChanges(change: objCharacterCritter.ChangeRequest) {
            changeRequests.push(change);
        },
    };

    return container(
        objCharacterCritter(args).scaled(3, 3),
    )
        .merge({ objMutableCritter: api })
        .mixin(mxnFxBoilDisplacement)
        .coro(function* (self) {
            while (true) {
                yield () => changeRequests.length > 0;
                const previousObj = self.children[0];
                args = objCharacterCritter.applyChanges(args, changeRequests);
                changeRequests.length = 0;

                const alphaFilter = new AlphaFilter(0);

                objCharacterCritter(args)
                    .scaled(3, 3)
                    .filtered(alphaFilter)
                    .show(self);

                yield interp(alphaFilter, "alpha").steps(4).to(1).over(250);

                previousObj.destroy();
            }
        });
}

namespace objMutableCritter {
    export type Type = ReturnType<typeof objMutableCritter>;
}

function mxnFxRngTint(obj: DisplayObject & { tint: ColorSource }) {
    return obj
        .coro(function* (self) {
            function createTint() {
                return AdjustColor.hsv(Rng.float(360), Rng.float(50, 70), Rng.float(80, 90)).toPixi();
            }

            self.tint = createTint();

            while (true) {
                yield interpc(self, "tint").to(createTint()).over(Rng.int(5000, 10000));
            }
        });
}

function objGuitarHero(critterObj: objMutableCritter.Type) {
    return container(
        new Graphics()
            .coro(function* (self) {
                const xPositions = range(5).map(i => i * 140);

                self.lineStyle(6, 0x000000);
                for (const x of xPositions) {
                    self
                        .moveTo(x, 0)
                        .lineTo(x, renderer.height);
                }

                function spawnNotes(count: Integer) {
                    const indices = Rng.shuffle(range(xPositions.length));
                    for (let i = 0; i < Math.min(indices.length, count); i++) {
                        const index = indices[i];
                        const x = xPositions[index];
                        objGuitarHeroNote()
                            .scaled(1.5, 1.5)
                            .at(x, 0)
                            .step(self => {
                                self.y += 5;
                                if (self.y >= 1000) {
                                    critterObj.objMutableCritter.submitChanges(self.objGuitarHeroNote.changeRequest);
                                    self.destroy();
                                }
                            })
                            .show(self);
                    }
                }

                const f = 3;

                while (true) {
                    // 0
                    if (Rng.float() > 0.1) {
                        spawnNotes(Rng.intc(1, 5));
                    }

                    yield sleep(125 * f);

                    // 1
                    if (Rng.float() > 0.9) {
                        spawnNotes(Rng.intc(1, 2));
                    }

                    yield sleep(125 * f);

                    // 2
                    if (Rng.float() > 0.5) {
                        spawnNotes(Rng.intc(1, 2));
                    }

                    yield sleep(125 * f);

                    // 3
                    if (Rng.float() > 0.9) {
                        spawnNotes(Rng.intc(1, 2));
                    }

                    yield sleep(125 * f);

                    // 4
                    if (Rng.float() > 0.1) {
                        spawnNotes(Rng.intc(1, 3));
                    }

                    yield sleep(125 * f);

                    // 5
                    if (Rng.float() > 0.8) {
                        spawnNotes(Rng.intc(1, 2));
                    }

                    yield sleep(125 * f);

                    // 6
                    if (Rng.float() > 0.2) {
                        spawnNotes(Rng.intc(1, 2));
                    }

                    yield sleep(125 * f);

                    // 7
                    if (Rng.float() > 0.7) {
                        spawnNotes(Rng.intc(1, 2));
                    }

                    yield sleep(125 * f);
                }
            }),
    );
}
