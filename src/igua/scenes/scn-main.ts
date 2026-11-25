import { AlphaFilter, ColorSource, Container, DisplayObject, Graphics, Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Sound } from "../../lib/game-engine/audio/sound";
import { Coro } from "../../lib/game-engine/routines/coro";
import { interp, interpc } from "../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../lib/game-engine/routines/sleep";
import { Integer } from "../../lib/math/number-alias-types";
import { PseudoRng, Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { AdjustColor } from "../../lib/pixi/adjust-color";
import { container } from "../../lib/pixi/container";
import { range } from "../../lib/range";
import { Force } from "../../lib/types/force";
import { IguaAudio } from "../core/igua-audio";
import { renderer } from "../current-pixi-renderer";
import { XbrFilter } from "../filters/xbr-filter";
import { scene } from "../globals";
import { GenerativeMusicUtils } from "../lib/generative-music-utils";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objCharacterCritter } from "../objects/character/obj-character-critter";

export function scnMain() {
    // scene.style.backgroundTint = 0x808080;

    IguaAudio.sfxDelayFeedback = 0.5;

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

    const position = vnew();
    let parentObj = Force<Container>();

    return container(
        new Graphics()
            .beginFill(tint)
            .drawCircle(0, 0, 50),
    )
        // Still so stupid that pixi kills position on destroy
        .step(self => {
            parentObj = self.parent;
            position.at(self);
        })
        .on("destroyed", () => objGuitarHeroNoteBurst().at(position).tinted(tint).show(parentObj))
        .merge({ objGuitarHeroNote: api });
}

function objGuitarHeroNoteBurst() {
    const state = {
        width: 20,
    };

    return new Graphics()
        .coro(function* (self) {
            yield interp(state, "width").to(0).over(125);
            self.destroy();
        })
        .step(self => {
            self
                .clear()
                .lineStyle(state.width, 0xffffff, 1, 0)
                .drawCircle(0, 0, 65 - state.width);
        });
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
            .mixin(mxnFxBoilDisplacement, { rate: 0.133, scale: 2 })
            .coro(function* (self) {
                const xPositions = range(5).map(i => i * 140);

                self.lineStyle(6, 0x000000);
                for (const x of xPositions) {
                    self
                        .moveTo(x, 0)
                        .lineTo(x, renderer.height);
                }

                let rootIndex = 0;

                function spawnNotes(count: Integer) {
                    const indices = Rng.shuffle(range(xPositions.length));
                    for (let i = 0; i < Math.min(indices.length, count); i++) {
                        const index = indices[i];
                        const x = xPositions[index];
                        objGuitarHeroNote()
                            .at(x, 0)
                            .step(self => {
                                self.y += 5;
                                if (self.y >= 920) {
                                    const sfx = sfxByIds[self.objGuitarHeroNote.changeRequest.id];
                                    sfx.rate(GenerativeMusicUtils.getRate(rootIndex, "blues")).play();
                                    critterObj.objMutableCritter.submitChanges(self.objGuitarHeroNote.changeRequest);
                                    self.destroy();
                                }
                            })
                            .show(self.parent);
                    }
                }

                const f = 3;

                while (true) {
                    if (Rng.float() < 0.25) {
                        rootIndex += Rng.intc(-3, 3);
                    }

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

type ChangeId = objCharacterCritter.ChangeRequest["id"];

const sfxByIds = function () {
    const dummy = objCharacterCritter.createArgs();
    const ids = [...Object.keys(dummy.colors), ...Object.keys(dummy.partTxs)] as Array<ChangeId>;
    const prng = new PseudoRng(9999.69);
    prng.bool();
    const sampleSfxs = Object.values(Sfx.Samples);
    prng.shuffle(sampleSfxs);
    return Object.fromEntries(ids.map(id => [id, sampleSfxs.pop()])) as Record<ChangeId, Sound>;
}();
