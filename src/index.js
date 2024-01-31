require("dotenv").config();

const RunBashScript = require("./Bash/BashScriptRunner");
// const RunBashScript = require("./Bash/BashScriptRunner");
// const Update = require("./Bash/Update");
// const Shutdown = require("./Bash/Shutdown");
// const Start = require("./Bash/Start");
// const Restart = require("./Bash/Restart");
// const Backup = require("./Bash/Backup");
const Scripts = require("./Bash/Scripts");
const BashScriptFactory = require("./Bash/BashScriptFactory");
// const MakeTempFolder = require("./bashScripts/MakeTempFolder");
// const DeleteTempFolder = require("./bashScripts/DeleteTempFolder");
//const ConnectToServer = require("./bashScripts/RunScriptOnServer");
const { exec } = require("child_process");
const { Client, IntentsBitField } = require("discord.js");
const { Server } = require("http");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`Bot is ready ${c.user.tag}`);
  //console.log(c.guilds.fetch().then((guilds) => console.log(guilds)));  Gets Guild ID
  c.mes
});

Enumerator = {
  MakeTempFolder: 0,
  Shutdown: 1,
  Update: 2,
  Start: 3,
  DeleteTempFolder: 4,
};




client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  console.log(message);
  if (message.content === "ping") {
    message.reply("pong");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction.commandName);

  // if (interaction.commandName === "restart") {
  //   try{
  //     await RunBashScript(Restart);
  //     const channel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
  //     channel.send("Server has been Restarted");

  //     interaction.reply({content: "Server has been Restarted", ephemeral: true});
  //   } catch (error) {
  //     interaction.reply("An Error Occured");
  //     console.log(error);
  //   }
  // }

  if (interaction.commandName === "shutdown") {
    const Factory = new BashScriptFactory(Scripts.Shutdown);

    const Bash = Factory.GetBashScript();

    try{
      await RunBashScript(await Factory.GetBashScriptToRun());
      interaction.reply(Bash.SuccessMessage);
    } catch (error) {
      interaction.reply(Bash.ErrorMessage);
      console.log(error);
    }
  }

  if (interaction.commandName === "start") {
    try{
      await RunBashScript(Scripts.Start);
      interaction.reply("Server has been Started");
    } catch (error) {
      interaction.reply("An Error Occured");
      console.log(error);
    }
  }

  // if (interaction.commandName === "update") {
  //   try{
  //     await RunBashScript(Update);
  //     interaction.reply("Server has been Updated");
  //   } catch (error) {
  //     interaction.reply("An Error Occured");
  //     console.log(error);
  //   }
  // }

  // if (interaction.commandName === "backup") {
  //   try{
  //     const channel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
  //     channel.send("Server has been Backed Up");
  //     await RunBashScript(Backup);
  //     interaction.reply({content: "Server has been Restarted", ephemeral: true});
  //   } catch (error) {
  //     interaction.reply("An Error Occured");
  //     console.log(error);
  //   }
  // }

});

client.login(process.env.DISCORD_BOT_TOKEN);
