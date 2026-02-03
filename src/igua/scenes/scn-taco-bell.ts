import { Sprite } from "pixi.js";
import { objText } from "../../assets/fonts";
import { Sfx } from "../../assets/sounds";
import { Tx } from "../../assets/textures";
import { interpvr } from "../../lib/game-engine/routines/interp";
import { sleep } from "../../lib/game-engine/routines/sleep";
import { Rng } from "../../lib/math/rng";
import { vnew } from "../../lib/math/vector-type";
import { container } from "../../lib/pixi/container";
import { scene } from "../globals";
import { mxnBoilDisplacement } from "../mixins/mxn-boil-displacement";
import { mxnBoilPivot } from "../mixins/mxn-boil-pivot";

const [txSkyline, txInterior, txTable, txHubol, txHubolFace, txHubolMouth] = Tx.Tbell.Scene0.split({ width: 500 });
const [txLottie, txLottieFace, txLottieMouth, txLottieSpeech, txHubolSpeech] = Tx.Tbell.Scene1.split({ width: 500 });

const consts = {
    hubolDialogs: [
        { text: "What'd you do this week bitch?", sfx: Sfx.TacoBell.Hubol0 },
        { text: "What you been up to girl?", sfx: Sfx.TacoBell.Hubol1 },
        { text: "What the hell have you been doing this week?", sfx: Sfx.TacoBell.Hubol2 },
        { text: "Anything good this week?", sfx: Sfx.TacoBell.Hubol3 },
    ],
};

export function scnTacoBell() {
    Sprite.from(txSkyline)
        .mixin(mxnBoilDisplacement, { rate: 0.0125, scale: 2 })
        .zIndexed(-999)
        .show();

    Sprite.from(txInterior).show();
    Sprite.from(txTable).show();

    const hubolObj = objCharacter("hubol").show();
    const lottieObj = objCharacter("lottie").show();

    container()
        .coro(function* () {
            yield sleep(1000);

            const hubolDialog = Rng.item(consts.hubolDialogs);
            const dialogTextObj = objText.Large(hubolDialog.text, { tint: 0xD5321C, maxWidth: 200 })
                .anchored(0.5, 0.5)
                .show(hubolObj.objCharacter.speechObjs);
            const soundInstance = hubolDialog.sfx.playInstance();
            yield () => soundInstance.ended;
            dialogTextObj.destroy();
        })
        .show();
}

function objCharacter(mode: "hubol" | "lottie") {
    const txBody = mode === "hubol" ? txHubol : txLottie;
    const txFace = mode === "hubol" ? txHubolFace : txLottieFace;
    const txMouth = mode === "hubol" ? txHubolMouth : txLottieMouth;
    const txSpeech = mode === "hubol" ? txHubolSpeech : txLottieSpeech;
    const speechObjsPosition = mode === "hubol" ? vnew(235, 62) : vnew(255, 55);

    const api = {
        speechObjs: container().at(speechObjsPosition),
    };

    return container(
        Sprite.from(txBody),
        container(
            Sprite.from(txFace),
            Sprite.from(txMouth)
                .invisible()
                .coro(function* (self) {
                    while (true) {
                        yield () => api.speechObjs.children.length > 0;
                        self.visible = true;
                        yield sleep(250);
                        self.visible = false;
                        yield sleep(250);
                    }
                }),
        )
            .mixin(mxnBoilPivot),
        container(
            Sprite.from(txSpeech),
            api.speechObjs,
        )
            .invisible()
            .coro(function* (self) {
                while (true) {
                    yield () => api.speechObjs.children.length > 0;
                    self.y = 10;
                    self.visible = true;
                    yield interpvr(self).to(0, 0).over(750);
                    yield () => api.speechObjs.children.length <= 0;
                    self.visible = false;
                }
            }),
    )
        .merge({ objCharacter: api });
}
