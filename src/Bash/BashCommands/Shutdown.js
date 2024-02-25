"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const BotData_1 = __importDefault(require("../../BotData"));
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
const Shutdown = {
    CommandName: BashScriptsEnum_1.default.Shutdown,
    CommandDescription: "Stops the server",
    CustomCode: `
pkill "${BotData_1.default.Instance(PalworldBotDataManager_1.default).SERVER_START_SCRIPT}"

killall "${BotData_1.default.Instance(PalworldBotDataManager_1.default).SERVER_PROCESS_NAME}"

killall "steamcmd"

sleep 10
  `,
    CommandFunction: () => { console.log("Ping Command Executed"); },
    SubCommands: [BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Ping],
    ReplyMessage: "Server is Shutting Down :arrows_clockwise:",
    LogMessage: "Server is being Shut Down :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not be Shut Down :warning:",
    SuccessMessage: ":white_check_mark: Server has been Shut Down :white_check_mark:",
    FailMessages: [],
    Options: [],
    MaxOutTimer: 0,
    CommandHandler: BashCommandHandler_1.default.Instance()
};
module.exports = Shutdown;
