import dotenv from "dotenv";
dotenv.config();

import { GetBashCommands, GetConfigureCommands, } from "./FileSearch";
import { HandleCommand } from "./CommandHandler";
import CommandRegisterer from "./CommandRegisterer";
import DataManager from "./DataManager";
import { Client, IntentsBitField } from "discord.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const Data = new DataManager();

// Starts the Bot
async function StartBot(): Promise<void> {
  await Data.LoadData();
  await client.login(Data.DISCORD_BOT_TOKEN);
  Data.SetClientID(client.user!.id);
}

StartBot();

client.on("ready", (c) => {
  console.log(`Bot is ready ${c.user.tag}`);
  // console.log(c.guilds.fetch().then((guilds) => console.log(guilds)));  //Gets Guild ID
  let registerer = new CommandRegisterer();
  registerer.AddCommands(GetBashCommands());
  registerer.AddCommands(GetConfigureCommands());
  registerer.RegisterCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);
  await HandleCommand(interaction, client);
});
