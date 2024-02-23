"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCommandHandler_1 = __importDefault(require("./DefaultCommandHandler"));
/**
 * Represents a Command for a Discord Bot
 */
class Command {
    /**
     * Initializes the Command
     * @param data
     */
    constructor(data) {
        this.CommandName = data.CommandName;
        this.CommandDescription = data.CommandDescription;
        this.CommandFunction = data.CommandFunction;
        this.ReplyMessage = data.ReplyMessage;
        this.LogMessage = data.LogMessage;
        this.ErrorMessage = data.ErrorMessage;
        this.SuccessMessage = data.SuccessMessage;
        this.FailMessages = data.FailMessages;
        this.Options = data.Options;
        this.CommandHandler = data.CommandHandler;
    }
    /**
     * Runs the Discord Command
     * @param BotDataManager Instance of the BotDataManager
     * @param interaction Instance of the ChatInputCommandInteraction
     */
    RunCommand(dataManager, interaction, client) {
        this.CommandFunction(interaction, dataManager);
    }
    /**
     * Gets an Empty Command that can be used as a default
     * @returns Returns an Empty Command
     */
    static GetEmptyCommand() {
        let UndefinedBashScript = {
            CommandName: "undefined",
            CommandDescription: "",
            CommandFunction: () => { },
            ReplyMessage: " ",
            LogMessage: " ",
            ErrorMessage: " ",
            SuccessMessage: " ",
            FailMessages: [''],
            Options: [],
            CommandHandler: new DefaultCommandHandler_1.default(),
        };
        return UndefinedBashScript;
    }
}
exports.default = Command;
