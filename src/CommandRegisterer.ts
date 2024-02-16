import { REST, Routes } from "discord.js";
import { GetBashCommands } from "./FileSearch";
import IBashCommand from "./Bash/IBashCommand";
import ICommandOption from "./ICommandOption";

/**
 * Registers the commands to the Discord Server
 */
class CommandRegisterer {
    private rest: REST;

    /**
     * Initializes the Command Registerer
     */
    constructor() {
        this.rest = new REST({ version: "10" }).setToken(`${process.env.DISCORD_BOT_TOKEN}`);
    }

    /**
     * Registers all the commands to the Discord Server
     */
    public RegisterAllCommands(): void {
        this.RegisterBashCommands();
    }

    /**
     * Registers the Bash Commands to the Discord Server
     */
    private async RegisterBashCommands(): Promise<void> {
        const Commands: IBashCommand[] = GetBashCommands();

        const CommandArray: object[] = Commands.map(element => ({
            name: element.CommandName,
            description: element.CommandDescription,
            options: element.Options.map((option: ICommandOption) => ({
                type: option.type,
                name: option.name,
                description: option.description,
                required: option.required || false,
            }))
        }));

        this.RegisterCommands(CommandArray);
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
