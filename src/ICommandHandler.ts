import { CacheType, ChatInputCommandInteraction, Client } from 'discord.js';
import DataManager from './DataManager';
import CommandLogger from './CommandLogger';

/**
 * Interface describing the structure for a Command Handler
 */
interface ICommandHandler extends CommandLogger{

    /**
     * Handles Discord Bot Command Execution
     * @param interaction Command Interaction
     * @param client Discord Bot Client
     * @param dataManager Data Manager
     */
    HandleCommand(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: DataManager): Promise<void>
}

export = ICommandHandler;