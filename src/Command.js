"use strict";
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
        this.UsesCustomCommandHandler = data.UsesCustomCommandHandler;
        this.CustomCommandHandler = data.CustomCommandHandler;
    }
    /**
     * Runs the Discord Command
     * @param dataManager Instance of the DataManager
     * @param interaction Instance of the ChatInputCommandInteraction
     */
    RunCommand(dataManager, interaction, client) {
        if (this.UsesCustomCommandHandler)
            this.CustomCommandHandler(dataManager, interaction, client);
        else
            this.CommandFunction(dataManager, interaction);
    }
}
module.exports = Command;
