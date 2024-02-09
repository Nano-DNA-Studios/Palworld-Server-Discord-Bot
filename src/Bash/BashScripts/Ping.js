require("dotenv").config();
const Scripts = require("../BashScriptsEnum");

//Start works
 const Ping = 
 {
    CommandName: Scripts.Ping,
    CommandDescription: "Pings the Server to determine if it is Online",
    CustomCode: 
`
pidof ${process.env.SERVER_PROCESS_NAME} && echo "Process is running" || echo "Process not found"
`,
    Tag: this.CommandName,
    SubCommands: [Scripts.Custom],
    ReplyMessage: "Server is being Pinged :arrows_clockwise:",
    LogMessage: "Server is being Pinged :arrows_clockwise:",
    ErrorMessage: ":warning: Server is not Online :warning:",
    SuccessMessage: ":white_check_mark: Server is Online :white_check_mark:",
  };

module.exports = Ping;

//pidof ${process.env.SERVER_PROCESS_NAME}