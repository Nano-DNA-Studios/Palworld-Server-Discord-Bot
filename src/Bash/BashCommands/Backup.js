"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const BashCommandHandler_1 = __importDefault(require("../BashCommandHandler"));
const BotData_1 = __importDefault(require("../../BotData"));
const PalworldBotDataManager_1 = __importDefault(require("../../PalworldBotDataManager"));
const Backup = {
    CommandName: BashScriptsEnum_1.default.Backup,
    CommandDescription: "Makes a Backup file of the Server",
    CustomCode: `
    mkdir Backups
    
    cp -r ${BotData_1.default.Instance(PalworldBotDataManager_1.default).STEAM_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
    `,
    CommandFunction: () => { console.log("Ping Command Executed"); },
    SubCommands: [BashScriptsEnum_1.default.Custom],
    ReplyMessage: "A Backup is being made :arrows_clockwise:",
    LogMessage: "A Backup is being made :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Back Up :warning:",
    SuccessMessage: ":white_check_mark: Server has been Backed Up :white_check_mark:",
    FailMessages: [],
    Options: [
        {
            type: CommandOptionTypes_1.default.String,
            name: "suffix",
            description: "The suffix to the Backup File",
            required: false,
        }
    ],
    MaxOutTimer: 0,
    CommandHandler: BashCommandHandler_1.default.Instance()
};
module.exports = Backup;
