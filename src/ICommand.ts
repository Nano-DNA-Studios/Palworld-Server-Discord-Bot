import IDiscordCommand = require("./IDiscordCommand");

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
}

export = ICommand;