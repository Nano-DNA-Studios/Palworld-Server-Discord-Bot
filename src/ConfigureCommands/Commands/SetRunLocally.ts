import IConfigureCommands from "../IConfigureCommand";
import ConfigureScriptsEnum from "../ConfigureScriptsEnum";
import OptionTypes from "../../CommandOptionTypes";
import EmptyCustomCommandHandler from "../../EmptyCustomCommandHandler";

const SetRunLocally: IConfigureCommands =
{
    CommandName: ConfigureScriptsEnum.SetRunLocally,
    CommandDescription: "Determines if the Server doesn't need to be SSH'd into",
    CommandFunction: (dataManager, interaction) => {

        const runLocally = interaction.options.getBoolean('runlocally');

        if (runLocally !== null && runLocally !== undefined) 
            dataManager.SetRunLocally(runLocally);
         else 
            throw new Error("Run Locally Value was not provided.");
        
    },
    ReplyMessage: "Run Locally Value is being set :arrows_clockwise:",
    LogMessage: "Run Locally Value is being set :arrows_clockwise:",
    ErrorMessage: ":warning: Could not set Run Locally Value :warning:",
    SuccessMessage: ":white_check_mark: Run Locally Value has been set Successfully :white_check_mark:",
    FailMessages: [],
    Options: [
        {
            type: OptionTypes.Boolean,
            name: "runlocally",
            description: "Boolean to determine if the Server doesn't need to be SSH'd into",
            required: true
        }
    ],
    UsesCustomCommandHandler: false,
    CustomCommandHandler: EmptyCustomCommandHandler
}

export = SetRunLocally;