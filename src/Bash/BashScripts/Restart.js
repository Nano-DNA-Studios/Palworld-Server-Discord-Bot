require("dotenv").config();
const Scripts = require("../Scripts");

const Restart = 
{
  CommandName: Scripts.Restart,
  CommandDescription: 'Restarts the server',
  CustomCode: `sleep 10`,
  Tag: this.CommandName,
  SubCommands: [Scripts.Shutdown, Scripts.Custom, Scripts.Start],
  ReplyMessage: 'Server is Restarting',
  LogMessage: 'Server is being Restarted',
  ErrorMessage: 'Server could not be Restarted',
  SuccessMessage: 'Server has been Restarted',
};

module.exports = Restart;