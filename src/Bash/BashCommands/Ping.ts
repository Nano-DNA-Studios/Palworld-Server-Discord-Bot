import BashScriptsEnum from "../BashScriptsEnum";
import IBashCommand from "../IBashCommand";
import BashCommandHandler from "../BashCommandHandler";
import PalworldBotDataManager from "../../PalworldBotDataManager"
import BashScript from "../BashScript";
import { BotData } from "dna-discord-framework";
import { DefaultUserAgent } from "discord.js";

//Start works
class Ping extends BashScript implements IBashCommand {
  CommandName = BashScriptsEnum.Ping;
  CommandDescription = "Pings the Server to determine if it is Online";
  CustomCode =
    `
pidof ${BotData.Instance(PalworldBotDataManager).SERVER_PROCESS_NAME} && echo "Server Is Live" || echo "Server Not Live"
`;
  SubCommands = [BashScriptsEnum.Custom];
  CommandFunction = () => { console.log("Ping Command Executed") };
  ReplyMessage = "Server is being Pinged :arrows_clockwise:";
  LogMessage = "Server is being Pinged :arrows_clockwise:";
  ErrorMessage = ":warning: Server is not Online :warning:";
  SuccessMessage = ":white_check_mark: Server is Online :white_check_mark:";
  FailMessages = ["Server Not Live"];
  Options = [];
  MaxOutTimer = 0;
  CommandHandler = BashCommandHandler.Instance();
}

export = Ping;