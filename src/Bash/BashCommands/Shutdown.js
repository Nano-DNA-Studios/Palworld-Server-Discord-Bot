"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const Shutdown = {
    CommandName: BashScriptsEnum_1.default.Shutdown,
    CommandDescription: "Stops the server",
    CustomCode: `
pkill "${process.env.SERVER_START_SCRIPT}"

killall "PalServer-Linux-Test"

killall "steamcmd"

sleep 10
  `,
    Tag: BashScriptsEnum_1.default.Shutdown,
    SubCommands: [BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Ping],
    ReplyMessage: "Server is Shutting Down :arrows_clockwise:",
    LogMessage: "Server is being Shut Down :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not be Shut Down :warning:",
    SuccessMessage: ":white_check_mark: Server has been Shut Down :white_check_mark:",
    FailMessages: [],
    Options: []
};
module.exports = Shutdown;
