import { Container, DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { Vector, vnew } from "../../lib/math/vector-type";
import { CollisionShape } from "../../lib/pixi/collision";
import { Mouse } from "../globals";
import { objDestructibleSprite } from "../objects/obj-destructible-sprite";

const txsFag = Tx.Nudes.DemoFag.split({ count: 3 });

export function scnPlaceholder() {
    Sprite.from(txsFag[0]).show();
    const underwearObj = objDestructibleSprite(txsFag[1], 8)
        .collisionShape(CollisionShape.Children)
        .merge({ objUnderwear: { isConcealed: true } })
        .step(self => {
            if (self.objUnderwear.isConcealed) {
                self.objUnderwear.isConcealed = Boolean(self.collidesOne(clothesObj.children));
            }
        })
        .show();
    const clothesObj = objDestructibleSprite(txsFag[2], 8).show();

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
                        tryDestroyCollidedChildren(clothesObj);
                        if (!underwearObj.objUnderwear.isConcealed) {
                            tryDestroyCollidedChildren(underwearObj);
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
