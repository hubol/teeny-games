import { Container, DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Instances } from "../../lib/game-engine/instances";
import { Vector, vnew } from "../../lib/math/vector-type";
import { Mouse } from "../globals";
import { objNude } from "../objects/obj-nude";

export function scnPlaceholder() {
    objNude().at(0, 0).show();
    objNude().at(200, 0).show();

    Sprite.from(Tx.Heart)
        .anchored(0.5, 0.5)
        .merge({ objCursor: { inferredSpeed: vnew() } })
        .step(self => {
            self.objCursor.inferredSpeed.at(Mouse).add(self, -1);
            self.at(Mouse);
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
                    if (self.objCursor.inferredSpeed.vlength > 2) {
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
