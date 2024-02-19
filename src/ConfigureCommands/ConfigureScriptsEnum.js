"use strict";
/**
 * Enum for all the Configure Commands
 */
var ConfigureScriptsEnum;
(function (ConfigureScriptsEnum) {
    ConfigureScriptsEnum["SetGuildID"] = "guildid";
    ConfigureScriptsEnum["SetServerSettings"] = "serversettings";
    ConfigureScriptsEnum["SetRunLocally"] = "runlocally";
    ConfigureScriptsEnum["SetLogChannelID"] = "logchannelid";
})(ConfigureScriptsEnum || (ConfigureScriptsEnum = {}));
module.exports = ConfigureScriptsEnum;
