import BotDataManager from "./PalworldBotDataManager";
import { CacheType, ChatInputCommandInteraction, Client} from 'discord.js';

function EmptyCustomCommandHandler(dataManager: BotDataManager, interaction: ChatInputCommandInteraction<CacheType>, client: Client): Promise<void> {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

export = EmptyCustomCommandHandler;