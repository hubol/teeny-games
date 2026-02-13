import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Mzk } from "../../assets/music";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { factor, interp, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Integer } from "../../lib/math/number-alias-types";
import { Rng } from "../../lib/math/rng";
import { Vector, VectorSimple, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Jukebox } from "../core/igua-audio";
import { Mouse, scene, sceneStack } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { mxnSpill } from "../mixins/mxn-spill";
import { objCursor } from "../objects/obj-cursor";
import { createFuckaConfig, objFucka } from "../objects/obj-fucka";
import { ObjNude, objNude } from "../objects/obj-nude";
import { playDressUp } from "./scn-dress-up";

let clearsCount = 0;

const staticNudes = (function () {
    function create(
        tx: Texture,
        endPosition: VectorSimple,
        startOffset: VectorSimple,
        underwearTexturesCount: Integer,
    ) {
        return {
            txs: tx.split({ count: 4 + underwearTexturesCount }),
            endPosition,
            startOffset,
        };
    }

    return {
        fag: create(Tx.Nudes.DemoFag, [10, 40], [-200, 0], 0),
        badlyDressed: create(Tx.Nudes.BadlyDressed, [300, 10], [200, 0], 2),
        tall: create(Tx.Nudes.Tall, [340, -20], [0, -280], 0),
        long: create(Tx.Nudes.Long, [0, 93], [-650, 0], 1),
        pinkerton: create(Tx.Nudes.Pinkerton, [10, 15], [-200, 0], 0),
        slut: create(Tx.Nudes.Slut, [70, 50], [420, 0], 0),
    };
})();

type StaticNudeId = keyof typeof staticNudes;

function objStaticNude(id: StaticNudeId) {
    const { txs, endPosition, startOffset } = staticNudes[id];
    const [bodyTx, faceTx, genitalCoveringTx, clothesTx, ...underwearTxs] = txs;

    return objNude({
        bodyObj: container(
            Sprite.from(bodyTx),
            Sprite.from(faceTx).mixin(mxnBoilPivot),
        ),
        genitalCoveringTx,
        clothesTxs: [clothesTx],
        underwearTxs,
    })
        .at(endPosition)
        .pivoted(-startOffset.x, -startOffset.y);
}

const consts = {
    dark: 0x8c72aa,
};

function* waitUntilBeat() {
    const beatLength = (60 / 90) / 2;

    if (Jukebox.isPlaying(Mzk.Cupid)) {
        yield sleep(250);
        const previous = Jukebox.getEstimatedPlayheadPosition(Mzk.Cupid);
        const next = Math.ceil(previous / beatLength) * beatLength;
        yield () => {
            const value = Jukebox.getEstimatedPlayheadPosition(Mzk.Cupid);
            return value < previous || value >= next;
        };

        return true;
    }

    return false;
}

