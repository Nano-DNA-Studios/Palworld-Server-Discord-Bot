"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const DefaultCommandHandler_1 = __importDefault(require("../../DefaultCommandHandler"));
const SetSSH = {
    CommandName: ConfigureScriptsEnum_1.default.SetSSHSettings,
    CommandDescription: "Sets the SSH Settings for the Server to Login and run Bash Commands",
    CommandFunction: (interaction, dataManager) => {
        const serverIp = interaction.options.getString('serverip');
        const serverUser = interaction.options.getString('serveruser');
        const serverPort = interaction.options.getString('serverport');
        const serverPassword = interaction.options.getString('serverpassword');
        if (serverIp && serverUser && serverPort && serverPassword)
            dataManager.SetSSHSettings(serverIp, serverUser, serverPort, serverPassword);
        else
            throw new Error("Not all the SSH Settings were provided.");
    },
    ReplyMessage: "SSH Settings are being set :arrows_clockwise:",
    LogMessage: "SSH Settings are being set :arrows_clockwise:",
    ErrorMessage: ":warning: Could not set SSH Settings :warning:",
    SuccessMessage: ":white_check_mark: SSH Settings have been set :white_check_mark:",
    FailMessages: [],
    Options: [
        {
            type: CommandOptionTypes_1.default.String,
            name: "serverip",
            description: "The IP of the Server",
            required: true
        },
        {
            type: CommandOptionTypes_1.default.String,
            name: "serveruser",
            description: "The User on the Server",
            required: true
        },
        {
            type: CommandOptionTypes_1.default.String,
            name: "serverport",
            description: "The Servers Port",
            required: true
        },
        {
            type: CommandOptionTypes_1.default.String,
            name: "serverpassword",
            description: "The Password for the Server",
            required: true
        }
    ],
    CommandHandler: DefaultCommandHandler_1.default.Instance()
};
module.exports = SetSSH;
