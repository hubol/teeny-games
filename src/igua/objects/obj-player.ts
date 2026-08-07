import { Graphics } from "pixi.js";
import { Key } from "../globals";
import { mxnPhysics } from "../mixins/mxn-physics";

export function objPlayer() {
    return new Graphics()
        .beginFill(0xffffff)
        .drawRect(-10, -10, 20, 20)
        .mixin(mxnPhysics, { gravity: 0.5, physicsRadius: 10 })
        .step(self => {
            self.speed.x = 3;
            self.tint = self.physicsEnabled ? 0xff0000 : 0xffff00;
        })
        .coro(function* (self) {
            while (true) {
                yield () => self.isOnGround && Key.isDown("Space");
                self.physicsEnabled = false;
                self.speed.y = -8;
                yield () => Key.isUp("Space");
                self.physicsEnabled = true;
            }
        });
}
