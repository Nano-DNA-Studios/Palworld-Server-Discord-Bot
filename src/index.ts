import dotenv from "dotenv";
dotenv.config();
import HandleCommand = require("./CommandHandler");
import CommandRegisterer from "./CommandRegisterer";
import DataManager from "./DataManager";
import { Client, IntentsBitField } from "discord.js";
import FileSearch = require("./FileSearch");

/**
 * Gets the Guild ID Based off the Name Provided
 * @param guildName Name of the Guild/Discord Server
 * @returns Guild ID
 */
async function GetGuildID(guildName: string): Promise<string> {
  let guildID = "";

  const guilds = await client.guilds.fetch();
  for (const guild of guilds.values()) {
    if (guild.name === guildName) {
      guildID = guild.id;
      break;
    }
  }

  return guildID;
}

function RegisterCommands() {
  let registerer = new CommandRegisterer(Data);
  let fileSearch = new FileSearch(Data);
  let commands = fileSearch.GetAllCommands();
  registerer.AddCommands(commands);
  registerer.RegisterCommands();
}

/**
 * Starts the Discord Bot
 */
async function StartBot(): Promise<void> {
  await Data.LoadData();
  await client.login(Data.DISCORD_BOT_TOKEN);
  let guildID = await GetGuildID(Data.GUILD_NAME);
  await Data.SetGuildID(guildID);
  await Data.SetClientID(client.user!.id);
  await RegisterCommands();
}

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const Data = new DataManager(__dirname);

StartBot();

client.on("ready", (c) => {
  console.log(`Bot is ready ${c.user.tag}`);
  
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);
  await HandleCommand(interaction, client, Data);
});