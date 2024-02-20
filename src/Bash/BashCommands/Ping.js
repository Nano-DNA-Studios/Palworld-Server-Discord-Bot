"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = require("../BashCommandHandler");
//Start works
const Ping = {
    CommandName: BashScriptsEnum_1.default.Ping,
    CommandDescription: "Pings the Server to determine if it is Online",
    CustomCode: `
pidof ${process.env.SERVER_PROCESS_NAME} && echo "Server Is Live" || echo "Server Not Live"
`,
    Tag: BashScriptsEnum_1.default.Ping,
    SubCommands: [BashScriptsEnum_1.default.Custom],
    CommandFunction: () => { console.log("Ping Command Executed"); },
    ReplyMessage: "Server is being Pinged :arrows_clockwise:",
    LogMessage: "Server is being Pinged :arrows_clockwise:",
    ErrorMessage: ":warning: Server is not Online :warning:",
    SuccessMessage: ":white_check_mark: Server is Online :white_check_mark:",
    FailMessages: ["Server Not Live"],
    Options: [],
    MaxOutTimer: 0,
    UsesCustomCommandHandler: true,
    CustomCommandHandler: BashCommandHandler_1.HandleBashCommand
};
module.exports = Ping;
