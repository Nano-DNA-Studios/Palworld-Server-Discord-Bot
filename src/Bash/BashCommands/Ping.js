"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
const BashScript_1 = __importDefault(require("../BashScript"));
const dna_discord_framework_1 = require("dna-discord-framework");
//Start works
class Ping extends BashScript_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BashScriptsEnum_1.default.Ping;
        this.CommandDescription = "Pings the Server to determine if it is Online";
        this.CustomCode = `
pidof ${dna_discord_framework_1.BotData.Instance(PalworldBotDataManager_1.default).SERVER_PROCESS_NAME} && echo "Server Is Live" || echo "Server Not Live"
`;
        this.SubCommands = [BashScriptsEnum_1.default.Custom];
        this.CommandFunction = () => { console.log("Ping Command Executed"); };
        this.ReplyMessage = "Server is being Pinged :arrows_clockwise:";
        this.LogMessage = "Server is being Pinged :arrows_clockwise:";
        this.ErrorMessage = ":warning: Server is not Online :warning:";
        this.SuccessMessage = ":white_check_mark: Server is Online :white_check_mark:";
        this.FailMessages = ["Server Not Live"];
        this.Options = [];
        this.MaxOutTimer = 0;
        this.CommandHandler = BashCommandHandler_1.default.Instance();
    }
}
module.exports = Ping;
