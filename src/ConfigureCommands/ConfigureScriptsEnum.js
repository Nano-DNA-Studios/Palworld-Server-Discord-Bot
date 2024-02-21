"use strict";
/**
 * Enum for all the Configure Commands
 */
var ConfigureScriptsEnum;
(function (ConfigureScriptsEnum) {
    ConfigureScriptsEnum["SetGuildID"] = "guildid";
    ConfigureScriptsEnum["SetSSHSettings"] = "sshsettings";
    ConfigureScriptsEnum["SetRunLocally"] = "runlocally";
    ConfigureScriptsEnum["SetLogChannelID"] = "logchannelid";
})(ConfigureScriptsEnum || (ConfigureScriptsEnum = {}));
module.exports = ConfigureScriptsEnum;
