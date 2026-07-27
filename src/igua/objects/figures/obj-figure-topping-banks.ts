import { Graphics } from "pixi.js";
import { Coro } from "../../../lib/game-engine/routines/coro";
import { onMutate } from "../../../lib/game-engine/routines/on-mutate";
import { vdeg } from "../../../lib/math/angle";
import { container } from "../../../lib/pixi/container";
import { PizzaToppingBanks } from "../../data/pizza-topping-banks";
import { objFigureToppingContainer } from "./obj-figure-topping-container";

export function objFigureToppingBanks(banks: PizzaToppingBanks.Model) {
    return container()
        .autoSorted()
        .coro(function* (self) {
            while (true) {
                yield* Coro.race([
                    onMutate(() => banks.next),
                    onMutate(() => banks.current),
                ]);

                self.removeAllChildren();

                if (banks.next === banks.current) {
                    continue;
                }

                new Graphics()
                    .beginFill(0xe73f21)
                    .drawCircle(0, 0, 50)
                    .beginFill(0xe7e421)
                    .drawCircle(0, 0, 43)
                    .beginFill(0x28e431)
                    .drawCircle(0, 0, 34)
                    .beginFill(0x5dbbe0)
                    .drawCircle(0, 0, 20)
                    .zIndexed(-9999)
                    .show(self);

                const bank = banks.next;

                for (let i = 0; i < Math.min(bank.length, 4); i++) {
                    const position = vdeg(i * 90)
                        .scale(40)
                        .add(0, 20);
                    objFigureToppingContainer(bank[i])
                        .scaled(0.2, 0.2)
                        .at(position)
                        .zIndexed(position.y)
                        .show(self);
                }
            }
        });
}
