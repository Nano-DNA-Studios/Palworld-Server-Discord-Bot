"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const EmptyCustomCommandHandler_1 = __importDefault(require("../../EmptyCustomCommandHandler"));
const SetSSH = {
    CommandName: ConfigureScriptsEnum_1.default.SetSSHSettings,
    CommandDescription: "Sets the SSH Settings for the Server to Login and run Bash Commands",
    CommandFunction: (dataManager, interaction) => {
        const serverIp = interaction.options.getString('serverip');
        const serverUser = interaction.options.getString('serveruser');
        const serverPort = interaction.options.getString('serverport');
        const serverPassword = interaction.options.getString('serverpassword');
        if (serverIp && serverUser && serverPort && serverPassword) {
            console.log("Setting Server Settings");
            dataManager.SetSSHSettings(serverIp, serverUser, serverPort, serverPassword);
        }
        else {
            console.log("Not all options were provided.");
        }
    },
    Tag: ConfigureScriptsEnum_1.default.SetSSHSettings,
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
    UsesCustomCommandHandler: false,
    CustomCommandHandler: EmptyCustomCommandHandler_1.default
};
module.exports = SetSSH;
