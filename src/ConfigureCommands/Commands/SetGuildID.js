const ConfigureScriptsEnum = require('../ConfigureScriptsEnum');

//Sets the Guild ID for the Server
const SetGuildID =
{
  CommandName: ConfigureScriptsEnum.SetGuildID,
  CommandDescription: "Sets the Guild ID the Bot is Operating in",
  CustomCode:
    `
mkdir Backups

cp -r ${process.env.SERVER_INSTALL_DIR}/Pal/Saved ~/Backups/Saved-${new Date().toUTCString().replace(/ /g, '-').replace(/:/g, '-')}
`,
  Tag: ConfigureScriptsEnum.SetGuildID,
  SubCommands: [Scripts.Custom],
  ReplyMessage: "A Backup is being made :arrows_clockwise:",
  LogMessage: "A Backup is being made :arrows_clockwise:",
  ErrorMessage: ":warning: Server could not Back Up :warning:",
  SuccessMessage: ":white_check_mark: Server has been Backed Up :white_check_mark:",
  FailMessages: [],
  Options: [
    {
      type: OptionTypes.String,
      name: "suffix",
      description: "The suffix to the Backup File",
      required: false
    }
  ]
};

module.exports = SetGuildID;