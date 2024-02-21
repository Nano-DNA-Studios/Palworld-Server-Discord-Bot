import ICommand from "./ICommand";
import ICommandOption from "./ICommandOption";
import DataManager from "./DataManager";
import { CacheType, ChatInputCommandInteraction, Client} from 'discord.js';

/**
 * Represents a Command for a Discord Bot
 */
class Command implements ICommand {
    public CommandName: string;
    public CommandDescription: string;
    public CommandFunction: (dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>) => void;
    public ReplyMessage: string;
    public LogMessage: string;
    public ErrorMessage: string;
    public SuccessMessage: string;
    public FailMessages: string[];
    public Options: ICommandOption[];
    public UsesCustomCommandHandler: boolean;
    public CustomCommandHandler: (dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client) => Promise<void>;

    /**
     * Initializes the Command
     * @param data
     */
    constructor(data: ICommand) {
        this.CommandName = data.CommandName;
        this.CommandDescription = data.CommandDescription;
        this.CommandFunction = data.CommandFunction;
        this.ReplyMessage = data.ReplyMessage;
        this.LogMessage = data.LogMessage;
        this.ErrorMessage = data.ErrorMessage;
        this.SuccessMessage = data.SuccessMessage;
        this.FailMessages = data.FailMessages;
        this.Options = data.Options;
        this.UsesCustomCommandHandler = data.UsesCustomCommandHandler;
        this.CustomCommandHandler = data.CustomCommandHandler;
    }

    /**
     * Runs the Discord Command
     * @param dataManager Instance of the DataManager
     * @param interaction Instance of the ChatInputCommandInteraction
     */
    RunCommand(dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client): void {
        if (this.UsesCustomCommandHandler)
            this.CustomCommandHandler(dataManager, interaction, client);
        else
            this.CommandFunction(dataManager, interaction);

    }

}

export = Command;