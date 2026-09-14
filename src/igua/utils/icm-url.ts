import { UrlParams } from "../../lib/browser/url-params";

export const IcmUrl = {
    get screenIndex() {
        const index = Number.parseInt(UrlParams.get("screenIndex") ?? "0");
        return Number.isNaN(index) ? 0 : index;
    },
};
