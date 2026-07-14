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
import { renderer } from "../../current-pixi-renderer";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnPointerPress } from "../../mixins/mxn-pointer-press";
import { objFxBubble } from "../fx/obj-fx-bubble";
import { objFeatureFlags } from "../obj-feature-flags";
import { objAttachedTopping } from "../obj-pizza";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

export function objCharacterTuna() {
    let isDiving = false;
    let pedometer = 0;

    const puppetObj = objCharacterTunaPuppet()
        .mixin(mxnFxBoil, "position")
        .mixin(mxnPointerPress, 999)
        .handles("mxnPointerPress:pressed", (self) => {
            isDiving = true;
            self.mxnPointerPress.canPress = false;
        })
        .step(self => {
            pedometer += 1 + speed.vlength / 2;
            const t = pedometer / 30;
            self.objCharacterTunaPuppet.finExtendedUnit = (Math.sin(t + Math.PI / 4) + 1) / 2;
            self.objCharacterTunaPuppet.forwardUnit = (Math.sin(t) + 1) / 2;
        })
        .coro(function* (self) {
            yield () => isDiving;
            self.play(Sfx.Effects.FishDismiss.rate(0.95, 1.05));
            yield interp(self, "angle").factor(factor.sine).to(-40).over(500);
        });

    const hitboxObj = new Graphics()
        .beginFill(0xff0000)
        .drawCircle(0, 0, 30);

    const speed = vnew(-2, 0);
    const diveSpeed = vnew(-1.3, 3).scale(3);
    const targetY = Instances(objAttachedTopping)[0]?.getWorldCenter()?.y ?? Rng.int(100, renderer.height - 100);

    const destroyedObjs = new WeakSet<DisplayObject>();

    return container(
        puppetObj
            .pivoted(27, 86)
            .scaled(1.67, 1.67),
        hitboxObj.invisible(),
    )
        .collisionShape(CollisionShape.DisplayObjects, [hitboxObj])
        .coro(function* (self) {
            while (true) {
                const count = Rng.int(3, 6);
                self.play(Sfx.Effects.Bubble.rate(0.9, 1.1));
                for (let i = 0; i < count; i++) {
                    objFxBubble()
                        .scaled(1, 1)
                        .at(self)
                        .add(-30 * self.scale.x, -6 * self.scale.x)
                        .show();
                    yield sleepf(40 + Rng.int(2, 10));
                }
                yield sleep(Rng.int(1100, 1800));
            }
        })
        .step(self => {
            puppetObj.objCharacterTunaPuppet.isAgape = isDiving
                ? false
                : (self.x < (renderer.width * .8) && Instances(objAttachedTopping).length > 0);
            if (self.x <= -self.width || self.y >= renderer.height + self.height) {
                self.destroy();
                return;
            }
            if (isDiving) {
                speed.moveTowards(diveSpeed, 1);
            }
            else {
                const targetDiffY = targetY - self.y;
                if (!objFeatureFlags.singleton.isEnabled("PizzaSpin")) {
                    const isCloseToTarget = Math.abs(targetDiffY) < 20;
                    speed.y = approachLinear(
                        speed.y,
                        isCloseToTarget
                            ? 0
                            : (Math.sign(targetDiffY) * Math.max(0.7, Math.min(3, Math.abs(targetDiffY / 150)))),
                        isCloseToTarget ? 0.05 : 0.03,
                    );
                }

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
            self.add(speed, puppetObj.objCharacterTunaPuppet.finExtendedUnit < 0.5 ? 1 : 0.8);
        });
}

const [
    txEyeBack,
    txBody,
    txBodyForward,
    txFinIdle,
    txFinActive,
    txFinExtended,
    txMouthClosed,
    txMouthOpen,
    txEyeFront,
] = Tx.Characters.Tuna.split({ width: 330 });

function objCharacterTunaPuppet() {
    let forwardUnit = 0;
    let finExtendedUnit = 0;
    let isAgape = false;

    const api = {
        get forwardUnit() {
            return forwardUnit;
        },
        set forwardUnit(value) {
            bodyObj.textureIndex = bodyObj.textures.length * value;
            forwardUnit = value;
        },
        get finExtendedUnit() {
            return finExtendedUnit;
        },
        set finExtendedUnit(value) {
            finObj.textureIndex = finObj.textures.length * value;
            finExtendedUnit = value;
        },
        get isAgape() {
            return isAgape;
        },
        set isAgape(value) {
            mouthObj.textureIndex = value ? 1 : 0;
            isAgape = value;
        },
    };

    const bodyObj = objIndexedSprite([txBody, txBodyForward]);
    const finObj = objIndexedSprite([txFinIdle, txFinActive, txFinExtended]);
    const mouthObj = objIndexedSprite([txMouthClosed, txMouthOpen]);
    return container(
        Sprite.from(txEyeBack),
        bodyObj,
        finObj,
        mouthObj,
        Sprite.from(txEyeFront),
    )
        .merge({ objCharacterTunaPuppet: api });
}
