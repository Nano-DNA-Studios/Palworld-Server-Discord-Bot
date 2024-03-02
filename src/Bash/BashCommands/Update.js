"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const dna_discord_framework_1 = require("dna-discord-framework");
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
const BashScript_1 = __importDefault(require("../BashScript"));
//Start works
class Update extends BashScript_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BashScriptsEnum_1.default.Update;
        this.CommandDescription = "Updates the Server";
        this.CustomCode = `
steamcmd +force_install_dir ${dna_discord_framework_1.BotData.Instance(PalworldBotDataManager_1.default).ACCOUNT_PATH}/${dna_discord_framework_1.BotData.Instance(PalworldBotDataManager_1.default).STEAM_INSTALL_DIR} +login anonymous +app_update 2394010 validate +quit
`;
        this.CommandFunction = () => { console.log("Ping Command Executed"); };
        this.SubCommands = [BashScriptsEnum_1.default.Shutdown, BashScriptsEnum_1.default.Backup, BashScriptsEnum_1.default.Custom, BashScriptsEnum_1.default.Start, BashScriptsEnum_1.default.Ping];
        this.ReplyMessage = "Server is Updating :arrows_clockwise:";
        this.LogMessage = "Server is Updating :arrows_clockwise:";
        this.ErrorMessage = ":warning: Server could not Update :warning:";
        this.SuccessMessage = ":white_check_mark: Server has been Updated :white_check_mark:";
        this.FailMessages = [];
        this.Options = [];
        this.MaxOutTimer = 0;
        this.CommandHandler = BashCommandHandler_1.default.Instance();
    }
}
;
module.exports = Update;
