import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { Sfx } from "../../../assets/sounds";
import { Tx } from "../../../assets/textures";
import { Instances } from "../../../lib/game-engine/instances";
import { factor, interp, interpv } from "../../../lib/game-engine/routines/interp";
import { sleep, sleepf } from "../../../lib/game-engine/routines/sleep";
import { approachLinear } from "../../../lib/math/number";
import { Rng } from "../../../lib/math/rng";
import { vnew } from "../../../lib/math/vector-type";
import { CollisionShape } from "../../../lib/pixi/collision";
import { container } from "../../../lib/pixi/container";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";
import { objFxBubble } from "../fx/obj-fx-bubble";
import { objAttachedTopping } from "../obj-pizza";

export function objCharacterTuna() {
    let isDiving = false;
    const spriteObj = Sprite.from(Tx.Characters.Tuna)
        .mixin(mxnPointerPress)
        .handles("mxnPointerPress:pressed", (self) => {
            // TODO sfx and stuff
            isDiving = true;
            self.mxnPointerPress.canPress = false;
        })
        .step(self => {
            self.angle = approachLinear(self.angle, isDiving ? -40 : 0, 3);
        });

    const hitboxObj = new Graphics()
        .beginFill(0xff0000)
        .drawCircle(0, 0, 30);

    const speed = vnew(-2, 0);
    const diveSpeed = vnew(-1.3, 3).scale(3);

    const destroyedObjs = new WeakSet<DisplayObject>();

    return container(
        spriteObj
            .pivoted(89, 276)
            .scaled(0.4, 0.4),
        hitboxObj.invisible(),
    )
        .collisionShape(CollisionShape.DisplayObjects, [hitboxObj])
        .coro(function* (self) {
            while (true) {
                yield interp(self, "angle").steps(4).to(4).over(1000);
                yield interp(self, "angle").steps(4).to(0).over(1000);
            }
        })
        .coro(function* (self) {
            while (true) {
                const count = Rng.int(3, 6);
                self.play(Sfx.Effects.Bubble.rate(0.9, 1.1));
                for (let i = 0; i < count; i++) {
                    objFxBubble()
                        .scaled(0.4, 0.4)
                        .at(self)
                        .add(-30 * self.scale.x, -6 * self.scale.x)
                        .show();
                    yield sleepf(20 + Rng.int(2, 10));
                }
                yield sleep(Rng.int(600, 1500));
            }
        })
        .step(self => {
            if (self.x <= -400) {
                self.destroy();
                return;
            }
            if (isDiving) {
                speed.moveTowards(diveSpeed, 1);
            }
            else {
                for (const collidedObj of self.collidesAll(Instances(objAttachedTopping))) {
                    if (destroyedObjs.has(collidedObj)) {
                        continue;
                    }
                    self.play(Sfx.Effects.Eat.rate(0.9, 1.1));
                    collidedObj
                        .coro(function* (self) {
                            yield interpv(self.scale).factor(factor.sine).to(0, 0).over(400);
                            self.destroy();
                        });
                    destroyedObjs.add(collidedObj);
                }
            }
            self.add(speed, self.angle > 2 ? 1 : 0.8);
        });
}
