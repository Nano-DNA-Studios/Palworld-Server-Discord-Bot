import { REST, Routes } from "discord.js";
import { GetBashCommands, GetConfigureCommands } from "./FileSearch";
import IBashCommand from "./Bash/IBashCommand";
import ICommandOption from "./ICommandOption";
import IConfigureCommands from "./ConfigureCommands/IConfigureCommand";
import ICommand from "./ICommand";
import { CommandName } from "./Bash/BashCommands/Backup";

/**
 * Registers the commands to the Discord Server
 */
class CommandRegisterer {
    private rest: REST;

    /**
     * Initializes the Command Registerer, by registering the REST API
     */
    constructor() {
        this.rest = new REST({ version: "10" }).setToken(`${process.env.DISCORD_BOT_TOKEN}`);
    }

    /**
     * Registers all the commands to the Discord Server
     */
    public RegisterAllCommands(): void {

        let CommandArray: object[] = [];

        CommandArray.push(...this.RegisterBashCommands());
        CommandArray.push(...this.RegisterConfigureCommands());

        this.RegisterCommands(CommandArray);
    }

    /**
     * Registers the Bash Commands to the Discord Server
     */
    private RegisterBashCommands(): object[] {
        const Commands: IBashCommand[] = GetBashCommands();
        const CommandArray: object[] = this.MapToCommand(Commands);

        console.log('Bash Commands Registered');

        return CommandArray;
    }

     /**
     * Registers the Configure Commands to the Discord Server
     */
     private RegisterConfigureCommands(): object[] {
        const Commands: IConfigureCommands[] = GetConfigureCommands();
        const CommandArray: object[] = this.MapToCommand(Commands);

        console.log('Configure Commands Registered');

        return CommandArray;
    }

    /**
     * Maps ICommands to Discord Commands
     * @param Commands Custom Commands to be registered
     * @returns List of Discord Commands to be Registered
     */
    private MapToCommand (Commands: ICommand[]) : object[]
    {
        return Commands.map(element => ({
            name: element.CommandName,
            description: element.CommandDescription,
            options: element.Options.map((option: ICommandOption) => ({
                type: option.type,
                name: option.name,
                description: option.description,
                required: option.required || false,
            }))
        }));
    }

    /**
     * Registers the commands to the Discord Server 
     * @param Commands The commands to register
     */
    private async RegisterCommands(Commands: object[]): Promise<void> {
        try {
            console.log('Registering Slash Commands');

            await this.rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID!,
                    process.env.GUILD_ID!
                ),
                { body: Commands }
            );

            console.log('Slash Commands Registered');
        } catch (error) {
            console.log(`Error Occurred: ${error}`);
        }
    }
}

export default CommandRegisterer;
