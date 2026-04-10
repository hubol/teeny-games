import { Graphics } from "pixi.js";
import { objText } from "../../assets/fonts";
import { KeyCode } from "../../lib/browser/key-listener";
import { Coro } from "../../lib/game-engine/routines/coro";
import { holdf } from "../../lib/game-engine/routines/hold";
import { factor, interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { vdeg } from "../../lib/math/angle";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { Key, scene } from "../globals";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";
import { objFxBurst0 } from "./obj-fx-burst0";

interface ObjKeyLocationArgs {
    code: KeyCode;
    // radius: number;
    // label: {
    //     degrees: number;
    // };
}

const layout = {
    padding: 16,
    keySize: 32,
};

const restoreCircleVector = vnew(1, 1);

export function objKeyLocation(args: ObjKeyLocationArgs) {
    const api = {
        pressesCount: 0,
        get isDown() {
            return Key.isDown(args.code);
        },
    };

    const labelKeyText = args.code.charAt(args.code.length - 1);
    // const labelKeyPosition = vdeg(args.label.degrees).scale(args.radius + layout.padding + layout.keySize / 2).vround();

    const circleObj = new Graphics()
        // .lineStyle(4, 0xffffff)
        // .drawCircle(0, 0, args.radius)
        .mixin(mxnBoilPivot);

    return container(
        circleObj.invisible(),
        container(
            objKey(labelKeyText, args.code),
        ),
        // .at(labelKeyPosition),
    )
        .dispatches<"objKeyLocation:down">()
        .merge({ objKeyLocation: api })
        .coro(function* (self) {
            function createBurstObj(angle: number) {
                objFxBurst0()
                    .at(self)
                    // .add(vdeg(angle), args.radius - 4)
                    .angled(angle - 135 + Rng.float(-10, 10))
                    .show(self.parent);
            }

            self.step(() => {
                if (Key.justWentDown(args.code)) {
                    api.pressesCount++;
                    // const count = Math.max(2, Math.abs(args.radius / 10));
                    // const delta = 360 / count;
                    // const degrees = Rng.float(360);
                    // for (let i = 0; i < count; i++) {
                    //     const angle = degrees + delta * i;
                    //     createBurstObj(angle);
                    // }
                    // circleObj.scale.at(0.9, 0.9);
                }
                else if (Key.isDown(args.code)) {
                    self.dispatch("objKeyLocation:down");
                    // circleObj.scale.at(0.9, 0.9);
                    // if (scene.ticker.ticks % 6 === 0) {
                    //     createBurstObj(Rng.float(360));
                    // }
                }
                else {
                    // circleObj.scale.moveTowards(restoreCircleVector, 0.02);
                }
            });
        });
}

function objKey(text: string, code: KeyCode) {
    return container(
        new Graphics().beginFill(0xb0b0b0).drawRoundedRect(0, 10, layout.keySize, layout.keySize, 4),
        container(
            new Graphics().beginFill(0xffffff).drawRoundedRect(0, 0, layout.keySize, layout.keySize, 4),
            objText.XLargeIrregular(text, { tint: 0x000000 })
                .anchored(0.5, 0.5)
                .at(layout.keySize / 2 + 2, layout.keySize / 2 + 2),
        )
            .coro(function* (self) {
                while (true) {
                    yield* Coro.race([() => scene.ticker.ticks % 60 === 0, () => Key.isDown(code)]);
                    yield interpvr(self).to(0, 9).over(300);
                    yield holdf(() => Key.isUp(code), 6);
                    yield interpvr(self).factor(factor.sine).to(0, 0).over(500);
                }
            }),
    )
        .pivoted(layout.keySize / 2, layout.keySize / 2);
}

export type ObjKeyLocation = ReturnType<typeof objKeyLocation>;
