import ConfigureScriptsEnum from "../ConfigureScriptsEnum";
import { ChatInputCommandInteraction, CacheType } from "discord.js";
import PalworldBotDataManager from "../../PalworldBotDataManager";
import OptionTypes from "dna-discord-framework/src/Bot/OptionTypes";
import Command from "dna-discord-framework/src/Bot/Command";
import ICommand from "dna-discord-framework/src/Bot/ICommand";
import DefaultCommandHandler from "dna-discord-framework/src/Bot/DefaultCommandHandler";
import BotDataManager from "dna-discord-framework/src/Bot/BotDataManager";

class SetRunLocally extends Command implements ICommand {
    CommandName = ConfigureScriptsEnum.SetRunLocally;
    CommandDescription = "Determines if the Server doesn't need to be SSH'd into";
    CommandFunction = (interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => {

        const runLocally = interaction.options.getBoolean('runlocally');

        if (runLocally !== null && runLocally !== undefined)
            (BotDataManager as PalworldBotDataManager).SetRunLocally(runLocally);
        else
            throw new Error("Run Locally Value was not provided.");

    };
    ReplyMessage = "Run Locally Value is being set :arrows_clockwise:";
    LogMessage = "Run Locally Value is being set :arrows_clockwise:";
    ErrorMessage = ":warning: Could not set Run Locally Value :warning:";
    SuccessMessage = ":white_check_mark: Run Locally Value has been set Successfully :white_check_mark:";
    FailMessages = [];
    Options = [
        {
            type: OptionTypes.Boolean,
            name: "runlocally",
            description: "Boolean to determine if the Server doesn't need to be SSH'd into",
            required: true
        }
    ];
    CommandHandler = DefaultCommandHandler.Instance();
}

export = SetRunLocally;