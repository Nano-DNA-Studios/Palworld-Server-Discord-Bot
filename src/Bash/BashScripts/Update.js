require("dotenv").config();
const Scripts = require("../BashScriptsEnum");
const OptionTypes = require("../../CommandOptionTypes");

//Start works
 const Update = 
 {
    CommandName: Scripts.Update,
    CommandDescription: "Updates the Server",
    CustomCode: 
`
steamcmd +force_install_dir ${process.env.STEAM_INSTALL_DIR} +login anonymous +app_update 2394010 validate +quit
`,
    Tag: this.CommandName,
    SubCommands: [Scripts.Shutdown, Scripts.Backup, Scripts.Custom, Scripts.Start, Scripts.Ping],
    ReplyMessage: "Server is Updating :arrows_clockwise:",
    LogMessage: "Server is Updating :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Update :warning:",
    SuccessMessage: ":white_check_mark: Server has been Updated :white_check_mark:",
    FailMessages: [],
    Options: []
  };

module.exports = Update;