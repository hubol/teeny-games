import { DisplayObject } from "pixi.js";
import { Instances } from "../../lib/game-engine/instances";
import { Logger } from "../../lib/game-engine/logger";
import { Coro } from "../../lib/game-engine/routines/coro";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { container } from "../../lib/pixi/container";
import { RethrownError } from "../../lib/rethrown-error";
import { Null } from "../../lib/types/null";
import { Key } from "../globals";
import { PizzaPointer } from "../utils/pizza-pointer";
import { objPizza } from "./obj-pizza";
import { objSpeedControl } from "./obj-speed-control";
import { objVisitorBalloon } from "./visitors/obj-visitor-balloon";
import { objVisitorTuna } from "./visitors/obj-visitor-tuna";

export function objVisitors() {
    let previousVisitorId = Null<VisitorId>();

    return container()
        .coro(function* () {
            while (true) {
                yield* Coro.race([
                    sleep(Rng.int(40_000, 60_000)),
                    () => Key.justWentDown("KeyV"),
                ]);

                try {
                    const visitorId = getVisitorId(previousVisitorId);
                    const visitorObj = createVisitorObj(visitorId);
                    previousVisitorId = visitorId;
                    yield () => visitorObj.destroyed;
                }
                catch (e) {
                    Logger.logUnexpectedError("objVisitors", new RethrownError("Failure during visitor event", e));
                }
            }
        });
}

type VisitorId = "tuna" | "balloon";

function getVisitorId(previousVisitorId: VisitorId | null): VisitorId {
    const speed = Instances(objSpeedControl)[0].objSpeedControl.speed;
    const areAnyToppingsAttached = Instances(objPizza)[0].objPizza.areAnyToppingsAttached;
    const secondsSincePointerDown = PizzaPointer.getTicksSinceDown() / 60;

    if (speed === 0 || !areAnyToppingsAttached) {
        return "balloon";
    }

    if (secondsSincePointerDown < 10) {
        return previousVisitorId === "balloon" ? "tuna" : "balloon";
    }

    return "tuna";
}

function createVisitorObj(id: VisitorId): DisplayObject {
    if (id === "balloon") {
        return objVisitorBalloon()
            .at(-240, 100)
            .show();
    }

    return objVisitorTuna()
        .at(2000, 700)
        .show();
}
