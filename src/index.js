require("dotenv").config();

const { Start } = require("./Bash/BashScriptsEnum");
const { HandleCommand } = require("./CommandHandler");
const CommandRegisterer = require("./CommandRegisterer");
const DataManager = require("./DataManager");
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

const Data = new DataManager();

//Starts the Bot 
async function StartBot() {

  await Data.LoadData();
  await client.login(Data.DISCORD_BOT_TOKEN);
  Data.SetClientID(client.user.id);
}

StartBot();

client.on("ready", (c) => {
  console.log(`Bot is ready ${c.user.tag}`);
  //console.log(c.guilds.fetch().then((guilds) => console.log(guilds)));  //Gets Guild ID
  let registerer = new CommandRegisterer();
  registerer.RegisterAllCommands();

  c.mes
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  //let dataMan = new DataManager(interaction.guild.id);
  console.log(interaction.commandName);
  await HandleCommand(interaction, client);
});