import IBashCommand from "../IBashCommand"
import OptionTypes from "../../CommandOptionTypes"
import BashScriptsEnum from "../BashScriptsEnum"

const Backup : IBashCommand =
{
        CommandName: BashScriptsEnum.Backup,
        CommandDescription: "Makes a Backup file of the Server",
        CustomCode:
            `
    mkdir Backups
    
    cp -r ${process.env.SERVER_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
    `,
        Tag: BashScriptsEnum.Backup,
        SubCommands: [BashScriptsEnum.Custom],
        ReplyMessage: "A Backup is being made :arrows_clockwise:",
        LogMessage: "A Backup is being made :arrows_clockwise:",
        ErrorMessage: ":warning: Server could not Back Up :warning:",
        SuccessMessage: ":white_check_mark: Server has been Backed Up :white_check_mark:",
        FailMessages: [],
        Options: [
            {
                type: OptionTypes.String,
                name: "suffix",
                description: "The suffix to the Backup File",
                required: false
            }
        ]
}

export = Backup;