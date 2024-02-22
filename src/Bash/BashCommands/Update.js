"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
//Start works
const Update = {
    CommandName: BashScriptsEnum_1.default.Update,
    CommandDescription: "Updates the Server",
    CustomCode: `
steamcmd +force_install_dir ${process.env.STEAM_INSTALL_DIR} +login anonymous +app_update 2394010 validate +quit
`,
    CommandFunction: () => { console.log("Ping Command Executed"); },
    SubCommands: [BashScriptsEnum_1.default.Shutdown, BashScriptsEnum_1.default.Backup, BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Start, BashScriptsEnum_1.default.Ping],
    ReplyMessage: "Server is Updating :arrows_clockwise:",
    LogMessage: "Server is Updating :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Update :warning:",
    SuccessMessage: ":white_check_mark: Server has been Updated :white_check_mark:",
    FailMessages: [],
    Options: [],
    MaxOutTimer: 0,
    CommandHandler: BashCommandHandler_1.default.Instance()
};
module.exports = Update;
