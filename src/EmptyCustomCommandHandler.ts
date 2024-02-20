import DataManager from "./DataManager";
import { CacheType, ChatInputCommandInteraction, Client} from 'discord.js';

function EmptyCustomCommandHandler(dataManager: DataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client): Promise<void> {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

export = EmptyCustomCommandHandler;