"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const BashScript_1 = __importDefault(require("../BashScript"));
class Restart extends BashScript_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BashScriptsEnum_1.default.Restart;
        this.CommandDescription = 'Restarts the server';
        this.CustomCode = `sleep 10`;
        this.CommandFunction = () => { console.log("Ping Command Executed"); };
        this.SubCommands = [BashScriptsEnum_1.default.Shutdown, BashScriptsEnum_1.default.Backup, BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Start, BashScriptsEnum_1.default.Ping];
        this.ReplyMessage = 'Server is Restarting :arrows_clockwise:';
        this.LogMessage = 'Server is being Restarted :arrows_clockwise:';
        this.ErrorMessage = ':warning: Server could not be Restarted :warning:';
        this.SuccessMessage = ':white_check_mark: Server has been Restarted :white_check_mark:';
        this.FailMessages = [];
        this.Options = [];
        this.MaxOutTimer = 5000;
        this.CommandHandler = BashCommandHandler_1.default.Instance();
    }
}
module.exports = Restart;
