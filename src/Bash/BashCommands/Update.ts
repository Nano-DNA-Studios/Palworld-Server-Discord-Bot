import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";
import BashCommandHandler from "../BashCommandHandler";
import { BotData } from "dna-discord-framework"
import PalworldBotDataManager from "../../PalworldBotDataManager"
import BashScript from "../BashScript";

//Start works
class Update extends BashScript implements IBashCommand {
  CommandName = BashScriptsEnum.Update;
  CommandDescription = "Updates the Server";
  CustomCode =
    `
steamcmd +force_install_dir ${BotData.Instance(PalworldBotDataManager).ACCOUNT_PATH}/${BotData.Instance(PalworldBotDataManager).STEAM_INSTALL_DIR} +login anonymous +app_update 2394010 validate +quit
`;
  CommandFunction = () => { console.log("Ping Command Executed") };
  SubCommands = [BashScriptsEnum.Shutdown, BashScriptsEnum.Backup, BashScriptsEnum.Custom, BashScriptsEnum.Start, BashScriptsEnum.Ping];
  ReplyMessage = "Server is Updating :arrows_clockwise:";
  LogMessage = "Server is Updating :arrows_clockwise:";
  ErrorMessage = ":warning: Server could not Update :warning:";
  SuccessMessage = ":white_check_mark: Server has been Updated :white_check_mark:";
  FailMessages = [];
  Options = [];
  MaxOutTimer = 0;
  CommandHandler = BashCommandHandler.Instance();
};

export = Update;