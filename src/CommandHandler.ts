import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import DataManager from './DataManager';
import ICommand from './ICommand';
import Command from './Command';
import ICommandHandler from './ICommandHandler';

/**
 * Class Handling Command Execution, and Delegates to Custom Command Handlers
 */
class CommandHandler implements ICommandHandler {

    public async HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: DataManager): Promise<void> {
        let Factory = await new CommandFactory<ICommand>(interaction.commandName, dataManager);
        let command = await Factory.CreateCommand<Command>(Command);

        await command.CommandHandler.HandleCommand(interaction, client, dataManager);
    }
}

export = CommandHandler;