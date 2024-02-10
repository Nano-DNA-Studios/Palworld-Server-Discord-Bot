const RunBashScript = require("./Bash/BashScriptRunner");
const Scripts = require("./Bash/BashScriptsEnum.js");
const BashScriptFactory = require("./Bash/BashScriptFactory");
const { GetBashCommands } = require("./FileSearch.js");
const { REST, Routes } = require("discord.js");

//Handles the Command inputted by the user
async function HandleCommand(interaction, client) {

  //Determine if the command is a Bash Related command or a configure related command

  if (Object.values(Scripts).includes(interaction.commandName)) {
    HandleBashCommand(interaction, client);
  } else {
    //Handle Configure command
  }
};

async function HandleBashCommand(interaction, client) {
  try {
    const Factory = new BashScriptFactory(interaction.commandName);

    const Bash = Factory.GetBashScript();

    const Factories = Factory.GetFactoriesToRun();

    let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;

    const Response = await interaction.reply({ content: ResponseMessage, ephemeral: true });

    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);

    for (const factoryInstance of Factories) 
    {
      const bashInstance = factoryInstance.GetBashScript();

      logChannel.send(bashInstance.LogMessage);
      ResponseMessage += `${bashInstance.LogMessage} \n`;

      try {
        let BashResult = await RunBashScript(factoryInstance);

        if (BashResult)
        {
          //Successfuly Ran
          logChannel.send(bashInstance.SuccessMessage);
          ResponseMessage += `${bashInstance.SuccessMessage} \n`;
          Response.edit({ content: ResponseMessage, ephemeral: true });
        } else 
        {
          //Failure Occured
          logChannel.send(bashInstance.ErrorMessage);
          ResponseMessage += `${bashInstance.ErrorMessage} \n`;
          Response.edit({ content: ResponseMessage, ephemeral: true });
        }
        
      } catch (error) {
        logChannel.send(`${Bash.ErrorMessage} \n ${error}`);
        console.log(error);
      }
    }

  } catch (error) {
    console.log(`Error Occured : ${error}`);
  }
}

  async function RunScript (factoryInstance)
  {
    await RunBashScript(factoryInstance);
  }


module.exports = { HandleCommand };