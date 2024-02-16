import ICommand = require("../ICommand");

/**
 * Describes the structure of a bash command
 */
interface IBashCommand extends ICommand
{
    /**
     * The bash code to be executed
     */
    CustomCode: string;

    /**
     * The subcommands of the bash command
     */
    SubCommands: string[];
}

export = IBashCommand;