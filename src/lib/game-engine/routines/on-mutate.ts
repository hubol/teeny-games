import { Pojo } from "../../types/pojo";

type Mutable = Pojo | Array<unknown> | null;

export function onMutate<TMutable extends Mutable>(mutable: TMutable) {
    const json = JSON.stringify(mutable);
    return () => JSON.stringify(mutable) !== json;
}

export function onProviderMutate<TMutable extends Mutable>(mutableFn: () => TMutable) {
    const json = JSON.stringify(mutableFn());
    return () => JSON.stringify(mutableFn()) !== json;
}
