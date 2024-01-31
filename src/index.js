require("dotenv").config();

const HandleCommand = require("./CommandHandler");
// const RunBashScript = require("./Bash/BashScriptRunner");
// const Update = require("./Bash/Update");
// const Shutdown = require("./Bash/Shutdown");
// const Start = require("./Bash/Start");
// const Restart = require("./Bash/Restart");
// const Backup = require("./Bash/Backup");
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

// client.on("messageCreate", (message) => {
//   if (message.author.bot) return;

//   console.log(message);
//   if (message.content === "ping") {
//     message.reply("pong");
//   }
// });

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  console.log(interaction.commandName);

  await HandleCommand(interaction.commandName);

});

client.login(process.env.DISCORD_BOT_TOKEN);
