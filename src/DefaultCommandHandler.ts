import ICommandHandler from "./ICommandHandler";
import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import CommandFactory from './CommandFactory';
import BotDataManager from "./PalworldBotDataManager";
import ICommand from "./ICommand";
import Command from "./Command";
import CommandLogger from './CommandLogger';

/**
 * Default Command Handler used for empty and regular Discord Bot Commands
 */
class DefaultCommandHandler implements ICommandHandler {

    public async HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: BotDataManager): Promise<void> {
        let Factory = await new CommandFactory<ICommand>(interaction.commandName);
        let command = await Factory.CreateCommand<Command>(Command);

        await CommandLogger.InitializeResponse(interaction, client, dataManager);

        try {
            CommandLogger.LogAndRespond(command.LogMessage);

            command.RunCommand(dataManager, interaction, client);

            CommandLogger.LogAndRespond(command.SuccessMessage);
        } catch (error) {
            CommandLogger.LogAndRespond(command.ErrorMessage + `  (${error})`)
        }
    }

   /**
    * Gets an Instance of the Default Command Handler
    * @returns Returns an Instance of the Default Command Handler
    */
    public static Instance () : DefaultCommandHandler
    {
        return new DefaultCommandHandler();
    }
}

export default DefaultCommandHandler;