import { Graphics, Point, TilingSprite } from "pixi.js";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { Sfx } from "../../assets/sounds";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { factor, interpv } from "../../lib/game-engine/routines/interp";
import { onPrimitiveMutate } from "../../lib/game-engine/routines/on-primitive-mutate";
import { nlerp } from "../../lib/math/number";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { DataSpeedControlCharacters } from "../data/data-speed-control-characters";
import { mxnPointerPress } from "../mixins/mxn-pointer-press";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objCharacterSpeedControl } from "./characters/obj-character-speed-control";
import { objAnnouncer } from "./obj-announcer";

const consts = {
    trackRadius: 90,
    maximumSpeed: 2,
};

const p = new Point();

export function objSpeedControl() {
    let thisPointer = Null<PointerListener.State>();

    const handleObj = new Graphics()
        .beginFill(0x23B686)
        .drawCircle(0, 0, 25)
        .at(consts.trackRadius / 2, 0);

    const characterObj = container()
        .mixin(mxnPointerPress)
        .coro(function* (self) {
            let pointerPressesCount = 0;
            self.handles("mxnPointerPress:pressed", () => pointerPressesCount++);

            const orderedCharacterIds: Array<DataSpeedControlCharacters.Id> = ["Pete", "George", "Chicken"];
            let index = 0;

            function getCurrentCharacterId() {
                return orderedCharacterIds[index % orderedCharacterIds.length];
            }

            while (true) {
                const obj = objCharacterSpeedControl(getCurrentCharacterId())
                    .step(self => self.objCharacterSpeedControl.walkSpeed = api.speed * 1.33)
                    .show(self);
                yield interpv(self.scale).steps(4).to(1, 1).over(250);
                yield onPrimitiveMutate(() => pointerPressesCount);
                index++;
                obj.destroy();
                self.scale.set(0, 0);
                const sfx = DataSpeedControlCharacters.getById(getCurrentCharacterId()).pickSfx;
                objAnnouncer.singleton.announce(sfx);
            }
        });

    const api = {
        get speed() {
            const rawSpeed = (handleObj.x / consts.trackRadius) * 2;
            return Math.max(
                -consts.maximumSpeed,
                Math.min(Math.abs(rawSpeed) < 0.2 ? 0 : rawSpeed, consts.maximumSpeed),
            );
        },
    };

    const skyMaskObj = new Graphics()
        .beginFill(0xffffff)
        .drawRect(-90, -200, 180, 200);

    const skyObj = new TilingSprite(NoAtlasTx.Effects.Clouds, 300, 128)
        .scaled(2, 2)
        .at(-90, -200)
        .masked(skyMaskObj)
        .step(self => {
            self.tilePosition.x -= api.speed;
            self.tilePosition.y = Math.sin(self.tilePosition.x / 180) * 3;
        });

    return container(
        new Graphics()
            .beginFill(0xffffff)
            .drawRoundedRect(-130, -240, 260, 330, 10),
        new Graphics()
            .beginFill(0xbfdbff)
            .drawRoundedRect(-110, -220, 220, 230, 5),
        new Graphics()
            .beginFill(0x7cd167)
            .drawRect(-100, -30, 200, 30),
        skyMaskObj,
        skyObj,
        characterObj
            .at(0, -16),
        container(
            new Graphics()
                .beginFill(0x780AFF)
                .drawRoundedRect(-consts.trackRadius, -10, consts.trackRadius * 2, 20, 10),
            handleObj,
        )
            .step(self => {
                if (thisPointer?.down) {
                    return;
                }
                const pointer = PizzaPointer.claim(self);
                if (pointer) {
                    thisPointer = pointer;
                }
            })
            .step(self => {
                if (!thisPointer) {
                    return;
                }

                const previousSpeed = api.speed;

                const point = self.worldTransform.applyInverse(thisPointer, p);
                const x = point.x;
                handleObj.x = Math.max(-consts.trackRadius, Math.min(x, consts.trackRadius));

                if (api.speed !== previousSpeed) {
                    handleObj.play(
                        Sfx.Tools.AdjustSpeed.rate(nlerp(0.5, 2, Math.abs(api.speed / consts.maximumSpeed))),
                    );
                }
            })
            .at(0, 50),
    )
        .merge({ objSpeedControl: api });
}

export namespace objSpeedControl {
    export type Type = ReturnType<typeof objSpeedControl>;
}
