"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmptyCustomCommandHandler_1 = __importDefault(require("./EmptyCustomCommandHandler"));
const FileSearch_1 = __importDefault(require("./FileSearch"));
/**
 * Command Factory for creating new Instances of a Command based off the Command Name provided
 */
class CommandFactory {
    /**
     * Initializes the Command Factory
     * @param commandName The name of the command
     */
    constructor(commandName, dataManager) {
        this._commandName = commandName;
        this._fileSearch = new FileSearch_1.default(dataManager);
    }
    /**
     * Gets the Command Interface based off the Command Name
     * @returns Returns a IT instance of the Command being run
     */
    GetCommandInterface() {
        try {
            const Commands = this._fileSearch.GetAllCommands();
            for (const command of Commands) {
                if (command.CommandName === this._commandName)
                    return command;
            }
        }
        catch (err) {
            console.log("Unable to scan directory: " + err);
        }
        return this.GetUndefinedCommand();
    }
    /**
     * Gets an undefined ICommand Object
     * @returns Returns an ICommand Object that is undefined
     */
    GetUndefinedCommand() {
        let UndefinedBashScript = {
            CommandName: "undefined",
            CommandDescription: "",
            CommandFunction: () => { },
            Tag: "undefined",
            ReplyMessage: " ",
            LogMessage: " ",
            ErrorMessage: " ",
            SuccessMessage: " ",
            FailMessages: [''],
            Options: [],
            UsesCustomCommandHandler: false,
            CustomCommandHandler: EmptyCustomCommandHandler_1.default,
        };
        return UndefinedBashScript;
    }
    /**
     * Creates an Instance of the Command
     * @param CommandType The Class Type of the Command that will be created. Must have a constructor that takes a single parameter of the Command Interface
     * @returns A New Instance of the Command Requested
     */
    CreateCommand(CommandType) {
        const commandInterface = this.GetCommandInterface();
        if (!commandInterface) {
            throw new Error("CommandInterface is undefined");
        }
        return new CommandType(commandInterface);
    }
}
exports.default = CommandFactory;
