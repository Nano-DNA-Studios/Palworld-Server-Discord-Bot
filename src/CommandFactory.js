"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileSearch_1 = __importDefault(require("./FileSearch"));
const Command_1 = __importDefault(require("./Command"));
/**
 * Command Factory for creating new Instances of a Command based off the Command Name provided
 */
class CommandFactory {
    /**
     * Initializes the Command Factory
     * @param commandName The name of the command
     */
    constructor(commandName) {
        this._commandName = commandName;
        this._fileSearch = new FileSearch_1.default();
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
                    return new command();
            }
        }
        catch (err) {
            console.log("Unable to scan directory: " + err);
        }
        return Command_1.default.GetEmptyCommand();
    }
    /**
     * Creates an Instance of the Command
     * @param CommandType The Class Type of the Command that will be created. Must have a constructor that takes a single parameter of the Command Interface
     * @returns A New Instance of the Command Requested
     */
    CreateCommand(CommandType) {
        try {
            const Commands = this._fileSearch.GetAllCommands();
            for (const command of Commands) {
                const instance = new command();
                if (instance.CommandName === this._commandName)
                    return instance;
            }
        }
        catch (err) {
            console.log("Unable to scan directory: " + err);
        }
    }
}
exports.default = CommandFactory;
