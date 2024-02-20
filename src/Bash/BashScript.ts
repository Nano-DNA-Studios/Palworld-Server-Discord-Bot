import IBashCommand from "./IBashCommand";
import ICommandOption from "../ICommandOption";
import DataManager from "../DataManager";
import { CacheType, ChatInputCommandInteraction, Client} from 'discord.js';

/**
 * Class representing a Bash Script 
 */
class BashScript implements IBashCommand {
    public CommandName: string;
    public CommandDescription: string;
    public CustomCode: string;
    public Tag: string;
    public CommandFunction: (dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>) => void;
    public SubCommands: string[];
    public ReplyMessage: string;
    public LogMessage: string;
    public ErrorMessage: string;
    public SuccessMessage: string;
    public FailMessages: string[];
    public Options: ICommandOption[];
    public MaxOutTimer: number;
    public UsesCustomCommandHandler: boolean;
    public CustomCommandHandler: (dataManager : DataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client) => Promise<void>;

    /**
     * Initializes the Bash Script
     * @param data
     */
    constructor(data: IBashCommand) {
        this.CommandName = data.CommandName;
        this.CommandDescription = data.CommandDescription;
        this.CustomCode = data.CustomCode;
        this.Tag = data.Tag;
        this.CommandFunction = data.CommandFunction;
        this.SubCommands = data.SubCommands;
        this.ReplyMessage = data.ReplyMessage;
        this.LogMessage = data.LogMessage;
        this.ErrorMessage = data.ErrorMessage;
        this.SuccessMessage = data.SuccessMessage;
        this.FailMessages = data.FailMessages;
        this.Options = data.Options;
        this.MaxOutTimer = data.MaxOutTimer;
        this.UsesCustomCommandHandler = data.UsesCustomCommandHandler;
        this.CustomCommandHandler = data.CustomCommandHandler;
    }

    /**
     * Gets the Bash Script code to run
     * @returns The Bash Script that will run for the command
     */
    GetCode(): string {
        return this.CustomCode.replace('\t', '');
    }

    RunCommand(dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>): void {
        this.CommandFunction(dataManager, interaction);
    }

    /**
     * Determines if the Bash Script has a Max Out Timer
     * @returns True if the Bash Script has a Max Out Timer more than 0, False if it is less
     */
    public HasMaxOutTimer() : boolean
    {
        if (this.MaxOutTimer > 0)
            return true;
        else
            return false;
    }

}

export = BashScript;