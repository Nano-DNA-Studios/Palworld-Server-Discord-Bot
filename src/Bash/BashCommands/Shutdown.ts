import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";
import BashCommandHandler from "../BashCommandHandler";
import BotData from "dna-discord-framework/src/Bot/BotData";
import PalworldBotDataManager from "../../PalworldBotDataManager"
import BashScript from "../BashScript";

class Shutdown extends BashScript implements IBashCommand {
  CommandName = BashScriptsEnum.Shutdown;
  CommandDescription = "Stops the server";
  CustomCode =
    `
pkill "${BotData.Instance(PalworldBotDataManager).SERVER_START_SCRIPT}"

killall "${BotData.Instance(PalworldBotDataManager).SERVER_PROCESS_NAME}"

killall "steamcmd"

sleep 10
  `;
  CommandFunction = () => { console.log("Ping Command Executed") };
  SubCommands = [BashScriptsEnum.Custom, BashScriptsEnum.Ping];
  ReplyMessage = "Server is Shutting Down :arrows_clockwise:";
  LogMessage = "Server is being Shut Down :arrows_clockwise:";
  ErrorMessage = ":warning: Server could not be Shut Down :warning:";
  SuccessMessage = ":white_check_mark: Server has been Shut Down :white_check_mark:";
  FailMessages = [];
  Options = [];
  MaxOutTimer = 0;
  CommandHandler = BashCommandHandler.Instance();
};

export = Shutdown;