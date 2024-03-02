"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const dna_discord_framework_1 = require("dna-discord-framework");
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
const BashScript_1 = __importDefault(require("../BashScript"));
class Shutdown extends BashScript_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BashScriptsEnum_1.default.Shutdown;
        this.CommandDescription = "Stops the server";
        this.CustomCode = `
pkill "${dna_discord_framework_1.BotData.Instance(PalworldBotDataManager_1.default).SERVER_START_SCRIPT}"

killall "${dna_discord_framework_1.BotData.Instance(PalworldBotDataManager_1.default).SERVER_PROCESS_NAME}"

killall "steamcmd"

sleep 10
  `;
        this.CommandFunction = () => { console.log("Ping Command Executed"); };
        this.SubCommands = [BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Ping];
        this.ReplyMessage = "Server is Shutting Down :arrows_clockwise:";
        this.LogMessage = "Server is being Shut Down :arrows_clockwise:";
        this.ErrorMessage = ":warning: Server could not be Shut Down :warning:";
        this.SuccessMessage = ":white_check_mark: Server has been Shut Down :white_check_mark:";
        this.FailMessages = [];
        this.Options = [];
        this.MaxOutTimer = 0;
        this.CommandHandler = BashCommandHandler_1.default.Instance();
    }
}
;
module.exports = Shutdown;
