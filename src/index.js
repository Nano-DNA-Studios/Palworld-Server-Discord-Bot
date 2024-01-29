require("dotenv").config();

const RunBashScript = require("./bashScripts/BashScriptRunner");
const Update = require("./bashScripts/Update");
const Shutdown = require("./bashScripts/Shutdown");
const Start = require("./bashScripts/Start");
const Restart = require("./bashScripts/Restart");
const Backup = require("./bashScripts/Backup");
const MakeTempFolder = require("./bashScripts/MakeTempFolder");
const DeleteTempFolder = require("./bashScripts/DeleteTempFolder");
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

  if (interaction.commandName === "restart") {
    try{
      await RunBashScript(Restart);
      const channel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
      channel.send("Server has been Restarted");

      interaction.reply({content: "Server has been Restarted", ephemeral: true});
    } catch (error) {
      interaction.reply("An Error Occured");
      console.log(error);
    }
  }

  if (interaction.commandName === "shutdown") {
    try{
      await RunBashScript(Shutdown);
      interaction.reply("Server has been Shutdown");
    } catch (error) {
      interaction.reply("An Error Occured");
      console.log(error);
    }
  }

  if (interaction.commandName === "start") {
    try{
      await RunBashScript(Start);
      interaction.reply("Server has been Started");
    } catch (error) {
      interaction.reply("An Error Occured");
      console.log(error);
    }
  }

  if (interaction.commandName === "update") {
    try{
      await RunBashScript(Update);
      interaction.reply("Server has been Updated");
    } catch (error) {
      interaction.reply("An Error Occured");
      console.log(error);
    }
  }

  if (interaction.commandName === "backup") {
    try{
      const channel = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
      channel.send("Server has been Backed Up");
      await RunBashScript(Backup);
      interaction.reply({content: "Server has been Restarted", ephemeral: true});
    } catch (error) {
      interaction.reply("An Error Occured");
      console.log(error);
    }
  }

});

client.login(process.env.DISCORD_BOT_TOKEN);
