require("dotenv").config();
const Scripts = require("../Scripts");

//Start works
 const Start = 
 {
    CommandName: Scripts.Start,
    CommandDescription: "Starts the Server",
    CustomCode: 
`
nohup ./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &

sleep 3

exit
`,
    Tag: this.CommandName,
    SubCommands: [Scripts.Custom, Scripts.Ping],
    ReplyMessage: "Server is Starting :arrows_clockwise:",
    LogMessage: "Server is Starting :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Start :warning:",
    SuccessMessage: ":white_check_mark: Server has been Started :white_check_mark:",
  };

module.exports = Start;