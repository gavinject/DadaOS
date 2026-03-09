import events from "./events";

export default {
    "wpRequire": null,
    "noa": null,
    "bloxdEvents": null,
    "sendPacket": null,
    init() {
        return new Promise((resolve) => {
            let appendHook = (name, hook) => this[name] = hook;

            let publicWebpack = (self.webpackChunkbloxd = self.webpackChunkbloxd || []);
            publicWebpack.push([[Symbol()], {}, (require) => {
                appendHook("wpRequire", require);

                this.findModule = (code) => this.wpRequire(Object.keys(this.wpRequire.m)[Object.values(this.wpRequire.m).findIndex(m => m.toString().includes(code))]);
                this.findModuleFn = (code) => Object.values(this.findModule(code)).find(m => m.toString().includes(code));

                this.bloxdEvents = Object.values(this.findModule("this.ingame")).find(prop => prop?._eventsCount);
                this.sendPacket = this.findModuleFn("push({message");

                let targetModule = this.findModule("renderTickLocalPlayer(){");
                let _renderTickLocalPlayer = targetModule.HeldItem.prototype.renderTickLocalPlayer;
                targetModule.HeldItem.prototype.renderTickLocalPlayer = function () {
                    appendHook("noa", this.noa);
                    events.emit("gameTick");
                    return _renderTickLocalPlayer.apply(this, arguments);
                }

                let _publish = this.bloxdEvents.publish;
                this.bloxdEvents.publish = function (event, data) {
                    if (event == "chat" && data.content[0].str.translationKey == "classicGame:cantAttackCloseToSpawn") {
                        return;
                    }
                    return _publish.apply(this, arguments);
                }

                resolve();
            }]);
        });
    }
}