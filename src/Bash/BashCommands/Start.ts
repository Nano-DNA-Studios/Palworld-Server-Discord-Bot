import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";
import BashCommandHandler from "../BashCommandHandler";
import BotData from "dna-discord-framework/src/Bot/BotData";
import PalworldBotDataManager from "../../PalworldBotDataManager"
import BashScript from "../BashScript";

//Start works
class Start extends BashScript implements IBashCommand {
  CommandName = BashScriptsEnum.Start;
  CommandDescription = "Starts the Server";
  CustomCode =
    `
nohup ./${BotData.Instance(PalworldBotDataManager).STEAM_INSTALL_DIR}/${BotData.Instance(PalworldBotDataManager).SERVER_START_SCRIPT} &

sleep 3

exit
`;
  CommandFunction = () => { console.log("Ping Command Executed") };
  SubCommands = [BashScriptsEnum.Custom, BashScriptsEnum.Ping];
  ReplyMessage = "Server is Starting :arrows_clockwise:";
  LogMessage = "Server is Starting :arrows_clockwise:";
  ErrorMessage = ":warning: Server could not Start :warning:";
  SuccessMessage = ":white_check_mark: Server has been Started :white_check_mark:";
  FailMessages = [];
  Options = [];
  MaxOutTimer = 5000;
  CommandHandler = BashCommandHandler.Instance();
};

export = Start;