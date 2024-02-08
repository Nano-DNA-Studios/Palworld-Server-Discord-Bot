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

    let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
    interaction.reply({ content: `${Bash.LogMessage}`, ephemeral: true });
    logChannel.send(Bash.LogMessage)

    try {
      await RunBashScript(await Factory.GetBashScriptToRun());
      logChannel.send(Bash.SuccessMessage);
    } catch (error) {
      logChannel.send(`${Bash.ErrorMessage} \n ${error}`);
      console.log(error);
    }
  } catch (error) {
    console.log(`Error Occured : ${error}`);
  }
}

module.exports = { HandleCommand};