const RunBashScript = require("./Bash/BashScriptRunner");
const Scripts = require("./Bash/Scripts");
const BashScriptFactory = require("./Bash/BashScriptFactory");
const { GetBashCommands} = require("./FileSearch.js");
const { REST, Routes } = require("discord.js");

async function HandleCommand (interaction)  {
    try {
        const Factory = new BashScriptFactory(interaction.commandName);

        const Bash = Factory.GetBashScript();
    
        try{
          await RunBashScript(await Factory.GetBashScriptToRun());
          interaction.reply(Bash.SuccessMessage);
        } catch (error) {
          interaction.reply(Bash.ErrorMessage);
          console.log(error);
        }
    } catch (error) {
      console.log(`Error Occured : ${error}`);
    }
  };

  async function RegisterCommands ()
  {
    const Commands  = GetBashCommands();

    let CommandArray = [];

    Commands.forEach(element => {
      CommandArray.push({
        name: element.CommandName,
        description: element.CommandDescription
      });
    });

    const rest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );

    try {
      console.log('Registering Slash Commands');
  
        await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID
        ),
        { body: CommandArray }
      );
  
      console.log('Slash Commands Registered');
    } catch (error) {
      console.log(`Error Occured : ${error}`);
    }
    //Loop all the scripts and register them as commands
  }

  module.exports = {HandleCommand, RegisterCommands};