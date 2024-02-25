"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const BotData_1 = __importDefault(require("../../BotData"));
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
//Start works
const Start = {
    CommandName: BashScriptsEnum_1.default.Start,
    CommandDescription: "Starts the Server",
    CustomCode: `
nohup ./${BotData_1.default.Instance(PalworldBotDataManager_1.default).STEAM_INSTALL_DIR}/${BotData_1.default.Instance(PalworldBotDataManager_1.default).SERVER_START_SCRIPT} &

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
    CommandHandler: BashCommandHandler_1.default.Instance()
};
module.exports = Start;
