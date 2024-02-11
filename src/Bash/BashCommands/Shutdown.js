require("dotenv").config();
const Scripts = require("../BashScriptsEnum");
const OptionTypes = require("../../CommandOptionTypes");

const Shutdown = {
  CommandName: Scripts.Shutdown,
  CommandDescription: "Stops the server",
  CustomCode: 
  `
pkill "${process.env.SERVER_START_SCRIPT}"

killall "PalServer-Linux-Test"

killall "steamcmd"

sleep 10
  `,
  Tag: this.CommandName,
  SubCommands: [Scripts.Custom, Scripts.Ping],
  ReplyMessage: "Server is Shutting Down :arrows_clockwise:",
  LogMessage: "Server is being Shut Down :arrows_clockwise:",
  ErrorMessage: ":warning: Server could not be Shut Down :warning:",
  SuccessMessage: ":white_check_mark: Server has been Shut Down :white_check_mark:",
  FailMessages: [],
  Options: []
};

module.exports = Shutdown;
