import Module from "../../module";

export default class Watermark extends Module {
    constructor () {
        super("Watermark", "Watermark showing client name.", "Visual", {
            "Text": "DadaOS"
        })
    }

    onSettingUpdate() {
        let watermarkElement = document.querySelector(".dadaos-overlay-title");
        if(watermarkElement) watermarkElement.textContent = this.options["Text"];
    }

    onEnable() {
        let watermarkElement = document.querySelector(".dadaos-overlay-title");
        if (!watermarkElement) {
            watermarkElement = document.createElement("div");
            watermarkElement.className = "dadaos-overlay-title";
            watermarkElement.textContent = this.options["Text"];
            watermarkElement.style.position = "absolute";
            watermarkElement.style.top = "0";
            watermarkElement.style.left = "0";
            watermarkElement.style.padding = "0.5em";
            watermarkElement.style.userSelect = "none";
            watermarkElement.style.display = "none";
            watermarkElement.style.zIndex = "1000";
            watermarkElement.style.textShadow = "var(--dadaos-accent-color) 0px 0px 10px";
            watermarkElement.style.fontFamily = "'Product Sans', sans-serif";
            watermarkElement.style.fontSize = "24px";
            watermarkElement.style.background = "var(--dadaos-accent-color)";
            watermarkElement.style.backgroundClip = "text";
            watermarkElement.style.webkitFontSmoothing = "antialiased";
            watermarkElement.style.webkitTextFillColor = "transparent";
            document.body.appendChild(watermarkElement);
        }

        document.querySelector(".dadaos-overlay-title").style.display = "flex";
    }

    onDisable() {
        document.querySelector(".dadaos-overlay-title").style.display = "none";
    }
};