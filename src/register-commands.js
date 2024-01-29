require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: 'restart',
    description: 'Restarts the Server',
  },
  {
    name: 'shutdown',
    description: 'Shuts down the Server',
  },
  {
    name: 'start',
    description: 'Starts the Server',
  },
  {
    name: 'update',
    description: 'Updates the Server',
  },

];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log('Registering Slash Commands');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash Commands Registered');
  } catch (error) {
    console.log(`Error Occured : ${error}`);
  }
})();
