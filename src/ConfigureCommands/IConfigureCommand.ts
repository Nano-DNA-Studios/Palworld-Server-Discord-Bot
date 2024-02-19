import ICommand = require("../ICommand");
import DataManager = require("../DataManager");
import { CacheType, ChatInputCommandInteraction} from 'discord.js';

/**
 * Describes the structure of a Configure Command
 */
interface IConfigureCommands extends ICommand
{
    /**
     * Function that is executed when the command is run
     * @param dataManager DataManager that contains all Bot Settings
     * @param interaction Interaction instance that triggered running the command
     * @returns void
     */
    RunCommand: (dataManager : DataManager, interaction: ChatInputCommandInteraction<CacheType>) => void;
}

export = IConfigureCommands;