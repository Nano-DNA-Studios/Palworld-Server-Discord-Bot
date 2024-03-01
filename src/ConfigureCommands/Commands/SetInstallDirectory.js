"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const OptionTypes_1 = __importDefault(require("dna-discord-framework/src/Bot/OptionTypes"));
const Command_1 = __importDefault(require("dna-discord-framework/src/Bot/Command"));
const DefaultCommandHandler_1 = __importDefault(require("dna-discord-framework/src/Bot/DefaultCommandHandler"));
/**
 * Sets the Install Directory for the SteamCMD Application
 */
class SetInstallDir extends Command_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = ConfigureScriptsEnum_1.default.SetInstallDirectory;
        this.CommandDescription = "Sets the SteamCMD Install Directory for the Bot to use";
        this.CommandFunction = (interaction, BotDataManager) => {
            const operatingSystem = interaction.options.getString('operatingsystem');
            const user = interaction.options.getString('user');
            const installPath = interaction.options.getString('installpath');
            if (operatingSystem && user && installPath) {
                let path = "";
                let accountPath = "";
                if (operatingSystem === "Windows")
                    accountPath = `C:\\Users\\${user}\\`;
                else if (operatingSystem === "Linux")
                    accountPath = `/home/${user}/`;
                path = installPath;
                BotDataManager.SetSteamInstallDir(accountPath, path);
            }
            else
                throw new Error("Operating System, User or Install Path not provided");
        };
        this.ReplyMessage = "Steam Install Directory is being set :arrows_clockwise:";
        this.LogMessage = "Steam Install Directory is being set :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not set the Steam Install Directory :warning:";
        this.SuccessMessage = ":white_check_mark: Steam Install Directory set Successfully :white_check_mark:";
        this.FailMessages = [];
        this.Options = [
            {
                type: OptionTypes_1.default.String,
                name: "operatingsystem",
                description: "Operating System of the Server (Windows/Linux)",
                required: true,
                choices: [
                    {
                        name: 'Windows',
                        value: 'Windows',
                    },
                    {
                        name: 'Linux',
                        value: 'Linux',
                    }
                ]
            },
            {
                type: OptionTypes_1.default.String,
                name: "user",
                description: "User hosting the Server",
                required: true
            },
            {
                type: OptionTypes_1.default.String,
                name: "installpath",
                description: "Path to the SteamCMD Install Directory",
                required: true
            }
        ];
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
    }
}
module.exports = SetInstallDir;
