require("dotenv").config();
const Scripts = require("../BashScriptsEnum");

//Start works
 const Backup = 
 {
    CommandName: Scripts.Backup,
    CommandDescription: "Makes a Backup file of the Server",
    CustomCode: 
`
mkdir Backups

cp -r ${process.env.SERVER_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
`,
    Tag: Scripts.Backup,
    SubCommands: [Scripts.Custom],
    ReplyMessage: "A Backup is being made :arrows_clockwise:",
    LogMessage: "A Backup is being made :arrows_clockwise:",
    ErrorMessage: ":warning: Server could not Back Up :warning:",
    SuccessMessage: ":white_check_mark: Server has been Backed Up :white_check_mark:",
  };

module.exports = Backup;