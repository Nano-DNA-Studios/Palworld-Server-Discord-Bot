require("dotenv").config();
const Scripts = require("../Scripts");

//Start works
 const Ping = 
 {
    CommandName: Scripts.Ping,
    CommandDescription: "Pings the Server to determine if it is Online",
    CustomCode: 
`
pidof ${process.env.SERVER_PROCESS_NAME}
`,
    Tag: this.CommandName,
    SubCommands: [Scripts.Custom],
    ReplyMessage: "Server is being Pinged :arrows_clockwise:",
    LogMessage: "Server is being Pinged :arrows_clockwise:",
    ErrorMessage: ":warning: Server is not Online :warning:",
    SuccessMessage: ":white_check_mark: Server is Online :white_check_mark:",
  };

module.exports = Ping;