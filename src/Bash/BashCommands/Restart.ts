import IBashCommand from "../IBashCommand";
import BashScriptsEnum from "../BashScriptsEnum";

const Restart : IBashCommand = 
{
  CommandName: BashScriptsEnum.Restart,
  CommandDescription: 'Restarts the server',
  CustomCode: `sleep 10`,
  Tag: BashScriptsEnum.Restart,
  SubCommands: [BashScriptsEnum.Shutdown, BashScriptsEnum.Backup, BashScriptsEnum.Custom, BashScriptsEnum.Start, BashScriptsEnum.Ping],
  ReplyMessage: 'Server is Restarting :arrows_clockwise:',
  LogMessage: 'Server is being Restarted :arrows_clockwise:',
  ErrorMessage: ':warning: Server could not be Restarted :warning:',
  SuccessMessage: ':white_check_mark: Server has been Restarted :white_check_mark:',
  FailMessages: [],
  Options: []
};

export = Restart;