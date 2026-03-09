import configManager from "./config/manager";
import moduleManager from "./module/moduleManager";
import events from "./events";
import gameUtils from './utils/gameUtils';
import hooks from "./hooks"
import mathUtils from "./utils/mathUtils";
import packets from "./utils/packets";

class DadaOS {
    constructor() {
        this.version = "1.0.0";
        this.init();
    }

    init() {
        console.log("DadaOS: Starting initialization... (Developer: Ehan Chowdhury, Website: https://sytax.xyz)");

        setInterval(() => {
            events.emit("render");

            if (hooks.noa?.ents.getHeldItem(hooks.noa.playerEntity)?.doAttack) {
                gameUtils.doAttack = hooks.noa.ents.getHeldItem(hooks.noa.playerEntity).doAttack.bind(hooks);
            }

        }, (1000 / 60));

        // Use capture: true to ensure we catch the key before the game might consume it
        document.addEventListener("keydown", (e) => {
            events.emit("keydown", e.code);
        }, { capture: true });

        // Initialize modules immediately so GUI and basics work
        moduleManager.init();

        // Initialize hooks in the background
        hooks.init().then(() => {
            console.log("DadaOS: Hooks initialized successfully.");
            events.emit("hooks.ready");
        }).catch(err => {
            console.error("DadaOS: Failed to initialize hooks:", err);
        });

        window.gameUtils = gameUtils;
        window.mathUtils = mathUtils;
        window.hooks = hooks;
        window.packets = packets;
    }

    disable() {

    }
};

export default new DadaOS();