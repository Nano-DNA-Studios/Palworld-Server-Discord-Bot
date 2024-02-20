import IDiscordCommand = require("./IDiscordCommand");
import DataManager = require("./DataManager");
import { CacheType, ChatInputCommandInteraction, Client} from 'discord.js';

/**
 * Describes the structure of a command for a Discord Bot
 */
interface ICommand extends IDiscordCommand{

    /**
     * The tag associated with the command.
     */
    Tag: string;

    /**
     * The message to reply with when the command is executed successfully.
     */
    ReplyMessage: string;

    /**
     * Function that is executed when the command is run
     * @param dataManager DataManager that contains all Bot Settings
     * @param interaction Interaction instance that triggered running the command
     * @returns void
     */
    CommandFunction: (dataManager : DataManager, interaction: ChatInputCommandInteraction<CacheType>) => void;

    /**
     * The message to log when the command is executed.
     */
    LogMessage: string;

    /**
     * The error message to display when the command fails.
     */
    ErrorMessage: string;

    /**
     * The success message to display when the command succeeds.
     */
    SuccessMessage: string;

    /**
     * The array of fail messages to display when the command fails.
     */
    FailMessages: string[];

    /**
     * Boolean Determining if the command uses a custom command handler
     */
    UsesCustomCommandHandler: boolean;

    /**
     * The Custom Command Handler for the command
     * @param dataManager Data Manager that contains all Bot Settings
     * @param interaction Interaction instance that triggered running the command
     * @returns Nothing
     */
    CustomCommandHandler: (dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client) => Promise<void>;
}

export = ICommand;