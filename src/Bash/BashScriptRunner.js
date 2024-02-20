"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const ssh2_1 = require("ssh2");
dotenv.config();
class BashScriptRunner {
    constructor(bashCommand) {
        this.ScriptRanSuccessfully = true;
        this.BashCommand = bashCommand;
    }
    DetermineError(data) {
        let Fails = this.BashCommand.FailMessages;
        let dataStr = data.toString().replace(/\r?\n|\r/g, "");
        if (Fails.includes(dataStr)) {
            this.ScriptRanSuccessfully = false;
        }
    }
    RunBashScript() {
        return __awaiter(this, void 0, void 0, function* () {
            this.ScriptRanSuccessfully = true;
            const ServerConnection = yield this.ConnectToServer();
            const Script = yield this.BashCommand.GetCode();
            return new Promise((resolve, reject) => {
                ServerConnection.exec(`${Script}`, (err, stream) => {
                    if (err)
                        throw err;
                    let dataBuffer = "";
                    if (this.BashCommand.HasMaxOutTimer()) {
                        setTimeout(() => {
                            console.log("Max Timeout Reached");
                            resolve(this.ScriptRanSuccessfully);
                            stream.end();
                        }, this.BashCommand.MaxOutTimer);
                    }
                    stream
                        .on("close", (code, signal) => {
                        resolve(this.ScriptRanSuccessfully);
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
                host: process.env.SERVER_IP,
                port: parseInt(process.env.SERVER_PORT),
                username: process.env.SERVER_USER,
                password: process.env.SERVER_PASSWORD
            });
        });
    }
}
exports.default = BashScriptRunner;
