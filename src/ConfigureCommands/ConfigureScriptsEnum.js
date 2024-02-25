"use strict";
/**
 * Enum for all the Configure Commands
 */
var ConfigureScriptsEnum;
(function (ConfigureScriptsEnum) {
    ConfigureScriptsEnum["SetSSHSettings"] = "setsshsettings";
    ConfigureScriptsEnum["SetRunLocally"] = "setrunlocally";
    ConfigureScriptsEnum["SetLogChannel"] = "setlogchannel";
    ConfigureScriptsEnum["SetInstallDirectory"] = "setinstalldirectory";
})(ConfigureScriptsEnum || (ConfigureScriptsEnum = {}));
module.exports = ConfigureScriptsEnum;
