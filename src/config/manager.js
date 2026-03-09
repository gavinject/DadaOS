export default {
    config: JSON.parse(localStorage["dadaos-config"] || `{
        "modules": {
            "Arraylist": { "isEnabled": true },
            "Watermark": { "isEnabled": true }
        }
    }`),
    update() {
        localStorage["dadaos-config"] = JSON.stringify(this.config);
    }
}