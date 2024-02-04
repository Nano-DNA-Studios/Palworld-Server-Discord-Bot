const RunBashScript = require("./Bash/BashScriptRunner");
const Scripts = require("./Bash/Scripts");
const BashScriptFactory = require("./Bash/BashScriptFactory");
const { GetBashCommands} = require("./FileSearch.js");
const { REST, Routes } = require("discord.js");

//Handles the Command inputted by the user
  async function HandleCommand (interaction, client)  {
    try {
        const Factory = new BashScriptFactory(interaction.commandName);

        const Bash = Factory.GetBashScript();

        let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
        interaction.reply({ content: `${Bash.LogMessage}`, ephemeral: true });
        logChannel.send(Bash.LogMessage)
    
        try{
          await RunBashScript(await Factory.GetBashScriptToRun());
          logChannel.send(Bash.SuccessMessage);
        } catch (error) {
          logChannel.send(`${Bash.ErrorMessage} \n ${error}`);
          console.log(error);
        }
    } catch (error) {
      console.log(`Error Occured : ${error}`);
    }
  };

  //Register the commands to the Discord Server
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