import { Pojo } from "../../types/pojo";

type Mutable = Pojo | Array<unknown>;
type MutableRef = () => Mutable;

export function onMutate<TMutable extends Mutable | MutableRef>(mutable: TMutable) {
    if (typeof mutable === "function") {
        const json = JSON.stringify(mutable());
        return () => JSON.stringify(mutable()) !== json;
    }

    const json = JSON.stringify(mutable);
    return () => JSON.stringify(mutable) !== json;
}
