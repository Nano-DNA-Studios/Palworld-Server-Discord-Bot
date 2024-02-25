"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const DefaultCommandHandler_1 = __importDefault(require("../../DefaultCommandHandler"));
const SetInstallDir = {
    CommandName: ConfigureScriptsEnum_1.default.SetInstallDirectory,
    CommandDescription: "Sets the SteamCMD Install Directory for the Bot to use",
    CommandFunction: (interaction, BotDataManager) => {
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
    },
    ReplyMessage: "Steam Install Directory is being set :arrows_clockwise:",
    LogMessage: "Steam Install Directory is being set :arrows_clockwise:",
    ErrorMessage: ":warning: Could not set the Steam Install Directory :warning:",
    SuccessMessage: ":white_check_mark: Steam Install Directory set Successfully :white_check_mark:",
    FailMessages: [],
    Options: [
        {
            type: CommandOptionTypes_1.default.String,
            name: "operatingsystem",
            description: "Operating System of the Server (Windows/Linux)",
            required: true,
            choices: [
                {
                    name: 'windows',
                    value: 'windows',
                },
                {
                    name: 'linux',
                    value: 'linux',
                }
            ]
        },
        {
            type: CommandOptionTypes_1.default.String,
            name: "user",
            description: "User hosting the Server",
            required: true
        },
        {
            type: CommandOptionTypes_1.default.String,
            name: "installpath",
            description: "Path to the SteamCMD Install Directory",
            required: true
        }
    ],
    CommandHandler: DefaultCommandHandler_1.default.Instance()
};
module.exports = SetInstallDir;
