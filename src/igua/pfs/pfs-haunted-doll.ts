import { StorageEntry } from "../../lib/browser/storage-entry";
import { objDollBase } from "../objects/doll/obj-doll-base";

export const PfsHauntedDoll = {
    Launched: new StorageEntry.Local<objDollBase.Serialized>("icm.haunted-doll-launch.launched"),
};
