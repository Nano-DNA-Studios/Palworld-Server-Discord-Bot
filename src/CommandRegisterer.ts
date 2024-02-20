import { REST, Routes } from "discord.js";
import ICommandOption from "./ICommandOption";
import ICommand from "./ICommand";
import IDiscordCommand from "./IDiscordCommand";

/**
 * Registers the commands to the Discord Server
 */
class CommandRegisterer {
    private rest: REST;
    public Commands: IDiscordCommand[] = [];

    /**
     * Initializes the Command Registerer, by registering the REST API
     */
    constructor() {
        this.rest = new REST({ version: "10" }).setToken(`${process.env.DISCORD_BOT_TOKEN}`);
    }

    /**
     * Maps the Commands to be Added to Discord Commands and Adds to the List of Commands to be Registered and 
     * @param commands Array of Commands to be Registered
     */
    public AddCommands (commands : ICommand[]) : void
    {
        this.Commands.push(...commands);
    }

    /**
     * Registers the commands to the Discord Server 
     */
    public async RegisterCommands()  {
        try {
            console.log('Registering Slash Commands');

            await this.rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID!,
                    process.env.GUILD_ID!
                ),
                { body: this.Commands.map(element => ({
                    name: element.CommandName,
                    description: element.CommandDescription,
                    options: element.Options.map((option: ICommandOption) => ({
                        type: option.type,
                        name: option.name,
                        description: option.description,
                        required: option.required || false,
                    }))
                })) }
            );

            console.log('Slash Commands Registered');
        } catch (error) {
            console.log(`Error Occurred: ${error}`);
        }
    }
}

export default CommandRegisterer;