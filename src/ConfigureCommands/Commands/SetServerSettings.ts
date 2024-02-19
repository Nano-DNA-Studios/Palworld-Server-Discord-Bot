import IConfigureCommands from "../IConfigureCommand";
import ConfigureScriptsEnum from "../ConfigureScriptsEnum";
import OptionTypes from "../../CommandOptionTypes";

const Backup : IConfigureCommands =
{
        CommandName: ConfigureScriptsEnum.SetServerSettings,
        CommandDescription: "Makes a Backup file of the Server",
        RunCommand: (dataManager, interaction) => {

            const serverIp = interaction.options.getString('serverip');
            const serverUser = interaction.options.getString('serveruser');
            const serverPort = interaction.options.getString('serverport');
            const serverPassword = interaction.options.getString('serverpassword');

            if (serverIp && serverUser && serverPort && serverPassword) {
                console.log("Setting Server Settings");
                dataManager.SetServerSettings(serverIp, serverUser, serverPort, serverPassword);
            } else
            {
                console.log("Not all options were provided.");
            }
        },
        Tag: ConfigureScriptsEnum.SetServerSettings,
        ReplyMessage: "A Backup is being made :arrows_clockwise:",
        LogMessage: "A Backup is being made :arrows_clockwise:",
        ErrorMessage: ":warning: Server could not Back Up :warning:",
        SuccessMessage: ":white_check_mark: Server has been Backed Up :white_check_mark:",
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

        ]
}

export = Backup;