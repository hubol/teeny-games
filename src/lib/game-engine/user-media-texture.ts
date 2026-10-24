import { BaseTexture, MIPMAP_MODES, Texture, VideoResource } from "pixi.js";

export namespace UserMediaTexture {
    export async function load() {
        return await makeMediaTexture();
    }

    async function makeMediaTexture() {
        const videoElement = await makeUserMediaVideoElement();
        const res = new VideoResource(videoElement);
        const baseTexture = new BaseTexture(res, { mipmap: MIPMAP_MODES.OFF });
        return new Texture(baseTexture);
    }

    async function makeUserMediaVideoElement() {
        const media = await navigator.mediaDevices.getUserMedia({ audio: false, video: {} });
        const videoElement = document.createElement("video");
        videoElement.srcObject = media;
        // https://stackoverflow.com/a/54678952
        videoElement.setAttribute("autoplay", "");
        videoElement.setAttribute("muted", "");
        videoElement.setAttribute("playsinline", "");
        await videoElement.play();
        return videoElement;
    }
}
