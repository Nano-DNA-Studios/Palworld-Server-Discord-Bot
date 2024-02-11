import IBashCommand from "./IBashCommand";
import ICommandOption from "../ICommandOption";

/**
 * Class representing a Bash Script 
 */
class BashScript implements IBashCommand
{
    public CommandName : string;
    public CommandDescription : string;
    public CustomCode : string;
    public Tag : string;
    public SubCommands : string[];
    public ReplyMessage : string;
    public LogMessage : string;
    public ErrorMessage : string;
    public SuccessMessage : string;
    public FailMessages : string[];
    public Options: ICommandOption[];

    /**
     * Initializes the Bash Script
     * @param data
     */
    constructor(data : IBashCommand)
    {
        this.CommandName = data.CommandName;
        this.CommandDescription = data.CommandDescription;
        this.CustomCode = data.CustomCode;
        this.Tag = data.Tag;
        this.SubCommands = data.SubCommands;
        this.ReplyMessage = data.ReplyMessage;
        this.LogMessage = data.LogMessage;
        this.ErrorMessage = data.ErrorMessage;
        this.SuccessMessage = data.SuccessMessage;
        this.FailMessages = data.FailMessages;
        this.Options = data.Options;
    }

    /**
     * Gets the Bash Script code to run
     * @returns The Bash Script that will run for the command
     */
    GetCode() : string
    {
        return this.CustomCode.replace('\t', '');
    }

}

export = BashScript;