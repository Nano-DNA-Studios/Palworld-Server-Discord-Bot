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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const FileSearch_1 = require("../FileSearch"); // Adjust the import path if necessary
const BashScriptsEnum_1 = __importDefault(require("./BashScriptsEnum")); // Adjust the import if it's not a default export
const BashScript_1 = __importDefault(require("./BashScript"));
/**
 * Represents a factory for creating Bash scripts.
 */
class BashScriptFactory {
    constructor(scriptTag) {
        this.ScriptTag = scriptTag;
        const directoryPath = path.join(__dirname, "BashCommands");
        this.files = fs.readdirSync(directoryPath);
    }
    GetBashCommandObject(command) {
        try {
            const Commands = (0, FileSearch_1.GetBashCommands)();
            for (const bashCommand of Commands) {
                if (bashCommand.CommandName === command)
                    return bashCommand;
            }
        }
        catch (err) {
            console.log("Unable to scan directory: " + err);
        }
        return this.GetUndefinedBashScript();
    }
    GetUndefinedBashScript() {
        let UndefinedBashScript = {
            CommandName: "undefined",
            CommandDescription: "",
            CustomCode: ``,
            Tag: "undefined",
            SubCommands: [],
            ReplyMessage: " ",
            LogMessage: " ",
            ErrorMessage: " ",
            SuccessMessage: " ",
            FailMessages: [],
            Options: [],
        };
        return UndefinedBashScript;
    }
    GetBashScript() {
        const CommandObject = this.GetBashCommandObject(this.ScriptTag);
        if (!CommandObject) {
            throw new Error("CommandObject is undefined");
        }
        return new BashScript_1.default(CommandObject);
    }
    HasMaxOutTimer() {
        if (this.ScriptTag == BashScriptsEnum_1.default.Start) {
            console.log("Start has a max out timer");
            return true;
        }
        else {
            return false;
        }
    }
    GetFactoriesToRun() {
        let Factories = [];
        const BashAction = this.GetBashCommandObject(this.ScriptTag);
        if (!BashAction || !Array.isArray(BashAction.SubCommands)) {
            console.log(typeof (BashAction === null || BashAction === void 0 ? void 0 : BashAction.SubCommands));
            return [];
        }
        BashAction.SubCommands.forEach((commandTag) => {
            console.log(commandTag);
            if (commandTag === BashScriptsEnum_1.default.Custom) {
                Factories.push(this);
            }
            else {
                Factories.push(new BashScriptFactory(commandTag));
            }
        });
        return Factories;
    }
    GetBashScriptToRun() {
        return __awaiter(this, void 0, void 0, function* () {
            let ScriptToRun = "";
            const BashAction = this.GetBashCommandObject(this.ScriptTag);
            if (!BashAction || !Array.isArray(BashAction.SubCommands)) {
                console.log(typeof (BashAction === null || BashAction === void 0 ? void 0 : BashAction.SubCommands));
                ScriptToRun += "echo 'Something went wrong with the SubCommands'";
                return ScriptToRun;
            }
            BashAction.SubCommands.forEach((commandTag) => {
                console.log(commandTag);
                if (commandTag === BashScriptsEnum_1.default.Custom) {
                    const BashCommand = new BashScript_1.default(BashAction);
                    ScriptToRun += BashCommand.GetCode();
                }
                else {
                    const BashCommand = new BashScript_1.default(this.GetBashCommandObject(commandTag));
                    ScriptToRun += `\n ${BashCommand.GetCode()} \n`;
                }
            });
            return ScriptToRun;
        });
    }
}
module.exports = BashScriptFactory;
