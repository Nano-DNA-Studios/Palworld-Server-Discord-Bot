"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCommandHandler_1 = __importDefault(require("dna-discord-framework/src/Bot/DefaultCommandHandler"));
/**
 * Class representing a Bash Script
 */
class BashScript {
    constructor() {
        this.CommandName = '';
        this.CommandDescription = '';
        this.CustomCode = '';
        this.CommandFunction = () => { };
        this.SubCommands = [];
        this.ReplyMessage = '';
        this.LogMessage = '';
        this.ErrorMessage = '';
        this.SuccessMessage = '';
        this.FailMessages = [];
        this.Options = [];
        this.MaxOutTimer = 0;
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
    }
    /**
     * Initializes the Bash Script
     * @param data
     */
    /*
    constructor(data: IBashCommand) {
        this.CommandName = data.CommandName;
        this.CommandDescription = data.CommandDescription;
        this.CustomCode = data.CustomCode;
        this.CommandFunction = data.CommandFunction;
        this.SubCommands = data.SubCommands;
        this.ReplyMessage = data.ReplyMessage;
        this.LogMessage = data.LogMessage;
        this.ErrorMessage = data.ErrorMessage;
        this.SuccessMessage = data.SuccessMessage;
        this.FailMessages = data.FailMessages;
        this.Options = data.Options;
        this.MaxOutTimer = data.MaxOutTimer;
        this.CommandHandler = data.CommandHandler;
    }
    */
    /**
     * Gets the Bash Script code to run
     * @returns The Bash Script that will run for the command
     */
    GetCode() {
        return this.CustomCode.replace('\t', '');
    }
    /**
     * Runs the Discord Bash Command
     * @param BotDataManager Instance of the BotDataManager
     * @param interaction Instance of the ChatInputCommandInteraction
     */
    RunCommand(dataManager, interaction) {
        this.CommandFunction(interaction, dataManager);
    }
    /**
     * Determines if the Bash Script has a Max Out Timer
     * @returns True if the Bash Script has a Max Out Timer more than 0, False if it is less
     */
    HasMaxOutTimer() {
        if (this.MaxOutTimer > 0)
            return true;
        else
            return false;
    }
}
exports.default = BashScript;
