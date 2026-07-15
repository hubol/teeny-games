import { Sprite } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { VectorSimple, vnew } from "../../../lib/math/vector-type";
import { container } from "../../../lib/pixi/container";
import { mxnFxBoil } from "../../mixins/fx/mxn-fx-boil";
import { objSpeedControl } from "../obj-speed-control";
import { StepOrder } from "../step-order";
import { objIndexedSprite } from "../utils/obj-indexed-sprite";

const v = vnew();

export function objCharacterRunner() {
    const api = {
        pedometer: 0,
    };

    function getCharacterTxs() {
        return objSpeedControl.getCharacterData().runnerTxs;
    }

    const previous = vnew();

    const spriteObj = objIndexedSprite(getCharacterTxs().South);

    return container(
        Sprite.from(Tx.Characters.Runner.Shadow)
            .mixin(mxnFxBoil, "pivot")
            .at(0, 11)
            .step(self => {
                self.y = spriteObj.texture.height - 33;
            }),
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
                        spriteObj.textures = getCharacterTxs().East;
                    }
                    else if (direction === "north") {
                        spriteObj.textures = getCharacterTxs().North;
                    }
                    else if (direction === "south") {
                        spriteObj.textures = getCharacterTxs().South;
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
