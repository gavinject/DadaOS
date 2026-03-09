import events from "../events";
import ArrayList from "./modules/visual/Arraylist";

import gameUtils from "../utils/gameUtils";
import configManager from "../config/manager";
import hooks from "../hooks";

import ESP from "./modules/visual/ESP";
import ViewModel from "./modules/visual/ViewModel";
import Wireframe from "./modules/visual/Wireframe";
import Watermark from "./modules/visual/Watermark";
import AutoSprint from "./modules/movement/AutoSprint";
import Bhop from "./modules/movement/Bhop";

import SafeWalk from "./modules/movement/Safewalk";
import Scaffold from "./modules/movement/Scaffold";
import FastBreak from "./modules/misc/FastBreak";
import Aimbot from "./modules/combat/Aimbot";
import Killaura from "./modules/combat/Killaura";
import ClickGUI from "./modules/visual/ClickGUI";
import ItemReach from "./modules/misc/ItemReach";
import Jesus from "./modules/movement/Jesus";
import BedAura from "./modules/misc/BedAura";

import AntiBan from "./modules/misc/AntiBan";
import NoSlow from "./modules/movement/NoSlow";

import Twerk from "./modules/movement/Twerk";


export default {
    modules: {},
    addModules: function (...modules) {
        for (const module of modules) this.modules[module.name] = module;
    },
    addModule: function (module) {
        this.modules[module.name] = module;
    },
    handleKeyPress: function (key) {
        for (let name in this.modules) {
            let module = this.modules[name];

            if (module.waitingForBind) {
                module.keybind = key;
                module.waitingForBind = false;

                if (!configManager.config.modules[name]) {
                    configManager.config.modules[name] = {};
                }

                configManager.config.modules[name].keybind = key;

            } else if (module.keybind == key) {
                module.toggle();
            }
        }
    },

    init() {
        this.addModules(
            new ArrayList(),
            new ESP(),
            new ViewModel(),
            new Watermark(),
            new Wireframe(),
            new AutoSprint(),
            new Bhop(),

            new SafeWalk(),
            new Scaffold(),

            new FastBreak(),

            new Aimbot(),
            new Killaura(),
            new ClickGUI(),
            new Jesus(),
            new BedAura(),
            new AntiBan(),
            new NoSlow(),

            new Twerk(),

        );

        events.on("gameTick", () => {
            for (let name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].onGameTick();
                }
            }
        });

        events.on("render", () => {
            for (let name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].onRender();
                }
            }
        });

        events.on("keydown", this.handleKeyPress.bind(this));

        events.on("hooks.ready", () => {
            console.log("DadaOS: Hooks ready, subscribing to game events...");
            hooks.bloxdEvents.subscribe("onGameEntered", (data) => {
                for (let name in this.modules) {
                    if (this.modules[name].isEnabled) {
                        this.modules[name].onGameEntered();
                    }
                }
            });

            hooks.bloxdEvents.subscribe("onGameExited", (data) => {
                for (let name in this.modules) {
                    if (this.modules[name].isEnabled) {
                        this.modules[name].onGameExited();
                    }
                }
            });
        });
        events.on("setting.update", () => {
            for (let name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].onSettingUpdate();
                }
            }
        });


        this.modules["Arraylist"].enable();
        this.modules["Watermark"].enable();
        this.modules["AntiBan"].enable();
    }
};