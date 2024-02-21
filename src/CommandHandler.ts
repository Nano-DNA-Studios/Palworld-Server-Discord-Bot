import { CacheType, ChatInputCommandInteraction, InteractionResponse, TextChannel, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import DataManager = require('./DataManager');
import ICommand = require('./ICommand');
import Command = require('./Command');

//Handles the Command inputted by the user
async function HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: DataManager): Promise<void> {

    let Factory = new CommandFactory<ICommand>(interaction.commandName, dataManager);
    let command = Factory.CreateCommand(Command);
    let ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;

    if (command.UsesCustomCommandHandler)
        command.CustomCommandHandler(dataManager, interaction, client);
    else {
        const Response = await interaction.reply({ content: ResponseMessage, ephemeral: true }) as InteractionResponse;
        const logChannel = client.channels.cache.get(`${process.env.LOG_CHANNEL_ID}`) as TextChannel;

        try {
            logChannel.send(command.LogMessage);
            ResponseMessage += `${command.LogMessage} \n`;

            command.RunCommand(dataManager, interaction, client);

            logChannel.send(command.SuccessMessage);
            ResponseMessage += `${command.SuccessMessage} \n`;
            Response.edit({ content: ResponseMessage });
        } catch (error) {
            logChannel.send(command.ErrorMessage);
            ResponseMessage += `${command.ErrorMessage} \n`;
            Response.edit({ content: ResponseMessage });
        }
    }
}

export = HandleCommand;