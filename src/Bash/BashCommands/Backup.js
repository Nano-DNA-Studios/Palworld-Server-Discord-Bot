"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const BotData_1 = __importDefault(require("../../BotData"));
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
const BashScript_1 = __importDefault(require("../BashScript"));
class Backup extends BashScript_1.default {
    constructor() {
        super(...arguments);
        this.CommandName = BashScriptsEnum_1.default.Backup;
        this.CommandDescription = "Makes a Backup file of the Server";
        this.CustomCode = `
    mkdir Backups
    
    cp -r ${BotData_1.default.Instance(PalworldBotDataManager_1.default).STEAM_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
    `;
        this.CommandFunction = () => { console.log("Ping Command Executed"); };
        this.SubCommands = [BashScriptsEnum_1.default.Custom];
        this.ReplyMessage = "A Backup is being made :arrows_clockwise:";
        this.LogMessage = "A Backup is being made :arrows_clockwise:";
        this.ErrorMessage = ":warning: Server could not Back Up :warning:";
        this.SuccessMessage = ":white_check_mark: Server has been Backed Up :white_check_mark:";
        this.FailMessages = [];
        this.Options = [
            {
                type: CommandOptionTypes_1.default.String,
                name: "suffix",
                description: "The suffix to the Backup File",
                required: false,
            }
        ];
        this.MaxOutTimer = 0;
        this.CommandHandler = BashCommandHandler_1.default.Instance();
    }
}
module.exports = Backup;
