import { Null } from "../types/null";

let searchPath = Null<string>();
let searchParams = Null<URLSearchParams>();

function getCurrentSearchParams() {
    const nextPath = window.location.search;
    if (nextPath === searchPath) {
        return searchParams!;
    }

    searchPath = nextPath;
    return searchParams = new URLSearchParams(nextPath);
}

export const UrlParams = {
    get(name: string) {
        return getCurrentSearchParams().get(name);
    },
};
