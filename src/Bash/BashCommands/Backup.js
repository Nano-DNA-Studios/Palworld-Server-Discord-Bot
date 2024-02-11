"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CommandOptionTypes_1 = __importDefault(require("../../CommandOptionTypes"));
const BashScriptsEnum_1 = __importDefault(require("../BashScriptsEnum"));
const Backup = {
    CommandName: BashScriptsEnum_1.default.Backup,
    CommandDescription: "Makes a Backup file of the Server",
    CustomCode: `
    mkdir Backups
    
    cp -r ${process.env.SERVER_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
    `,
    Tag: BashScriptsEnum_1.default.Backup,
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
            required: false
        }
    ]
};
module.exports = Backup;
