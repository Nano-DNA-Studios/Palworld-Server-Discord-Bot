require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');

const client = new Client({

    intents: [IntentsBitField.Flags.Guilds,
     IntentsBitField.Flags.GuildMembers,
     IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
     IntentsBitField.Flags.MessageContent,]
});

client.on('ready', (c) => {
    console.log(`Bot is ready ${c.user.tag}`);
});


client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    console.log(message.content);
     if(message.content === 'ping'){
         message.reply('pong');
     }
});



client.login('MTIwMTE5ODM0NDE5ODk2NzMxNg.GMClIp.Ja0IyaVEiF7V9JdD2IjBEeXyBtiswM5PPBHIlY');