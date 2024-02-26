import ICommand from "./ICommand";
import FileSearch from "./FileSearch";
import Command from "./Command";

/**
 * Command Factory for creating new Instances of a Command based off the Command Name provided
 */
class CommandFactory {
    /**
     * The name of the Command to be created
     */
    private _commandName: string;

    /**
     * Instance of the FileSearch
     */
    private _fileSearch: FileSearch;

    /**
     * Initializes the Command Factory
     * @param commandName The name of the command
     */
    constructor(commandName: string) {
        this._commandName = commandName;
        this._fileSearch = new FileSearch();
    }

    /**
     * Gets the Command Interface based off the Command Name
     * @returns Returns a IT instance of the Command being run
     */
    private GetCommandInterface<T extends ICommand>(): ICommand {
        try {
            const Commands = this._fileSearch.GetAllCommands();
            for (const command of Commands) {
                if (command.CommandName === this._commandName)
                    return new command();
            }

        } catch (err) {
            console.log("Unable to scan directory: " + err);
        }

        return Command.GetEmptyCommand();
    }

    /**
     * Creates an Instance of the Command
     * @param CommandType The Class Type of the Command that will be created. Must have a constructor that takes a single parameter of the Command Interface
     * @returns A New Instance of the Command Requested
     */
    public CreateCommand<T extends ICommand>(CommandType: { new(): T }): T | undefined {
        try {
            const Commands = this._fileSearch.GetAllCommands();
            for (const command of Commands) {
                const instance = new command();

                if (instance.CommandName === this._commandName)
                    return instance as T;
            }
        } catch (err) {
            console.log("Unable to scan directory: " + err);
        }
    }
}

export default CommandFactory;