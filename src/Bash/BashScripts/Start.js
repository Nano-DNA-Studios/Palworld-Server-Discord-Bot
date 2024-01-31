require("dotenv").config();
const Scripts = require("../Scripts");

//Start works
 const Start = 
 {
    CommandName: Scripts.Start,
    CommandDescription: "Starts the Server",
    CustomCode: 
`
./${process.env.SERVER_INSTALL_DIR}/${process.env.SERVER_START_SCRIPT} &
`,
    Tag: this.CommandName,
    SubCommands: [Scripts.Custom],
    ReplyMessage: "Server is Starting",
    LogMessage: "Server is Starting",
    ErrorMessage: "Server could not Start",
    SuccessMessage: "Server has been Started",
  };

module.exports = Start;

