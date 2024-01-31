require("dotenv").config();
const BashScript = require("../BashScript");
const Scripts = require("../Scripts");

const Shutdown = {
  CommandName: Scripts.Shutdown,
  CommandDescription: "Stops the server",
  CustomCode: 
  `
pkill "${process.env.SERVER_START_SCRIPT}"

killall "PalServer-Linux-Test"

killall "steamcmd"
  `,
  Tag: this.CommandName,
  SubCommands: [Scripts.Custom],
  ReplyMessage: "Server is Shutting Down",
  LogMessage: "Server is being Shut Down",
  ErrorMessage: "Server could not be Shut Down",
  SuccessMessage: "Server has been Shut Down",
};

module.exports = Shutdown;
