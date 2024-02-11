const RunBashScript = require("./Bash/BashScriptRunner");
const Scripts = require("./Bash/BashScriptsEnum.js");
const BashScriptFactory = require("./Bash/BashScriptFactory");
const { GetBashCommands } = require("./FileSearch2.js");
const { REST, Routes } = require("discord.js");

class CommandRegisterer {
    constructor() {

        this.rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);
        this.Commands = [];
    }

    //Registers all the commands to the Discord Server
    RegisterAllCommands()
    {
        this.RegisterBashCommands();
    }

    //Registers the Bash Commands to the Discord Server
    async RegisterBashCommands() {
        const Commands = GetBashCommands();

        let CommandArray = [];

        Commands.forEach(element => {
            CommandArray.push({
                name: element.CommandName,
                description: element.CommandDescription,
                options: element.Options.map(option => ({
                    type: option.type,
                    name: option.name,
                    description: option.description,
                    required: option.required || false,
                }))
            });
        });

        this.RegisterCommands(CommandArray);
    }

    //Runs the Register Command itself
    async RegisterCommands (Commands)
    {
        try {
            console.log('Registering Slash Commands');

            await this.rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                { body: Commands }
            );

            console.log('Slash Commands Registered');
        } catch (error) {
            console.log(`Error Occured : ${error}`);
        }
    }
}

module.exports = CommandRegisterer;