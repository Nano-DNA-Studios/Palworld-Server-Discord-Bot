import { CacheType, ChatInputCommandInteraction, InteractionResponse, TextChannel, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import DataManager = require('./DataManager');
import ICommand = require('./ICommand');
import Command = require('./Command');

//Handles the Command inputted by the user
async function HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: DataManager): Promise<void> {
    
    let Factory = new CommandFactory<ICommand>(interaction.commandName, dataManager);
    let script = Factory.CreateCommand(Command);

    script.RunCommand(dataManager, interaction, client);
}

export = HandleCommand;