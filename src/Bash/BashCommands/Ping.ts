import BashScriptsEnum from "../BashScriptsEnum";
import IBashCommand from "../IBashCommand";
import { HandleBashCommand } from "../BashCommandHandler"

//Start works
const Ping: IBashCommand =
{
  CommandName: BashScriptsEnum.Ping,
  CommandDescription: "Pings the Server to determine if it is Online",
  CustomCode:
    `
pidof ${process.env.SERVER_PROCESS_NAME} && echo "Server Is Live" || echo "Server Not Live"
`,
  SubCommands: [BashScriptsEnum.Custom],
  CommandFunction: () => { console.log("Ping Command Executed") },
  ReplyMessage: "Server is being Pinged :arrows_clockwise:",
  LogMessage: "Server is being Pinged :arrows_clockwise:",
  ErrorMessage: ":warning: Server is not Online :warning:",
  SuccessMessage: ":white_check_mark: Server is Online :white_check_mark:",
  FailMessages: ["Server Not Live"],
  Options: [],
  MaxOutTimer: 0,
  UsesCustomCommandHandler: true,
  CustomCommandHandler: HandleBashCommand
};

export = Ping;