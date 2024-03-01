"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const BotData_1 = __importDefault(require("dna-discord-framework/src/Bot/BotData"));
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
const BashScript_1 = __importDefault(require("../BashScript"));
//Start works
class Start extends BashScript_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BashScriptsEnum_1.default.Start;
        this.CommandDescription = "Starts the Server";
        this.CustomCode = `
nohup ./${BotData_1.default.Instance(PalworldBotDataManager_1.default).STEAM_INSTALL_DIR}/${BotData_1.default.Instance(PalworldBotDataManager_1.default).SERVER_START_SCRIPT} &

sleep 3

exit
`;
        this.CommandFunction = () => { console.log("Ping Command Executed"); };
        this.SubCommands = [BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Ping];
        this.ReplyMessage = "Server is Starting :arrows_clockwise:";
        this.LogMessage = "Server is Starting :arrows_clockwise:";
        this.ErrorMessage = ":warning: Server could not Start :warning:";
        this.SuccessMessage = ":white_check_mark: Server has been Started :white_check_mark:";
        this.FailMessages = [];
        this.Options = [];
        this.MaxOutTimer = 5000;
        this.CommandHandler = BashCommandHandler_1.default.Instance();
    }
}
;
module.exports = Start;
