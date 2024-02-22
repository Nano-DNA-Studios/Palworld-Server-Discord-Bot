import ICommand from "./ICommand";
import DataManager from "./DataManager";
import FileSearch from "./FileSearch";
import Command from "./Command";

/**
 * Command Factory for creating new Instances of a Command based off the Command Name provided
 */
class CommandFactory<IT extends ICommand>
{
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
    constructor(commandName: string, dataManager: DataManager) {
        this._commandName = commandName;
        this._fileSearch = new FileSearch(dataManager);
    }

    /**
     * Gets the Command Interface based off the Command Name
     * @returns Returns a IT instance of the Command being run
     */
    private GetCommandInterface(): IT {
        try {
            const Commands: ICommand[] = this._fileSearch.GetAllCommands();
            for (const command of Commands) {
                if (command.CommandName === this._commandName)
                    return command as IT;
            }
        } catch (err) {
            console.log("Unable to scan directory: " + err);
        }

        return Command.GetEmptyCommand() as IT;
    }

    /**
     * Creates an Instance of the Command
     * @param CommandType The Class Type of the Command that will be created. Must have a constructor that takes a single parameter of the Command Interface
     * @returns A New Instance of the Command Requested
     */
    public CreateCommand<T extends ICommand>(CommandType: { new(commandInterface: IT): T }): T {
        const commandInterface = this.GetCommandInterface();
        if (!commandInterface) {
            throw new Error("CommandInterface is undefined");
        }

        return new CommandType(commandInterface);
    }
}

export default CommandFactory;