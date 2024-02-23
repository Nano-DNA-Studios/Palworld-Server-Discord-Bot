"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ssh2_1 = require("ssh2");
class BashScriptRunner {
    constructor(bashCommand, dataManager) {
        this._scriptRanSuccessfully = true;
        this._dataManager = dataManager;
        this.BashCommand = bashCommand;
    }
    DetermineError(data) {
        let Fails = this.BashCommand.FailMessages;
        let dataStr = data.toString().replace(/\r?\n|\r/g, "");
        if (Fails.includes(dataStr)) {
            this._scriptRanSuccessfully = false;
        }
    }
    RunBashScript() {
        return __awaiter(this, void 0, void 0, function* () {
            this._scriptRanSuccessfully = true;
            const ServerConnection = yield this.ConnectToServer();
            const Script = yield this.BashCommand.GetCode();
            return new Promise((resolve, reject) => {
                ServerConnection.exec(`${Script}`, (err, stream) => {
                    if (err)
                        throw err;
                    let dataBuffer = "";
                    if (this.BashCommand.HasMaxOutTimer()) {
                        console.log("Max Timeout Set");
                        setTimeout(() => {
                            console.log("Max Timeout Reached");
                            resolve(this._scriptRanSuccessfully);
                            stream.end();
                        }, this.BashCommand.MaxOutTimer);
                    }
                    stream
                        .on("close", (code, signal) => {
                        resolve(this._scriptRanSuccessfully);
                    })
                        .on("data", (data) => {
                        dataBuffer += data;
                        console.log("STDOUT: " + data);
                        this.DetermineError(data);
                    })
                        .stderr.on("data", (data) => {
                        console.error("STDERR: " + data);
                        this.DetermineError(data);
                    });
                });
            });
        });
    }
    ConnectToServer() {
        return new Promise((resolve, reject) => {
            const conn = new ssh2_1.Client();
            conn.on('ready', () => {
                console.log('SSH Connection ready');
                resolve(conn); // Resolve with the connection instance
            }).on('error', (err) => {
                console.error('SSH Connection error:', err);
                reject(err);
            }).connect({
                host: this._dataManager.SERVER_IP,
                port: parseInt(this._dataManager.SERVER_PORT),
                username: this._dataManager.SERVER_USER,
                password: this._dataManager.SERVER_PASSWORD
            });
        });
    }
}
exports.default = BashScriptRunner;
