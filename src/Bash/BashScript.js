"use strict";
/**
 * Class representing a Bash Script
 */
class BashScript {
    /**
     * Initializes the Bash Script
     * @param data
     */
    constructor(data) {
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
    GetCode() {
        return this.CustomCode.replace('\t', '');
    }
    RunCommand(dataManager, interaction) {
        this.CommandFunction(dataManager, interaction);
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
module.exports = BashScript;
