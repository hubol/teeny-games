import { Container, DisplayObject, Sprite } from "pixi.js";
import { Tx } from "../../assets/textures";
import { onMutate } from "../../lib/game-engine/routines/on-mutate";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
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
                        (obj as DisplayObject).mixin(mxnDestroyed);
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

function mxnDestroyed(obj: DisplayObject) {
    const speed = vnew(Rng.float(-1, 1), Rng.float(-2, 0));

    return obj
        .step(() => {
            obj.add(speed);
            speed.add(0, 0.4);
        })
        .coro(function* () {
            yield sleep(500);
            obj.destroy();
        });
}
