require("dotenv").config();
const Scripts = require("../BashScriptsEnum");

const Restart = 
{
  CommandName: Scripts.Restart,
  CommandDescription: 'Restarts the server',
  CustomCode: `sleep 10`,
  Tag: this.CommandName,
  SubCommands: [Scripts.Shutdown, Scripts.Backup, Scripts.Custom, Scripts.Start],
  ReplyMessage: 'Server is Restarting :arrows_clockwise:',
  LogMessage: 'Server is being Restarted :arrows_clockwise:',
  ErrorMessage: ':warning: Server could not be Restarted :warning:',
  SuccessMessage: ':white_check_mark: Server has been Restarted :white_check_mark:',
};

module.exports = Restart;