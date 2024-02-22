import { CacheType, ChatInputCommandInteraction, InteractionResponse, TextChannel, Client } from 'discord.js';
import DataManager from './DataManager';

class CommandLogger {
 
     /**
     * Stores the instance of the Response to the Command, is Often ephemeral
     */
     public static Response: InteractionResponse;

     /**
      * Stores the Response Message to the Command
      */
     public static ResponseMessage: string = "";
 
     /**
      * Channel to Log the Command Responses
      */
     public static LogChannel: TextChannel;

     /**
     * Initializes all info needed for the Response to the Command
     * @param interaction Command Interaction
     * @param client Discord Bot Client
     * @param dataManager Data Manager
     */
    public static async InitializeResponse(interaction: ChatInputCommandInteraction<CacheType>, client: Client, dataManager: DataManager) {
        this.ResponseMessage = `Running ${interaction.commandName} :arrows_clockwise: \n`;
        this.LogChannel = client.channels.cache.get(`${dataManager.LOG_CHANNEL_ID}`) as TextChannel;
        this.Response = await interaction.reply({ content: this.ResponseMessage, ephemeral: true }) as InteractionResponse;
    }

    /**
     * Logs the Command and Responds to the User
     * @param message Message to Log and Respond
     */
    public static LogAndRespond(message: string) {
        this.LogChannel?.send(message);
        this.ResponseMessage += `${message} \n`;
        this.Response.edit({ content: this.ResponseMessage });
    }

}

export = CommandLogger;