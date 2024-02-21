import IConfigureCommands from "../IConfigureCommand";
import ConfigureScriptsEnum from "../ConfigureScriptsEnum";
import OptionTypes from "../../CommandOptionTypes";
import EmptyCustomCommandHandler from "../../EmptyCustomCommandHandler";

const SetSSH: IConfigureCommands =
{
    CommandName: ConfigureScriptsEnum.SetSSHSettings,
    CommandDescription: "Sets the SSH Settings for the Server to Login and run Bash Commands",
    CommandFunction: (dataManager, interaction) => {

        const serverIp = interaction.options.getString('serverip');
        const serverUser = interaction.options.getString('serveruser');
        const serverPort = interaction.options.getString('serverport');
        const serverPassword = interaction.options.getString('serverpassword');

        if (serverIp && serverUser && serverPort && serverPassword)
            dataManager.SetSSHSettings(serverIp, serverUser, serverPort, serverPassword);
        else
            throw new Error("Not all the SSH Settings were provided.");
    },
    ReplyMessage: "SSH Settings are being set :arrows_clockwise:",
    LogMessage: "SSH Settings are being set :arrows_clockwise:",
    ErrorMessage: ":warning: Could not set SSH Settings :warning:",
    SuccessMessage: ":white_check_mark: SSH Settings have been set :white_check_mark:",
    FailMessages: [],
    Options: [
        {
            type: OptionTypes.String,
            name: "serverip",
            description: "The IP of the Server",
            required: true
        },
        {
            type: OptionTypes.String,
            name: "serveruser",
            description: "The User on the Server",
            required: true
        },
        {
            type: OptionTypes.String,
            name: "serverport",
            description: "The Servers Port",
            required: true
        },
        {
            type: OptionTypes.String,
            name: "serverpassword",
            description: "The Password for the Server",
            required: true
        }
    ],
    UsesCustomCommandHandler: false,
    CustomCommandHandler: EmptyCustomCommandHandler
}

export = SetSSH;