import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { VectorSimple, vnew } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { mxnFxFlipH } from "../../mixins/fx/mxn-fx-flip-h";
import { StepOrder } from "../step-order";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const txsEast = Tx.Characters.Pete.Runner.East.split({ width: 38 });
const txsNorth = Tx.Characters.Pete.Runner.North.split({ width: 38 });
const txsSouth = Tx.Characters.Pete.Runner.South.split({ width: 38 });

const v = vnew();

export function objCharacterRunner() {
    const api = {
        pedometer: 0,
    };

    const previous = vnew();

    const spriteObj = objIndexedSprite(txsSouth);

    return container(
        Sprite.from(Tx.Characters.Runner.Shadow)
            .mixin(mxnFxBoil, "pivot")
            .at(0, 11),
        spriteObj,
    )
        .pivoted(4, 18)
        .coro(function* (self) {
            previous.at(self);
            self
                .step(() => {
                    v.at(self).add(previous, -1);
                    previous.at(self);
                    if (v.vlength < 0.1) {
                        return;
                    }
                    v.normalize();

                    const direction = getCompassDirection(v);
                    if (direction === null) {
                        return;
                    }

                    if (direction === "east" || direction === "west") {
                        spriteObj.textures = txsEast;
                    }
                    else if (direction === "north") {
                        spriteObj.textures = txsNorth;
                    }
                    else if (direction === "south") {
                        spriteObj.textures = txsSouth;
                    }

                    self.scale.x = ((direction === "west" || direction === "north") ? -1 : 1) * Math.abs(self.scale.x);
                }, StepOrder.BeforeCamera);
        })
        .step(() => {
            spriteObj.textureIndex = api.pedometer % 2;
        })
        .merge({ objCharacterRunner: api });
}

export namespace objCharacterRunner {
    export type Type = ReturnType<typeof objCharacterRunner>;
}

function getCompassDirection(v: VectorSimple) {
    if (Math.abs(v.x) > Math.abs(v.y)) {
        if (v.x > 0.1) {
            return "east";
        }
        if (v.x < -0.1) {
            return "west";
        }
    }
    else {
        if (v.y > 0.1) {
            return "south";
        }
        if (v.y < -0.1) {
            return "north";
        }
    }

    return null;
}
