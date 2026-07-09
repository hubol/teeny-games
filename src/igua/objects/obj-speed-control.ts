import { Graphics, Point, TilingSprite } from "pixi.js";
import { NoAtlasTx } from "../../assets/no-atlas-textures";
import { PointerListener } from "../../lib/browser/pointer-listener";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objCharacterPeteWalk } from "./characters/obj-character-pete-walk";

const consts = {
    trackRadius: 90,
};

const p = new Point();

export function objSpeedControl() {
    let thisPointer = Null<PointerListener.State>();

    const handleObj = new Graphics()
        .beginFill(0x23B686)
        .drawCircle(0, 0, 25)
        .at(consts.trackRadius / 2, 0);

    const peteObj = objCharacterPeteWalk()
        .step(self => self.objCharacterPeteWalk.walkSpeed = api.speed);

    const api = {
        get speed() {
            const rawSpeed = (handleObj.x / consts.trackRadius) * 2;
            return Math.max(-2, Math.min(Math.abs(rawSpeed) < 0.2 ? 0 : rawSpeed, 2));
        },
    };

    const skyMaskObj = new Graphics()
        .beginFill(0xffffff)
        .drawRect(-90, -200, 180, 200);

    const skyObj = new TilingSprite(NoAtlasTx.Effects.Clouds, 300, 64)
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
        peteObj
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

                const point = self.worldTransform.applyInverse(thisPointer, p);
                const x = point.x;
                handleObj.x = Math.max(-consts.trackRadius, Math.min(x, consts.trackRadius));
            })
            .at(0, 50),
    )
        .merge({ objSpeedControl: api });
}

export namespace objSpeedControl {
    export type Type = ReturnType<typeof objSpeedControl>;
}
