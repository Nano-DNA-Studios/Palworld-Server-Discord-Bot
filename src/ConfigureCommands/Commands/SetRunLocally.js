"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const dna_discord_framework_1 = require("dna-discord-framework");
class SetRunLocally extends dna_discord_framework_1.Command {
    constructor() {
        super(...arguments);
        this.CommandName = ConfigureScriptsEnum_1.default.SetRunLocally;
        this.CommandDescription = "Determines if the Server doesn't need to be SSH'd into";
        this.CommandFunction = (interaction, BotDataManager) => {
            const runLocally = interaction.options.getBoolean('runlocally');
            if (runLocally !== null && runLocally !== undefined)
                BotDataManager.SetRunLocally(runLocally);
            else
                throw new Error("Run Locally Value was not provided.");
        };
        this.ReplyMessage = "Run Locally Value is being set :arrows_clockwise:";
        this.LogMessage = "Run Locally Value is being set :arrows_clockwise:";
        this.ErrorMessage = ":warning: Could not set Run Locally Value :warning:";
        this.SuccessMessage = ":white_check_mark: Run Locally Value has been set Successfully :white_check_mark:";
        this.FailMessages = [];
        this.Options = [
            {
                type: dna_discord_framework_1.OptionTypes.Boolean,
                name: "runlocally",
                description: "Boolean to determine if the Server doesn't need to be SSH'd into",
                required: true
            }
        ];
        this.CommandHandler = dna_discord_framework_1.DefaultCommandHandler.Instance();
    }
}
module.exports = SetRunLocally;
