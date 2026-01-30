import { DisplayObject } from "pixi.js";
import { vnew } from "../../lib/math/vector-type";
import { Key } from "../globals";

interface MxnArrowKeysArgs {
    acceleration: number;
    deceleration: number;
    max: number;
}

export function mxnArrowKeys(obj: DisplayObject, args: MxnArrowKeysArgs) {
    const target = vnew();
    const speed = vnew();

    return obj
        .coro(function* () {
            const position = obj.vcpy();
            obj
                .step(() => {
                    target.at(0, 0);
                    if (Key.isDown("ArrowLeft")) {
                        target.x -= 1;
                    }
                    if (Key.isDown("ArrowUp")) {
                        target.y -= 1;
                    }
                    if (Key.isDown("ArrowRight")) {
                        target.x += 1;
                    }
                    if (Key.isDown("ArrowDown")) {
                        target.y += 1;
                    }

                    let delta = args.deceleration;

                    if (!target.isZero) {
                        delta = args.acceleration;
                        target.normalize().scale(args.max);
                    }

                    speed.moveTowards(target, delta);
                    position.add(speed);
                    obj.at(position).vround();
                });
        });
}
