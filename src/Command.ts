import ICommand from "./ICommand";
import ICommandOption from "./ICommandOption";
import BotDataManager from "./BotDataManager";
import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import ICommandHandler from "./ICommandHandler";
import DefaultCommandHandler from "./DefaultCommandHandler";

/**
 * Represents a Command for a Discord Bot
 */
class Command implements ICommand {
    public CommandName: string;
    public CommandDescription: string;
    public CommandFunction: ( interaction: ChatInputCommandInteraction<CacheType>, BotDataManager: BotDataManager) => void;
    public ReplyMessage: string;
    public LogMessage: string;
    public ErrorMessage: string;
    public SuccessMessage: string;
    public FailMessages: string[];
    public Options: ICommandOption[];
    public CommandHandler: ICommandHandler;

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
        this.CommandHandler = data.CommandHandler;
    }

    /**
     * Runs the Discord Command
     * @param BotDataManager Instance of the BotDataManager
     * @param interaction Instance of the ChatInputCommandInteraction
     */
    RunCommand(dataManager: BotDataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client): void {
        this.CommandFunction(interaction, dataManager);
    }

    /**
     * Gets an Empty Command that can be used as a default
     * @returns Returns an Empty Command
     */
    public static GetEmptyCommand(): ICommand {
        let UndefinedBashScript: ICommand = {
            CommandName: "undefined",
            CommandDescription: "",
            CommandFunction: () => { },
            ReplyMessage: " ",
            LogMessage: " ",
            ErrorMessage: " ",
            SuccessMessage: " ",
            FailMessages: [''],
            Options: [],
            CommandHandler: new DefaultCommandHandler(),
        };

        return UndefinedBashScript;
    }

}

export default Command;