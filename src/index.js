require("dotenv").config();

const RunBashScript = require("./bashScripts/BashScriptRunner");
const Update = require("./bashScripts/Update");
const Shutdown = require("./bashScripts/Shutdown");
const Start = require("./bashScripts/Start");
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
    
    //RunBashScript([Shutdown, Update, Start]);
    RunBashScript(Update);


    //RunBashScript([Shutdown, Start]);
  }

  if (interaction.commandName === "shutdown") {
    
    RunBashScript([Shutdown]);
  }

  if (interaction.commandName === "start") {
    
    RunBashScript([Start]);
  }




});

client.login(process.env.DISCORD_BOT_TOKEN);
