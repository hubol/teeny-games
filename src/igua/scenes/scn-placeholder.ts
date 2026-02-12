import { Container, DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { approachLinear } from "../../lib/math/number";
import { Vector, vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Mouse, scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objFucka } from "../objects/obj-fucka";
import { objNude } from "../objects/obj-nude";

const txsFag = Tx.Nudes.DemoFag.split({ count: 4 });
const txsBadlyDressed = Tx.Nudes.BadlyDressed.split({ count: 4 });

export function scnPlaceholder() {
    scene.style.backgroundTint = 0x5537a8;

    objNude({
        bodyObj: container(
            Sprite.from(txsFag[0]),
            Sprite.from(txsFag[1]).mixin(mxnBoilPivot),
        ),
        underwearTx: txsFag[2],
        clothesTx: [txsFag[3]],
    })
        .at(0, 0)
        .show();

    objNude({
        bodyObj: container(
            Sprite.from(txsBadlyDressed[0]),
            Sprite.from(txsBadlyDressed[1]).mixin(mxnBoilPivot),
        ),
        underwearTx: txsBadlyDressed[2],
        clothesTx: [txsBadlyDressed[3]],
    })
        .at(200, 0)
        .show();

    objFucka()
        .at(100, 0)
        .show();

    Sprite.from(Tx.Heart)
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
                        );
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
