import { Sprite, Texture } from "pixi.js";
import { Tx } from "../../../assets/textures";
import { RgbInt } from "../../../lib/math/number-alias-types";
import { Rng } from "../../../lib/math/rng";
import { AdjustColor } from "../../../lib/pixi/adjust-color";
import { container } from "../../../lib/pixi/container";

export function objCharacterCritter(args: objCharacterCritter.Args) {
    return container(
        objCharacterCritterPart("Back", args),
        objCharacterCritterPart("Mullet", args),
        objCharacterCritterPart("Ears", args),
        objCharacterCritterPart("Body", args),
        objCharacterCritterPart("Bottoms", args),
        objCharacterCritterPart("Footwear", args),
        objCharacterCritterPart("Tops", args),
        objCharacterCritterPart("Sideburns", args),
        objCharacterCritterPart("Mouths", args),
        objCharacterCritterPart("Hairs", args),
        objCharacterCritterPart("Hats", args),
        objCharacterCritterPart("Eyes", args),
        objCharacterCritterPart("Noses", args),
    );
}

function objCharacterCritterPart(id: objCharacterCritter.PartId, args: objCharacterCritter.Args) {
    const tx = args.partTxs[id];
    return tx ? Sprite.from(tx) : container();
}

export namespace objCharacterCritter {
    export type PartId = keyof typeof Tx["Character"]["Critter"];

    export interface Args {
        colors: {
            red: RgbInt;
            green: RgbInt;
            blue: RgbInt;
        };
        partTxs: Record<PartId, Texture | null>;
    }

    export type ColorId = keyof Args["colors"];

    export namespace ChangeRequest {
        export interface Part {
            kind: "part";
            id: PartId;
        }

        export interface Color {
            kind: "color";
            id: ColorId;
            value: RgbInt;
        }
    }

    export type ChangeRequest = ChangeRequest.Part | ChangeRequest.Color;
}

objCharacterCritter.partIds = Object.keys(Tx.Character.Critter) as Array<objCharacterCritter.PartId>;

function createTxsManifest(
    allowNone: Array<objCharacterCritter.PartId>,
) {
    const manifest = Object.fromEntries(objCharacterCritter.partIds.map(id => [id, getTxsForPart(id, allowNone)]));
    return manifest as any as Record<objCharacterCritter.PartId, ReadonlyArray<Texture | null>>;
}

function getTxsForPart(id: objCharacterCritter.PartId, allowNone: Array<objCharacterCritter.PartId>) {
    const txs: Array<Texture | null> = Tx.Character.Critter[id].split({ width: 280 });
    if (allowNone.includes(id)) {
        txs.unshift(null);
    }
    return txs;
}

const txsManifest = createTxsManifest(["Back", "Footwear", "Hats", "Mullet"]);

objCharacterCritter.createColor = function createColor () {
    return AdjustColor.hsv(Rng.float(360), Rng.float(70, 100), Rng.float(90, 100)).toPixi();
};

objCharacterCritter.createArgs = function createArgs (): objCharacterCritter.Args {
    return {
        colors: {
            red: objCharacterCritter.createColor(),
            green: objCharacterCritter.createColor(),
            blue: objCharacterCritter.createColor(),
        },
        partTxs: Object.fromEntries(objCharacterCritter.partIds.map(id => [id, Rng.item(txsManifest[id])])) as any,
    };
};

objCharacterCritter.applyChanges = function applyChanges (
    _args: objCharacterCritter.Args,
    changes: objCharacterCritter.ChangeRequest[],
): objCharacterCritter.Args {
    const args: objCharacterCritter.Args = {
        colors: { ..._args.colors },
        partTxs: { ..._args.partTxs },
    };

    for (const change of changes) {
        if (change.kind === "color") {
            args.colors[change.id] = change.value;
        }
        else {
            for (let i = 0; i < 64; i++) {
                const value = Rng.item(txsManifest[change.id]);
                if (value !== _args.partTxs[change.id]) {
                    args.partTxs[change.id] = value;
                    break;
                }
            }
        }
    }

    return args;
};
