import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";
import { HandleBashCommand } from "../BashCommandHandler"

const Shutdown: IBashCommand = {
  CommandName: BashScriptsEnum.Shutdown,
  CommandDescription: "Stops the server",
  CustomCode:
    `
pkill "${process.env.SERVER_START_SCRIPT}"

killall "PalServer-Linux-Test"

killall "steamcmd"

sleep 10
  `,
  CommandFunction: () => { console.log("Ping Command Executed") },
  SubCommands: [BashScriptsEnum.Custom, BashScriptsEnum.Ping],
  ReplyMessage: "Server is Shutting Down :arrows_clockwise:",
  LogMessage: "Server is being Shut Down :arrows_clockwise:",
  ErrorMessage: ":warning: Server could not be Shut Down :warning:",
  SuccessMessage: ":white_check_mark: Server has been Shut Down :white_check_mark:",
  FailMessages: [],
  Options: [],
  MaxOutTimer: 0,
  UsesCustomCommandHandler: true,
  CustomCommandHandler: HandleBashCommand
};

export = Shutdown;