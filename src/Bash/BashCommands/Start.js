"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
//Start works
const Start = {
    CommandName: BashScriptsEnum_1.default.Start,
    CommandDescription: "Starts the Server",
    CustomCode: `
nohup ./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &

sleep 3

exit
`,
    Tag: BashScriptsEnum_1.default.Start,
    SubCommands: [BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Ping],
    ReplyMessage: "Server is Starting :arrows_clockwise:",
    LogMessage: "Server is Starting :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Start :warning:",
    SuccessMessage: ":white_check_mark: Server has been Started :white_check_mark:",
    FailMessages: [],
    Options: []
};
module.exports = Start;
