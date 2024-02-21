"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const EmptyCustomCommandHandler_1 = __importDefault(require("../../EmptyCustomCommandHandler"));
const SetRunLocally = {
    CommandName: ConfigureScriptsEnum_1.default.SetRunLocally,
    CommandDescription: "Determines if the Server doesn't need to be SSH'd into",
    CommandFunction: (dataManager, interaction) => {
        const runLocally = interaction.options.getBoolean('runlocally');
        if (runLocally !== null && runLocally !== undefined) {
            dataManager.SetRunLocally(runLocally);
        }
        else {
            console.log("Not all options were provided.");
        }
    },
    Tag: ConfigureScriptsEnum_1.default.SetRunLocally,
    ReplyMessage: "Run Locally Value is being set :arrows_clockwise:",
    LogMessage: "Run Locally Value is being set :arrows_clockwise:",
    ErrorMessage: ":warning: Could not set Run Locally Value :warning:",
    SuccessMessage: ":white_check_mark: Run Locally Value has been set Successfully :white_check_mark:",
    FailMessages: [],
    Options: [
        {
            type: CommandOptionTypes_1.default.Boolean,
            name: "runlocally",
            description: "Boolean to determine if the Server doesn't need to be SSH'd into",
            required: true
        }
    ],
    UsesCustomCommandHandler: false,
    CustomCommandHandler: EmptyCustomCommandHandler_1.default
};
module.exports = SetRunLocally;
