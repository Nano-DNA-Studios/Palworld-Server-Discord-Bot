import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";
import { HandleBashCommand } from "../BashCommandHandler"

//Start works
const Start: IBashCommand =
{
  CommandName: BashScriptsEnum.Start,
  CommandDescription: "Starts the Server",
  CustomCode:
    `
nohup ./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &

sleep 3

exit
`,
  Tag: BashScriptsEnum.Start,
  CommandFunction: () => { console.log("Ping Command Executed") },
  SubCommands: [BashScriptsEnum.Custom, BashScriptsEnum.Ping],
  ReplyMessage: "Server is Starting :arrows_clockwise:",
  LogMessage: "Server is Starting :arrows_clockwise:",
  ErrorMessage: ":warning: Server could not Start :warning:",
  SuccessMessage: ":white_check_mark: Server has been Started :white_check_mark:",
  FailMessages: [],
  Options: [],
  MaxOutTimer: 5000,
  UsesCustomCommandHandler: true,
  CustomCommandHandler: HandleBashCommand
};

export = Start;