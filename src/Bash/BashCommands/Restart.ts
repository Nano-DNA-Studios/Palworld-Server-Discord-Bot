import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";
import BashCommandHandler from "../BashCommandHandler";

const Restart: IBashCommand =
{
  CommandName: BashScriptsEnum.Restart,
  CommandDescription: 'Restarts the server',
  CustomCode: `sleep 10`,
  CommandFunction: () => { console.log("Ping Command Executed") },
  SubCommands: [BashScriptsEnum.Shutdown, BashScriptsEnum.Backup, BashScriptsEnum.Custom, BashScriptsEnum.Start, BashScriptsEnum.Ping],
  ReplyMessage: 'Server is Restarting :arrows_clockwise:',
  LogMessage: 'Server is being Restarted :arrows_clockwise:',
  ErrorMessage: ':warning: Server could not be Restarted :warning:',
  SuccessMessage: ':white_check_mark: Server has been Restarted :white_check_mark:',
  FailMessages: [],
  Options: [],
  MaxOutTimer: 5000,
  CommandHandler: BashCommandHandler.Instance()
};

export = Restart;