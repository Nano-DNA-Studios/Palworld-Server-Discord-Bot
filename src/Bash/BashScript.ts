import IBashCommand from "./IBashCommand";
import ICommandOption from "../ICommandOption";
import DataManager from "../DataManager";
import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import ICommandHandler from "../ICommandHandler";

/**
 * Class representing a Bash Script 
 */
class BashScript implements IBashCommand {
    public CommandName: string;
    public CommandDescription: string;
    public CustomCode: string;
    public CommandFunction: (interaction: ChatInputCommandInteraction<CacheType>, dataManager: DataManager) => void;
    public SubCommands: string[];
    public ReplyMessage: string;
    public LogMessage: string;
    public ErrorMessage: string;
    public SuccessMessage: string;
    public FailMessages: string[];
    public Options: ICommandOption[];
    public MaxOutTimer: number;
    public CommandHandler: ICommandHandler;

    /**
     * Initializes the Bash Script
     * @param data
     */
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

    /**
     * Gets the Bash Script code to run
     * @returns The Bash Script that will run for the command
     */
    GetCode(): string {
        return this.CustomCode.replace('\t', '');
    }

    /**
     * Runs the Discord Bash Command
     * @param dataManager Instance of the DataManager
     * @param interaction Instance of the ChatInputCommandInteraction
     */
    RunCommand(dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>): void {
        this.CommandFunction(interaction, dataManager);
    }

    /**
     * Determines if the Bash Script has a Max Out Timer
     * @returns True if the Bash Script has a Max Out Timer more than 0, False if it is less
     */
    public HasMaxOutTimer(): boolean {
        if (this.MaxOutTimer > 0)
            return true;
        else
            return false;
    }

}

export = BashScript;