export function scnMain() {
    Jukebox.warm(Mzk.Cupid);
    Jukebox.applyGainRamp(Mzk.Cupid, 0, 0);

    const lvl = Lvl.Start();

    Sprite.from(Tx.UseMouse)
        .step((self) => {
            if (!self.visible && Mouse.isPositionKnown) {
                self.destroy();
            }
        })
        .invisible()
        .coro(function* (self) {
            yield sleep(2000);
            self.visible = true;
            self.alpha = 0;
            yield interp(self, "alpha").steps(3).to(1).over(750);
            yield () => Mouse.isPositionKnown;
            yield interp(self, "alpha").steps(3).to(0).over(250);
            self.destroy();
        })
        .show();

    scene.stage
        .coro(function* () {
            lvl.TextGroup.children.forEach(obj => obj.visible = false);

            yield sleep(250);

            const surpriseDressUp = clearsCount >= 2;

            let fuckaConfig = createFuckaConfig();

            if (!surpriseDressUp) {
                const sfxs = [
                    Sfx.Dialog.Lets,
                    Sfx.Dialog.Hear,
                    Sfx.Dialog.It,
                    Sfx.Dialog.For,
                    Sfx.Dialog.The,
                    Sfx.Dialog.Boys,
                ];

                for (let i = 0; i < sfxs.length; i++) {
                    const obj = lvl.TextGroup.children[i];
                    obj.mixin(mxnBoilPivot);
                    obj.step(() => obj.scale.set(approachLinear(obj.scale.x, 1, 0.08)));
                    obj.visible = true;
                    obj.scale.set(2);
                    yield () => heartObj.collides(obj) && Mouse.isDown;
                    sfxs[i].play();
                    obj.tint = consts.dark;
                    yield () => !Mouse.isDown;
                    obj.tint = 0xffffff;
                }

                lvl.TextGroup.destroy();

                if (!(yield* waitUntilBeat())) {
                    yield sleep(500);
                }

                Jukebox.applyGainRamp(Mzk.Cupid, 1, 50);
                Jukebox.play(Mzk.Cupid);
            }
            else {
                Sfx.Advance.play();
                const surpriseDressUpObj = Sprite.from(Tx.SurpriseDressUp).at(0, -280).show();
                yield interpvr(surpriseDressUpObj).factor(factor.sine).to(0, 0).over(1000);
                Sfx.Dialog.PickACuteOutfit.play();
                yield sleep(1150);
                yield* waitUntilBeat();

                Jukebox.applyGainRamp(Mzk.Cupid, 1, 50);
                Jukebox.play(Mzk.Cupid);

                fuckaConfig = yield* playDressUp();
                Sfx.Dialog.Yeah.play();
                surpriseDressUpObj.destroy();
            }

            const fuckaObj = objFucka(fuckaConfig)
                .at(150, 0)
                .show();

            yield* coroProbablyNude(fuckaObj);

            Sfx.Advance.play();

            const leftNudeObj = objStaticNude(Rng.choose("fag", "pinkerton")).show();

            const rightNudeObj = objStaticNude(Rng.choose("badlyDressed", "tall")).show();

            yield* Coro.all([
                interpvr(leftNudeObj.pivot).to(0, 0).over(1000),
                interpvr(rightNudeObj.pivot).to(0, 0).over(1000),
            ]);

            yield* Coro.all([
                coroProbablyNude(leftNudeObj),
                coroProbablyNude(rightNudeObj),
            ]);

            Sfx.Advance.play();

            const finalNudeObj = objStaticNude(Rng.choose("slut", "long")).show();

            yield interpvr(finalNudeObj.pivot).to(0, 0).over(1000);

            yield* coroProbablyNude(finalNudeObj);

            yield* waitUntilBeat();
            const youAreGaySfx = Sfx.Dialog.YouAreGay.playInstance();
            Jukebox.applyGainRamp(Mzk.Cupid, 0, 50);

            const endingObj = Sprite.from(Tx.Ending)
                .mixin(mxnBoilPivot)
                .show();

            yield () => youAreGaySfx.estimatedPlayheadPosition >= 1.237;

            endingObj.mixin(mxnSpill);

            yield sleep(2000);

            clearsCount++;
            sceneStack.replace(scnMain, { useGameplay: false });
        });

    const impactSfxs = [
        Sfx.Impact.Undress0,
        Sfx.Impact.Undress1,
        Sfx.Impact.Undress2,
        Sfx.Impact.Undress3,
        Sfx.Impact.Undress4,
    ];

    const heartObj = objCursor()
        .coro(function* (self) {
            function tryDestroyCollidedChildren(container: Container) {
                const collidedObjs = self.collidesAll(container.children);
                for (const obj of collidedObjs) {
                    if (!obj.is(mxnDestroyed)) {
                        (obj as DisplayObject).mixin(
                            mxnDestroyed,
                            self.objCursor.inferredSpeed.vcpy().normalize().scale(2),
                        )
                            .play(Rng.item(impactSfxs).rate(Rng.float(0.5, 2)));
                    }
                }
            }

            self
                .step(() => {
                    if (self.scale.x > 1 || self.objCursor.inferredSpeed.vlength > 2) {
                        for (const nudeObj of Instances(objNude)) {
                            if (!nudeObj.objNude.isStrippable) {
                                continue;
                            }

                            for (const strippableObj of nudeObj.objNude.strippableObjs) {
                                tryDestroyCollidedChildren(strippableObj);
                            }
                        }
                    }
                });
        })
        .show();
}

function* coroProbablyNude(nudeObj: ObjNude) {
    yield* Coro.race([
        holdf(() => nudeObj.objNude.genitalCoverageUnit <= 0.1, 30),
        () => nudeObj.objNude.genitalCoverageUnit <= 0.01,
    ]);
}

function mxnDestroyed(obj: DisplayObject, speed: Vector) {
    let stepsCount = 0;

    return obj
        .step(() => {
            obj.add(speed);
            speed.add(0, 0.4);
            if (stepsCount++ >= 30) {
                obj.destroy();
            }
        });
}
