import { Lvl } from "../../assets/generated/levels/generated-level-data";
import { interpv } from "../../lib/game-engine/routines/interp";
import { onMutate } from "../../lib/game-engine/routines/on-mutate";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { container } from "../../lib/pixi/container";
import { Null } from "../../lib/types/null";
import { mxnFxBoilDisplacement } from "../mixins/fx/mxn-fx-boil-displacement";
import { objDollBase } from "../objects/doll/obj-doll-base";
import { objFxStar } from "../objects/fx/obj-fx-star";
import { PfsHauntedDoll } from "../pfs/pfs-haunted-doll";
import { Search } from "../utils/search";

export function scnAttract() {
    const lvl = Lvl.Attract();

    Search.findMarkers(0xb7ace2)
        .forEach(position => objFxStar().at(position).zIndexed(-999).show());

    lvl.TitleGroup.children.forEach(obj =>
        obj
            .mixin(mxnFxBoilDisplacement, { rate: 0.1, scale: 5 })
            .step(self => self.angle += 0.1)
    );

    let dollData = Null<objDollBase.Serialized>();

    container()
        .at(lvl.DollMarker)
        .zIndexed(-500)
        .coro(function* (self) {
            while (true) {
                yield onMutate(() => dollData);
                self.children.forEach(obj =>
                    obj
                        .coro(function* () {
                            yield interpv(obj.scale).to(0, 0).over(1000);
                        })
                );
                yield sleep(1000);
                self.removeAllChildren();
                if (dollData) {
                    objDollBase.deserialize(dollData)
                        .scaled(0, 0)
                        .step(self => self.angle -= 0.08)
                        .coro(function* (self) {
                            yield interpv(self.scale).to(0.6, 0.6).over(1000);
                        })
                        .show(self);
                    yield sleep(1000);
                }
            }
        })
        .coro(function* () {
            while (true) {
                yield sleep(1000);
                dollData = PfsHauntedDoll.Launched.value ?? null;
            }
        })
        .show();
}
