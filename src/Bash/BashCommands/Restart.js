"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = require("../BashCommandHandler");
const Restart = {
    CommandName: BashScriptsEnum_1.default.Restart,
    CommandDescription: 'Restarts the server',
    CustomCode: `sleep 10`,
    Tag: BashScriptsEnum_1.default.Restart,
    CommandFunction: () => { console.log("Ping Command Executed"); },
    SubCommands: [BashScriptsEnum_1.default.Shutdown, BashScriptsEnum_1.default.Backup, BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Start, BashScriptsEnum_1.default.Ping],
    ReplyMessage: 'Server is Restarting :arrows_clockwise:',
    LogMessage: 'Server is being Restarted :arrows_clockwise:',
    ErrorMessage: ':warning: Server could not be Restarted :warning:',
    SuccessMessage: ':white_check_mark: Server has been Restarted :white_check_mark:',
    FailMessages: [],
    Options: [],
    MaxOutTimer: 5000,
    UsesCustomCommandHandler: true,
    CustomCommandHandler: BashCommandHandler_1.HandleBashCommand
};
module.exports = Restart;
