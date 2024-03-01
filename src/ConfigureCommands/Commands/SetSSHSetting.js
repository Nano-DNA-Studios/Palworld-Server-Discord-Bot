"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const dna_discord_framework_1 = require("dna-discord-framework");
class SetSSH extends dna_discord_framework_1.Command {
    constructor() {
        super(...arguments);
        this.CommandName = ConfigureScriptsEnum_1.default.SetSSHSettings;
        this.CommandDescription = "Sets the SSH Settings for the Server to Login and run Bash Commands";
        this.CommandFunction = (interaction, BotDataManager) => {
            const serverIp = interaction.options.getString('serverip');
            const serverUser = interaction.options.getString('serveruser');
            const serverPort = interaction.options.getString('serverport');
            const serverPassword = interaction.options.getString('serverpassword');
            if (serverIp && serverUser && serverPort && serverPassword)
                BotDataManager.SetSSHSettings(serverIp, serverUser, serverPort, serverPassword);
            else
                throw new Error("Not all the SSH Settings were provided.");
        };
        this.ReplyMessage = "SSH Settings are being set :arrows_clockwise:";
        this.LogMessage = "SSH Settings are being set :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not set SSH Settings :warning:";
        this.SuccessMessage = ":white_check_mark: SSH Settings have been set :white_check_mark:";
        this.FailMessages = [];
        this.Options = [
            {
                type: dna_discord_framework_1.OptionTypes.String,
                name: "serverip",
                description: "The IP of the Server",
                required: true
            },
            {
                type: dna_discord_framework_1.OptionTypes.String,
                name: "serveruser",
                description: "The User on the Server",
                required: true
            },
            {
                type: dna_discord_framework_1.OptionTypes.String,
                name: "serverport",
                description: "The Servers Port",
                required: true
            },
            {
                type: dna_discord_framework_1.OptionTypes.String,
                name: "serverpassword",
                description: "The Password for the Server",
                required: true
            }
        ];
        this.CommandHandler = dna_discord_framework_1.DefaultCommandHandler.Instance();
    }
}
module.exports = SetSSH;
