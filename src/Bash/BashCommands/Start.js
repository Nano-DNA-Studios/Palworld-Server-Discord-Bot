"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = require("../BashCommandHandler");
//Start works
const Start = {
    CommandName: BashScriptsEnum_1.default.Start,
    CommandDescription: "Starts the Server",
    CustomCode: `
nohup ./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &

sleep 3

exit
`,
    CommandFunction: () => { console.log("Ping Command Executed"); },
    SubCommands: [BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Ping],
    ReplyMessage: "Server is Starting :arrows_clockwise:",
    LogMessage: "Server is Starting :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Start :warning:",
    SuccessMessage: ":white_check_mark: Server has been Started :white_check_mark:",
    FailMessages: [],
    Options: [],
    MaxOutTimer: 5000,
    UsesCustomCommandHandler: true,
    CustomCommandHandler: BashCommandHandler_1.HandleBashCommand
};
module.exports = Start;
