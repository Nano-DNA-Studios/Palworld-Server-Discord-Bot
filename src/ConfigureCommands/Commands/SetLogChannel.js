"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ConfigureScriptsEnum_1 = __importDefault(require("../ConfigureScriptsEnum"));
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const discord_js_1 = require("discord.js");
const DefaultCommandHandler_1 = __importDefault(require("../../DefaultCommandHandler"));
const SetLogChannel = {
    CommandName: ConfigureScriptsEnum_1.default.SetLogChannel,
    CommandDescription: "Sets the Discord Text Channel to send Bot and Server Logs to",
    CommandFunction: (interaction, BotDataManager) => {
        const logChannel = interaction.options.getChannel('logchannel');
        if (logChannel && logChannel instanceof discord_js_1.TextChannel) {
            if (logChannel)
                BotDataManager.SetLogChannelID(logChannel.id);
            else
                throw new Error("Log Channel ID provided does not match to a Text Channel");
        }
        else
            throw new Error("Log Channel provided is not a Text Channel");
    },
    ReplyMessage: "Log Channel is being set :arrows_clockwise:",
    LogMessage: "Log Channel is being set :arrows_clockwise:",
    ErrorMessage: ":warning: Could not set the Log Channel, the Channel provided is not Text Channel :warning:",
    SuccessMessage: ":white_check_mark: Log Channel has been set Successfully :white_check_mark:",
    FailMessages: [],
    Options: [
        {
            type: CommandOptionTypes_1.default.Channel,
            name: "logchannel",
            description: "Channel ID to send Bot and Server Logs to",
            required: true
        }
    ],
    CommandHandler: DefaultCommandHandler_1.default.Instance()
};
module.exports = SetLogChannel;
