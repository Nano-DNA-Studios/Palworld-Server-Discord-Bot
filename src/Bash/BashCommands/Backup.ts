import IBashCommand from "../IBashCommand"
import BashScriptsEnum from "../BashScriptsEnum"
import BashCommandHandler from "../BashCommandHandler"
import PalworldBotDataManager from "../../PalworldBotDataManager"
import BashScript from "../BashScript"
import OptionTypes from "dna-discord-framework/src/Bot/OptionTypes"
import BotData from "dna-discord-framework/src/Bot/BotData"

class Backup extends BashScript implements IBashCommand {

    CommandName = BashScriptsEnum.Backup;
    CommandDescription = "Makes a Backup file of the Server"
    CustomCode =
        `
    mkdir Backups
    
    cp -r ${BotData.Instance(PalworldBotDataManager).STEAM_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
    `
    CommandFunction = () => { console.log("Ping Command Executed") }
    SubCommands = [BashScriptsEnum.Custom]
    ReplyMessage = "A Backup is being made :arrows_clockwise:"
    LogMessage = "A Backup is being made :arrows_clockwise:"
    ErrorMessage = ":warning: Server could not Back Up :warning:"
    SuccessMessage = ":white_check_mark: Server has been Backed Up :white_check_mark:"
    FailMessages = []
    Options = [
        {
            type: OptionTypes.String,
            name: "suffix",
            description: "The suffix to the Backup File",
            required: false,
        }
    ]
    MaxOutTimer = 0
    CommandHandler = BashCommandHandler.Instance()
}


export = Backup;