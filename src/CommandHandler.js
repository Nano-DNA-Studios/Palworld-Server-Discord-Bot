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
const CommandFactory_1 = __importDefault(require("./CommandFactory"));
const Command = require("./Command");
//Handles the Command inputted by the user
function HandleCommand(interaction, client, dataManager) {
    return __awaiter(this, void 0, void 0, function* () {
        let Factory = new CommandFactory_1.default(interaction.commandName, dataManager);
        let command = Factory.CreateCommand(Command);
        let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;
        if (command.UsesCustomCommandHandler)
            command.CustomCommandHandler(dataManager, interaction, client);
        else {
            const Response = yield interaction.reply({ content: ResponseMessage, ephemeral: true });
            const logChannel = client.channels.cache.get(`${process.env.LOG_CHANNEL_ID}`);
            try {
                logChannel.send(command.LogMessage);
                ResponseMessage += `${command.LogMessage} \n`;
                command.RunCommand(dataManager, interaction, client);
                logChannel.send(command.SuccessMessage);
                ResponseMessage += `${command.SuccessMessage} \n`;
                Response.edit({ content: ResponseMessage });
            }
            catch (error) {
                logChannel.send(command.ErrorMessage);
                ResponseMessage += `${command.ErrorMessage} \n`;
                Response.edit({ content: ResponseMessage });
            }
        }
    });
}
module.exports = HandleCommand;
