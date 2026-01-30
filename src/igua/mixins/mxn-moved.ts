import { DisplayObject } from "pixi.js";
import { vnew } from "../../lib/math/vector-type";

export function mxnMoved(obj: DisplayObject) {
    return obj
        .dispatches<"moved">()
        .coro(function* (self) {
            const previous = vnew(obj.getWorldPosition()).vround();
            obj.step(() => {
                const position = obj.getWorldPosition();
                const x = Math.round(position.x);
                const y = Math.round(position.y);
                if (x !== previous.x || y !== previous.y) {
                    self.dispatch("moved");
                    previous.at(x, y);
                }
            });
        });
}
