import { Container, DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { approachLinear } from "../../lib/math/number";
import { Vector, vnew } from "../../lib/math/vector-type";
import { Mouse } from "../globals";
import { objNude } from "../objects/obj-nude";

const txsFag = Tx.Nudes.DemoFag.split({ count: 3 });
const txsBadlyDressed = Tx.Nudes.BadlyDressed.split({ count: 3 });

export function scnPlaceholder() {
    objNude({
        bodyTx: txsFag[0],
        underwearTx: txsFag[1],
        clothesTx: [txsFag[2]],
    })
        .at(0, 0)
        .show();

    objNude({
        bodyTx: txsBadlyDressed[0],
        underwearTx: txsBadlyDressed[1],
        clothesTx: [txsBadlyDressed[2]],
    })
        .at(200, 0)
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
