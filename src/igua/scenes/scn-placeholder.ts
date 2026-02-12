import { Container, DisplayObject, Sprite, Texture } from "pixi.js";
import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../lib/math/number";
import { Rng } from "../../lib/math/rng";
import { Vector, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Mouse, scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objFucka } from "../objects/obj-fucka";
import { ObjNude, objNude } from "../objects/obj-nude";

const txsFag = Tx.Nudes.DemoFag.split({ count: 4 });
const txsBadlyDressed = Tx.Nudes.BadlyDressed.split({ count: 4 });
const txsLong = Tx.Nudes.Long.split({ count: 4 });

function objStaticNude(txs: Texture[]) {
    return objNude({
        bodyObj: container(
            Sprite.from(txs[0]),
            Sprite.from(txs[1]).mixin(mxnBoilPivot),
        ),
        underwearTx: txs[2],
        clothesTx: [txs[3]],
    });
}

export function scnPlaceholder() {
    const lvl = Lvl.Start();

    scene.stage
        .coro(function* () {
            lvl.TextGroup.children.forEach(obj => obj.visible = false);

            yield sleep(250);

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
                obj.tint = 0x8c72aa;
                yield () => !Mouse.isDown;
                obj.tint = 0xffffff;
            }

            lvl.TextGroup.destroy();

            yield sleep(500);

            const fuckaObj = objFucka()
                .at(150, 0)
                .show();

            yield* coroProbablyNude(fuckaObj);

            Sfx.Advance.play();

            const fagObj = objStaticNude(txsFag)
                .at(10, 10)
                .pivoted(200, 0)
                .show();

            const badlyDressedObj = objStaticNude(txsBadlyDressed)
                .at(300, 10)
                .pivoted(-200, 0)
                .show();

            yield* Coro.all([
                interpvr(fagObj.pivot).to(0, 0).over(1000),
                interpvr(badlyDressedObj.pivot).to(0, 0).over(1000),
            ]);

            yield* Coro.all([
                coroProbablyNude(fagObj),
                coroProbablyNude(badlyDressedObj),
            ]);

            Sfx.Advance.play();

            const longObj = objStaticNude(txsLong)
                .at(0, 93)
                .pivoted(650, 0)
                .show();

            yield interpvr(longObj.pivot).to(0, 0).over(1000);

            yield* coroProbablyNude(longObj);

            Sfx.Dialog.YouAreGay.play();

            Sprite.from(Tx.Ending)
                .mixin(mxnBoilPivot)
                .show();
        });

    const impactSfxs = [
        Sfx.Impact.Undress0,
        Sfx.Impact.Undress1,
        Sfx.Impact.Undress2,
        Sfx.Impact.Undress3,
        Sfx.Impact.Undress4,
    ];

    const heartObj = Sprite.from(Tx.Heart)
        .zIndexed(99)
        .anchored(0.5, 0.5)
        .merge({ objCursor: { inferredSpeed: vnew() } })
        .step(self => {
            self.objCursor.inferredSpeed.at(Mouse).add(self, -1);
            self.at(Mouse);

            let scale = self.scale.x;
            scale = approachLinear(scale, Mouse.isDown ? 10 : 1, Mouse.isDown ? 0.2 : 1);
            self.scale.set(scale);
        })
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
                            tryDestroyCollidedChildren(nudeObj.objNude.clothesObj);
                            if (!nudeObj.objNude.underwearObj.objUnderwear.isConcealed) {
                                tryDestroyCollidedChildren(nudeObj.objNude.underwearObj);
                            }
                        }
                    }
                });
        })
        .show();
}

function* coroProbablyNude(nudeObj: ObjNude) {
    yield* Coro.race([
        holdf(() => nudeObj.objNude.underwearObj.objUnderwear.coverageUnit <= 0.1, 30),
        () => nudeObj.objNude.underwearObj.objUnderwear.coverageUnit <= 0.01,
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
