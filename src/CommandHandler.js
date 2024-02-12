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
exports.HandleCommand = void 0;
const BashScriptRunner_1 = __importDefault(require("./Bash/BashScriptRunner"));
const BashScriptsEnum_1 = __importDefault(require("./Bash/BashScriptsEnum"));
const BashScriptFactory_1 = __importDefault(require("./Bash/BashScriptFactory"));
//Handles the Command inputted by the user
function HandleCommand(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        //Determine if the command is a Bash Related command or a configure related command
        if (Object.values(BashScriptsEnum_1.default).includes(interaction.commandName)) {
            yield HandleBashCommand(interaction, client);
        }
        else {
            //Handle Configure command
        }
    });
}
exports.HandleCommand = HandleCommand;
function HandleBashCommand(interaction, client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Factory = new BashScriptFactory_1.default(interaction.commandName);
            const Bash = Factory.GetBashScript();
            const Factories = Factory.GetFactoriesToRun();
            let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;
            const Response = yield interaction.reply({ content: ResponseMessage, ephemeral: true });
            const logChannel = client.channels.cache.get(`${process.env.LOG_CHANNEL_ID}`);
            for (const factoryInstance of Factories) {
                const bashInstance = factoryInstance.GetBashScript();
                logChannel.send(bashInstance.LogMessage);
                ResponseMessage += `${bashInstance.LogMessage} \n`;
                try {
                    let BashResult = yield new BashScriptRunner_1.default(factoryInstance).RunBashScript();
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
