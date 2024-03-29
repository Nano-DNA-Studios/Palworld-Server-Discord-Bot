import { ChatInputCommandInteraction, CacheType } from "discord.js";
import ConfigureScriptsEnum from "../ConfigureScriptsEnum";
import PalworldBotDataManager from "../../PalworldBotDataManager";
import OptionTypes from "dna-discord-framework/src/Bot/OptionTypes";
import Command from "dna-discord-framework/src/Bot/Command";
import ICommand from "dna-discord-framework/src/Bot/ICommand";
import DefaultCommandHandler from "dna-discord-framework/src/Bot/DefaultCommandHandler";
import BotDataManager from "dna-discord-framework/src/Bot/BotDataManager";

/**
 * Sets the Install Directory for the SteamCMD Application
 */
class SetInstallDir extends Command implements ICommand {
    CommandName = ConfigureScriptsEnum.SetInstallDirectory;
    CommandDescription = "Sets the SteamCMD Install Directory for the Bot to use";
    CommandFunction = (interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => {
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

            (BotDataManager as PalworldBotDataManager).SetSteamInstallDir(accountPath, path);

        } else
            throw new Error("Operating System, User or Install Path not provided");
    };
    ReplyMessage = "Steam Install Directory is being set :arrows_clockwise:";
    LogMessage = "Steam Install Directory is being set :arrows_clockwise:";
    ErrorMessage = ":warning: Could not set the Steam Install Directory :warning:";
    SuccessMessage = ":white_check_mark: Steam Install Directory set Successfully :white_check_mark:";
    FailMessages = [];
    Options = [
        {
            type: OptionTypes.String,
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
            type: OptionTypes.String,
            name: "user",
            description: "User hosting the Server",
            required: true
        },
        {
            type: OptionTypes.String,
            name: "installpath",
            description: "Path to the SteamCMD Install Directory",
            required: true
        }
    ];
    CommandHandler = DefaultCommandHandler.Instance();
}

export = SetInstallDir;