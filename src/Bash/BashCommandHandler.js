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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleBashCommand = void 0;
const BashScriptRunner_1 = __importDefault(require("./BashScriptRunner"));
const CommandFactory_1 = __importDefault(require("../CommandFactory"));
const BashScript = require("./BashScript");
function HandleBashCommand(dataManager, interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Factory = new CommandFactory_1.default(interaction.commandName, dataManager);
            const Bash = Factory.CreateCommand(BashScript);
            let bashInstances = [];
            Bash.SubCommands.forEach((subCommand) => {
                let commandName = '';
                if (subCommand === "custom")
                    commandName = Bash.CommandName;
                else
                    commandName = subCommand;
                const factory = new CommandFactory_1.default(commandName, dataManager);
                const bashInstance = factory.CreateCommand(BashScript);
                bashInstances.push(bashInstance);
            });
            let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;
            const Response = yield interaction.reply({ content: ResponseMessage, ephemeral: true });
            const logChannel = client.channels.cache.get(`${process.env.LOG_CHANNEL_ID}`);
            for (const bashInstance of bashInstances) {
                logChannel.send(bashInstance.LogMessage);
                ResponseMessage += `${bashInstance.LogMessage} \n`;
                try {
                    let BashResult = yield new BashScriptRunner_1.default(bashInstance).RunBashScript();
                    if (BashResult) {
                        //Successfully Ran
                        logChannel.send(bashInstance.SuccessMessage);
                        ResponseMessage += `${bashInstance.SuccessMessage} \n`;
                        Response.edit({ content: ResponseMessage });
                    }
                    else {
                        //Failure Occurred
                        logChannel.send(bashInstance.ErrorMessage);
                        ResponseMessage += `${bashInstance.ErrorMessage} \n`;
                        Response.edit({ content: ResponseMessage });
                    }
                }
                catch (error) {
                    logChannel.send(`${Bash.ErrorMessage} \n ${error}`);
                    console.log(error);
                }
            }
        }
        catch (error) {
            console.log(`Error Occurred : ${error}`);
        }
    });
}
exports.HandleBashCommand = HandleBashCommand;
