const { DataManager } = require('discord.js');
const ConfigureScriptsEnum = require('../ConfigureScriptsEnum');

//Sets the Guild ID for the Server
const SetServerSettings =
{
  CommandName: ConfigureScriptsEnum.SetServerSettings,
  CommandDescription: "Sets the Guild ID the Bot is Operating in",
  CustomCode: function (DataManager, )
  {

  },
  Tag: ConfigureScriptsEnum.SetServerSettings,
  SubCommands: [Scripts.Custom],
  ReplyMessage: "Server Communication Settings are being Set :arrows_clockwise:",
  LogMessage: "Server Communication Settings are being Set :arrows_clockwise:",
  ErrorMessage: ":warning: Server Connection Settings could not be set :warning:",
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

module.exports = SetServerSettings;