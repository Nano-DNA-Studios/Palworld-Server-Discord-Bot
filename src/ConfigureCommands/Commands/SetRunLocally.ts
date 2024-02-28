import ICommand from "../../ICommand";
import ConfigureScriptsEnum from "../ConfigureScriptsEnum";
import OptionTypes from "../../CommandOptionTypes";
import DefaultCommandHandler from "../../DefaultCommandHandler";
import Command from "../../Command";
import { ChatInputCommandInteraction, CacheType } from "discord.js";
import PalworldBotDataManager from "../../PalworldBotDataManager";

class SetRunLocally extends Command implements ICommand {
    CommandName = ConfigureScriptsEnum.SetRunLocally;
    CommandDescription = "Determines if the Server doesn't need to be SSH'd into";
    CommandFunction = (interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: PalworldBotDataManager) => {

        const runLocally = interaction.options.getBoolean('runlocally');

        if (runLocally !== null && runLocally !== undefined)
            BotDataManager.SetRunLocally(runLocally);
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